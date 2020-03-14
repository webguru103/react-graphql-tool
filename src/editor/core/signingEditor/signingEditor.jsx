import * as React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router';
import type { RouterHistory } from 'react-router';

import debounce from 'lodash.debounce';
import styles from './signingEditor.styles';
import Toolbar from '../toolbar/toolbar';
import c, {
  DEFAULT_ZOOM, ZOOM_MAXIMUM, ZOOM_MINIMUM, EDITOR_MODE, ZOOM_PRECISION_FACTOR,
  STAMP_SIGNING_SCROLL_DELAY, PAGE_LIST_MIN_WIDTH, PAGE_SIDE_MARGIN,
} from '../../constants';
import { withDialog } from '../../../shared/dialog/withDialog';
import BasePage from '../page/basePage';
import LineField from '../lineField/lineField';
import SigningFieldWrapper from '../fieldWrapper/signingFieldWrapper';
import type {
  AdaptedField,
  EditorDocument,
  Data,
  AdaptedPage,
  AdaptedSignatureField,
  AdaptedInitialField,
} from '../flowTypes';
import { preparePages } from '../utils';
import { compose, pro } from '../../../utility';
import type { SessionSignee } from '../../../agent-panel/api/fragments/sessionSignee';
import SigningNavbar from './signingNavbar';
import SigningCompletedDialog from '../../../agent-panel/signing-session/signingCompletedDialog';
import PageManager from '../pageManager';
import PageHeader from '../pageHeader';
import { withSnackbar } from '../../../shared/snackbar';
import { logger } from '../../../logger';
import { getAlreadySigned } from './signingEditor.utils';
import type { StampType } from '../../../agent-panel/api/mutations/signOrWipe';

type Props = {
  classes: Object,
  documents: Array<EditorDocument>,
  values: {[number]: {[number]: Data }},
  mode: $Keys<typeof EDITOR_MODE>,
  pdfPages: Object,
  signees: Array<?SessionSignee>,
  handleChange: (value: string, docId: number, dataReference: number) => void,
  handleBlur: (value: any, docId: number, targetName: string, { type: string }) => void,
  emailTitle: string,
  sessionSigneeName: string,
  history: RouterHistory,
  closeDialog: () => void,
  createDialog: ({
    dialogContent: React.Element,
    disableClickOutside: boolean,
    isTransparent: boolean
  }) => any,
  completeSigning: () => Promise<boolean>,
  createSnackbar: (React.Element) => void,
  signOrWipeField: (
    fieldId: number,
    dataReference: number,
    docId: number,
    stampType: StampType,
    wipeField: boolean,
  ) => Promise<string>,
  location: Location,
}

type State = {
  zoom: number,
  currentField: number,
  sessionStarted: boolean,
  sessionFinished: boolean,
  signed: number,
  pages: Array<AdaptedPage>,
  zoomAdjustmentFactor: number,
}

const valueIsEmptyOrDefault = (value: Data) => !value
  || !value.value
  || !value.value.data
  || value.value.data === 'false'
  || (Array.isArray(value.value.data) && value.value.data[0] === '');

class ViewEditorC extends React.PureComponent<Props, State> {

  state = {
    zoom: DEFAULT_ZOOM,
    currentField: -1,
    sessionStarted: false,
    sessionFinished: false,
    pages: preparePages(this.props.documents),
    signed: getAlreadySigned(this.props.documents, this.props.sessionSigneeName),
    zoomAdjustmentFactor: 1,
  };

  myFields: Array<{field: React.Element, id: number, dataReference: number, top: number, type: string}> = [];

  pageManager = new PageManager();

  totalSign = 0;

  widestPage = this.state.pages.reduce((acc, page) => {
    if (page.width) {
      return page.width > acc ? page.width : acc;
    }
    return acc;
  }, 0);

  scaleZoomToFitPage = debounce(() => {
    // If first page of the first document is too wide, adjust the overall zoom
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
    this.scaleZoomToFitPage();
    this.centerPageList();
    window.addEventListener('resize', this.scaleZoomToFitPage);
  }

  componentDidUpdate(prevProps) {
    if (!this.props.values === prevProps.values) {
      const nonFilledFieldIndex = this.getNextNonFilledField();
      if (nonFilledFieldIndex === -1) {
        // we filled all the fields
        this.setState({ sessionFinished: true });
      }
    }
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.scaleZoomToFitPage);
  }

