import * as React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import Cookies from 'js-cookie';
import debounce from 'lodash.debounce';
import styles from './viewEditor.styles';
import Toolbar from './toolbar/toolbar';
import messages, {
  DEFAULT_ZOOM, ZOOM_MAXIMUM, ZOOM_MINIMUM, EDITOR_MODE, ZOOM_PRECISION_FACTOR, PAGE_LIST_MIN_WIDTH, PAGE_SIDE_MARGIN,
} from '../constants';
import BasePage from './page/basePage';
import LineField from './lineField/lineField';
import ViewFieldWrapper from './fieldWrapper/viewFieldWrapper';
import type { AdaptedField, EditorDocument } from './flowTypes';
import { preparePages } from './utils';
import PageHeader from './pageHeader';
import { DOWNLOAD_ENDPOINT } from '../../configurations';
import { compose } from '../../utility';
import { withSnackbar } from '../../shared/snackbar';

type Props = {
  classes: Object,
  documents: Array<EditorDocument>,
  values: {[number]: string},
  mode: $Keys<typeof EDITOR_MODE>,
  pdfPages: Object,
  scrollToDocId: number,
  sessionId: number,
  emailTitle: string,
  createSnackbar: Function,
}

type State = {
  zoom: number,
  zoomAdjustmentFactor: number,
  currentlyDownloading: boolean,
}

class ViewEditorC extends React.PureComponent<Props, State> {

  state = {
    zoom: DEFAULT_ZOOM,
    zoomAdjustmentFactor: 1,
    currentlyDownloading: false,
  };

  pages = preparePages(this.props.documents);

  pageRefs: Array<React.Element> = [];

  widestPage = this.pages.reduce((acc, page) => {
    if (page.width) {
      return page.width > acc ? page.width : acc;
    }
    return acc;
  }, 0);

  scaleZoomToFitPage = debounce(() => {
    // If first page of the first document is too wide, adjust the overall zoom.
    if (document.body) {
      const bufferWidth = 10;
      const pageListWidth = document.body.clientWidth;
      // Grab either actual pagelist width, or, if it's too small, grab the const.
      const referenceWidth = pageListWidth > PAGE_LIST_MIN_WIDTH ? pageListWidth : PAGE_LIST_MIN_WIDTH;
      const zoomAdjustmentFactor = this.props.documents.length
      && this.props.documents[0].pages
      && this.props.documents[0].pages.nodes[0]
      && this.props.documents[0].pages.nodes[0].width
      && (this.props.documents[0].pages.nodes[0].width + (PAGE_SIDE_MARGIN + bufferWidth) * 2) > referenceWidth
        ? (referenceWidth - (PAGE_SIDE_MARGIN + bufferWidth) * 2) / this.props.documents[0].pages.nodes[0].width
        : 1;
      this.setState({
        zoom: DEFAULT_ZOOM * zoomAdjustmentFactor,
        zoomAdjustmentFactor,
      });
    }
  }, 250);

  componentDidMount() {

    // scroll to the first page of the document if the docId was passed
    if (this.props.scrollToDocId) {
      const firstPageIndex = this.pages.findIndex(p => p.documentId === this.props.scrollToDocId);
      if (firstPageIndex && this.pageRefs[firstPageIndex]) {
        const pageRect = this.pageRefs[firstPageIndex].getBoundingClientRect();
        const absoluteElementTop = pageRect.top + window.pageYOffset;

        // move element to the top and substract the height of the toolbar + navbar + small margin
        const middleY = absoluteElementTop - 115;
        window.scrollTo({ top: middleY, behavior: 'smooth' });

      }
    }

    this.scaleZoomToFitPage();
    this.centerPageList();
    window.addEventListener('resize', this.scaleZoomToFitPage);
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.scaleZoomToFitPage);
  }

  toggleCurrentlyDownloading = () => {
    this.setState({ currentlyDownloading: !this.state.currentlyDownloading });
  }

  downloadDocuments = () => {
    if (this.state.currentlyDownloading) {
      return;
    }

    const {
      sessionId,
      documents,
      emailTitle,
      createSnackbar,
    } = this.props;

    let fileName;
    // Downloading a .zip
    if (documents.length > 1) {
      fileName = emailTitle;
    } else {
      // Downloading just one .pdf
      fileName = documents[0].name || '';
    }

    const params = (new URL(String(document.location))).searchParams;
    const authToken = Cookies.get('jwt');
    const urlToken = params.get('token') || '';
    const token = authToken || urlToken;

    if (DOWNLOAD_ENDPOINT && token) {
      this.toggleCurrentlyDownloading();
      fetch(DOWNLOAD_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({
          transactionSessionId: sessionId,
        }),
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
        .then((resp) => {
          if (resp.status === 200) {
            resp.blob().then((blob) => {
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              let ext = '';
              if (blob.type.includes('pdf') && !fileName.includes('.pdf')) {
                ext = '.pdf';
              } else if (blob.type.includes('zip')) {
                ext = '.zip';
              }
              link.setAttribute('download', `${fileName}${ext}`);
              if (document.body) document.body.appendChild(link);
              link.click();
              if (document.body) document.body.removeChild(link);
            });
          } else {
            this.props.createSnackbar(messages.DOWNLOAD_ERROR, {
              timer: 5000,
            });
          }
          this.toggleCurrentlyDownloading();
        })
        .catch(() => {
          this.toggleCurrentlyDownloading();
          createSnackbar(messages.DOWNLOAD_ERROR, {
            timer: 5000,
          });
        });
    } else {
      this.toggleCurrentlyDownloading();
      createSnackbar(messages.DOWNLOAD_ERROR, {
        timer: 5000,
      });
    }
  };

  handleUpdateZoom = (addValue: number) => () => {
    const { zoom, zoomAdjustmentFactor } = this.state;
    let newZoom = zoom + addValue * zoomAdjustmentFactor;

    if (newZoom <= ZOOM_MINIMUM * zoomAdjustmentFactor) {
      newZoom = ZOOM_MINIMUM * zoomAdjustmentFactor;
    }
    if (newZoom >= ZOOM_MAXIMUM * zoomAdjustmentFactor) {
      newZoom = ZOOM_MAXIMUM * zoomAdjustmentFactor;
    }

    this.setState({ zoom: newZoom }, () => {
      this.centerPageList();
    });
  };

  handlePageRef = (ref, pageIndex) => {
    if (!this.pageRefs[pageIndex]) {
      this.pageRefs[pageIndex] = ref;
    }
  };

  centerPageList = () => {
    if (document && document.body) {
      window.scrollTo({ left: (document.body.scrollWidth - document.body.clientWidth) / 2 });
    }
  };

  render() {
    const {
      classes, values, mode, pdfPages,
    } = this.props;
    const {
      zoomAdjustmentFactor,
      zoom,
      currentlyDownloading,
    } = this.state;
    const factoredZoom = zoom / ZOOM_PRECISION_FACTOR;

    return (
      <React.Fragment>
        <Toolbar
          zoom={zoom}
          mode={mode}
          handleUpdateZoom={this.handleUpdateZoom}
          downloadDocuments={this.downloadDocuments}
          zoomAdjustmentFactor={zoomAdjustmentFactor}
          currentlyDownloading={currentlyDownloading}
        />
        <div
          className={classNames(classes.formPanel)}
          style={{
            width: this.widestPage * zoom / ZOOM_PRECISION_FACTOR > (document.body ? document.body.clientWidth : 0)
              ? this.widestPage * zoom / ZOOM_PRECISION_FACTOR
              : '100%',
          }}
        >
          {
            this.pages.map((page, index) => (
              <div className={classes.page} key={page.id} ref={r => this.handlePageRef(r, index)}>
                {page.pageNumber === 1 && (
                  <PageHeader documentName={page.documentName} />
                )}
                <BasePage
                  zoom={factoredZoom}
                  page={page}
                  pdfPages={pdfPages}
                  totalPages={this.pages.length}
                >
                  {
                    // Need to explicitly typecast object.values for flow
                    (((Object.values(page.fields): any): Array<AdaptedField>).map((field) => {
                      if (field.type === 'line') {
                        return (
                          <LineField
                            field={field}
                            key={field.id}
                            pageIndex={index}
                            zoom={factoredZoom}
                            mode={mode}
                            disableOnClickOutside
                          />
                        );
                      }

                      return (
                        <ViewFieldWrapper
                          docId={page.documentId}
                          field={field}
                          key={field.id}
                          pageIndex={index}
                          zoom={factoredZoom}
                          value={values[page.documentId][(field.dataReference || -1)]}
                          mode={mode}
                        />
                      );
                    }))
                  }
                </BasePage>
              </div>
            ))
            }
        </div>
      </React.Fragment>
    );
  }

}

export default compose(withStyles(styles), withSnackbar)(ViewEditorC);