  handleUpdateZoom = (addValue: number) => {
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

  handleFieldRef = (ref, id, dataReference, type) => {
    if (ref && !this.myFields.find(mf => mf.id === id)) {
      const { top } = ref.getBoundingClientRect();

      this.myFields.push({
        field: ref, id, dataReference, top, type,
      });
      if (type === 'signature' || type === 'initial') {
        this.totalSign += 1;
      }

      // on insert sort the fields by their top position
      this.myFields = this.myFields.sort((a, b) => a.top - b.top);
    }
  };

  handleNavbarButton = async () => {
    const { sessionStarted, signed } = this.state;
    const { createSnackbar } = this.props;

    if (!sessionStarted) {
      this.setState({ sessionStarted: true });
      const nextFieldIndex = this.getNextNonFilledField();
      if (nextFieldIndex !== -1) {
        this.centerFieldOnPage(nextFieldIndex);
      }
      return;
    }

    if (signed < this.totalSign) {
      createSnackbar(c.PLEASE_SIGN_ALL_FIELDS);
      return;
    }

    // if all fields are filled in, send BE request and show popup
    this.completeSigningAndShowDialog();
  };

  viewDocument = () => {
    const { location: { search } } = this.props;

    const urlParams = new URLSearchParams(search);
    const token = urlParams.get('token');

    this.props.history.push(`/view?token=${token || ''}`);
    this.props.closeDialog();
  };

  getPreviousNonFilledField = () => {
    const { currentField } = this.state;

    // get all values from all documents combined
    const allValues = Object.values(this.props.values).reduce((docValues, acc) => ({ ...acc, ...docValues }), {});

    // check fields above the current field
    for (let i = currentField - 1; i > -1; i -= 1) {
      const field = this.myFields[i];
      // if field doesn't have value, return it's index
      if (valueIsEmptyOrDefault(allValues[field.dataReference])) {
        return i;
      }
    }

    // check fields below the current field

    for (let i = this.myFields.length - 1; i > currentField; i -= 1) {
      const field = this.myFields[i];

      if (valueIsEmptyOrDefault(allValues[field.dataReference])) {
        return i;
      }
    }

    // if reached this, all fields are filled in
    return -1;
  };

  getNextNonFilledField = () => {
    const { currentField } = this.state;

    // get all values from all documents combined
    const allValues = Object.values(this.props.values).reduce((docValues, acc) => ({ ...acc, ...docValues }), {});

    // check fields below the current field
    for (let i = currentField + 1; i < this.myFields.length; i += 1) {
      const field = this.myFields[i];
      // if field doesn't have value, return it's index
      if (valueIsEmptyOrDefault(allValues[field.dataReference])) {
        return i;
      }
    }

    // check fields above the current field

    for (let i = 0; i < currentField; i += 1) {
      const field = this.myFields[i];

      if (valueIsEmptyOrDefault(allValues[field.dataReference])) {
        return i;
      }
    }

    // if reached this, all fields are filled in
    return -1;
  };

  jumpToNextField = () => {
    const nextFieldIndex = this.getNextNonFilledField();

    if (nextFieldIndex !== -1) {
      this.centerFieldOnPage(nextFieldIndex);
      this.setState({ currentField: nextFieldIndex });
    }
  };

  jumpToPreviousField = () => {
    const prevFieldIndex = this.getPreviousNonFilledField();
    // return to the bottom field from the top
    if (prevFieldIndex !== -1) {
      this.centerFieldOnPage(prevFieldIndex);
      this.setState({ currentField: prevFieldIndex });
    }
  };

  handleChange = (...args) => {
    const { handleChange } = this.props;
    const { sessionStarted, currentField } = this.state;

    handleChange(...args);

    if (!sessionStarted) {
      this.setState({ sessionStarted: true });
    }

    // set a currentField to the field that was just changed
    const dataReference = Number(args.length >= 3 && args[2]);
    const fieldType = args.length >= 4 && args[3];
    const fieldIndex = this.myFields.findIndex(mf => mf.dataReference === dataReference);
    if (fieldIndex !== currentField) {
      this.setState({ currentField: fieldIndex });
    }

    // if it's a checkbox, jump to next field
    if (fieldType === 'checkbox') {
      this.jumpToNextField();
    }
  };

  handleStampsFieldsSign = async (field: AdaptedSignatureField | AdaptedInitialField, docId) => {
    const {
      pages, sessionStarted, signed,
    } = this.state;
    const {
      signOrWipeField, createSnackbar,
    } = this.props;

    if (!sessionStarted) {
      this.setState({ sessionStarted: true });
    }

    const [err, stampLookupUrl] = await pro(signOrWipeField(
      field.id,
      field.dataReference || -1,
      docId,
      field.type === 'initial' ? 'INITIAL' : 'SIGNATURE',
      false,
    ));

    if (err) {
      logger.log(err);
      createSnackbar(c.CANNOT_SIGN_FIELD);
      return;
    }

    const { pages: updatedPages } = this.pageManager.updateFields(pages, [{ ...field, stampLookupUrl }]);

    const fieldRefIndex = this.myFields.findIndex(mf => mf.id === field.id);

    this.myFields[fieldRefIndex].dataReference = field.dataReference || -1;

    this.setState(prevState => ({
      pages: updatedPages,
      signed: prevState.signed + 1,
      currentField: fieldRefIndex,
    }));

    // Signing has completed.
    if (this.myFields.length === this.totalSign && (signed + 1) === this.totalSign) {
      this.completeSigningAndShowDialog();
    } else {
      // Wait for some time before jumping to next field
      setTimeout(() => {
        this.jumpToNextField();
      }, STAMP_SIGNING_SCROLL_DELAY);
    }

  };

  completeSigningAndShowDialog = async () => {

    const { completeSigning, createDialog, createSnackbar } = this.props;

    const [signingCompleteErr] = await pro(completeSigning());

    if (signingCompleteErr) {
      createSnackbar(c.CANNOT_COMPLETE_SIGNING);
      return;
    }

    createDialog({
      dialogContent: <SigningCompletedDialog
        viewDocument={this.viewDocument}
      />,
      disableClickOutside: true,
      isTransparent: true,
      disableEsc: true,
    });
  }

  wipeField = async (fieldId, pageIndex, docId) => {
    const { pages } = this.state;
    const { signOrWipeField, createSnackbar } = this.props;

    const field = pages[pageIndex].fields[fieldId];

    const [err] = await pro(signOrWipeField(
      fieldId,
      field.dataReference || -1,
      docId,
      field.type === 'initial' ? 'INITIAL' : 'SIGNATURE',
      true,
    ));

    if (err) {
      logger.log(err);
      createSnackbar(c.CANNOT_WIPE_FIELD);
      return;
    }

    const updatedField = {
      ...field,
      dataReference: null,
      stampLookupUrl: null,
    };

    const { pages: updatedPages } = this.pageManager.updateFields(pages, [updatedField]);

    const fieldRefIndex = this.myFields.findIndex(mf => mf.id === field.id);

    this.myFields[fieldRefIndex].dataReference = -1;

    this.setState(prevState => ({
      pages: updatedPages,
      signed: prevState.signed - 1,
      currentField: fieldRefIndex,
    }));

  };

  centerFieldOnPage = (fieldIndex) => {
    const fieldRect = this.myFields[fieldIndex].field.getBoundingClientRect();

    const absoluteElementTop = fieldRect.top + window.pageYOffset;
    const middleY = absoluteElementTop - (window.innerHeight / 2);

    const absoluteElementLeft = fieldRect.left + window.pageXOffset;
    const middleX = absoluteElementLeft - (window.innerWidth / 2);
    window.scrollTo({ top: middleY, left: middleX, behavior: 'smooth' });
  };

  centerPageList = () => {
    if (document && document.body) {
      window.scrollTo({ left: (document.body.scrollWidth - document.body.clientWidth) / 2 });
    }
  };

  render() {
    const {
      classes, values, mode, pdfPages, sessionSigneeName, ...restProps
    } = this.props;
    const {
      zoom, currentField, sessionStarted, sessionFinished, pages, signed, zoomAdjustmentFactor,
    } = this.state;
    const factoredZoom = zoom / ZOOM_PRECISION_FACTOR;
    return (
      <React.Fragment>
        <SigningNavbar
          onClick={this.handleNavbarButton}
          sessionStarted={sessionStarted}
          sessionFinished={sessionFinished}
        />
        <Toolbar
          zoom={zoom}
          mode={mode}
          handleUpdateZoom={this.handleUpdateZoom}
          jumpToNextField={this.jumpToNextField}
          jumpToPreviousField={this.jumpToPreviousField}
          totalSign={this.totalSign}
          signed={signed}
          sessionFinished={sessionFinished}
          zoomAdjustmentFactor={zoomAdjustmentFactor}
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
            pages.map((page, index) => (
              <div className={classes.page} key={page.id}>
                {page.pageNumber === 1 && (
                  <PageHeader documentName={page.documentName} />
                )}
                <BasePage
                  zoom={factoredZoom}
                  page={page}
                  pdfPages={pdfPages}
                  totalPages={pages.length}
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
                        <SigningFieldWrapper
                          {...restProps}
                          mySigneeName={sessionSigneeName}
                          handleChange={this.handleChange}
                          docId={page.documentId}
                          field={field}
                          key={field.id}
                          pageIndex={index}
                          zoom={factoredZoom}
                          value={values[page.documentId][(field.dataReference || -1)]}
                          mode={mode}
                          handleFieldRef={this.handleFieldRef}
                          isActive={this.myFields[currentField] && this.myFields[currentField].id === field.id}
                          handleStampsFieldsSign={this.handleStampsFieldsSign}
                          wipe={this.wipeField}
                          signed={signed}
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

export default compose(
  withStyles(styles),
  withDialog,
  withRouter,
  withSnackbar,
)(ViewEditorC);
