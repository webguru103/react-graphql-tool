// @flow

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import throttle from 'lodash.throttle';
import Cookies from 'js-cookie';
import { FormattedMessage } from 'react-intl';

import { withStyles } from '@material-ui/core/styles';
import { Button, Tooltip } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

import { MAX_UPLOAD_DOCUMENTS_COUNT } from '../../constants';
import { UPLOAD_ENDPOINT } from '../../configurations';
import { bytesToText, get, stringTruncateWithEllipsis } from '../../utility';
import Dropzone from '../dropzone/dropzone';
import styles from './uploadForm.styles';
import { PdfParser } from '../pdfParser';
import UploadSVGIcon from '../../assets/upload.svg';
import TrashIcon from '../../assets/trash.svg';

const PROCESSING = <FormattedMessage id="processing" defaultMessage="Processing" />;
const DPI_CONV_FACTOR = 0.72; // Used to convert pixels returned from PDFjs which are at 72 DPI to 100 DPI(as originally).
const NAME_LENGTH = 75;

type Props = {
  classes: Object,
  acceptTypes: Array<string>,
  uploadLabel: Node,
  maxUploadSize: number,
  acceptMultiple: boolean,
  otherDetails?: Node,
  testMode?: boolean, // Used for testing to bypass read-only xhr.readyState property
  uploadEndpoint?: string,
  setUploadError: Function,
  xhr?: XMLHttpRequest,
  onDrop: Function,
  setURLs: (documents: Array<any>) => void,
  existingDocuments?: Array<Object>,
};

type StateType = {
  progress: number,
  documents: Array<Object>,
  rejected: Array<Object>,
  isDraggingOver: boolean,
}

export class UploadFormC extends React.Component<Props, StateType> {

  state = {
    progress: 0,
    documents: this.props.existingDocuments || [],
    rejected: [],
    isDraggingOver: false,
  };

  handleProgress = throttle((e) => {
    if (e.lengthComputable && (this.xhr.readyState > 0 || this.props.testMode)) {
      const percentComplete = Math.round((e.loaded / e.total) * 100);
      this.setState({
        progress: percentComplete,
      });
    }
  }, 500);

  xhr = this.props.xhr || new XMLHttpRequest();

  uploadEndpoint = this.props.uploadEndpoint || UPLOAD_ENDPOINT || '';

  pdfData = {};

  // List of PDF names already in documents array, to prevent uploading duplicate names.
  pdfNames = {};

  componentDidMount() {
    this.xhr.upload.addEventListener('progress', this.handleProgress);
    this.xhr.onreadystatechange = this.handleXHRStateChange;
    const { existingDocuments } = this.props;
    if (existingDocuments) {
      existingDocuments.forEach((doc) => {
        this.pdfNames[doc.docName] = true;
      });
    }
  }

  componentWillUnmount() {
    this.xhr.upload.removeEventListener('progress', this.handleProgress);
    this.xhr.abort();
  }

  handleXHRStateChange = () => {
    if (this.xhr.readyState === 4) {
      if (this.xhr.status === 200) {
        try {
          const parsedResponse = JSON.parse(this.xhr.response);
          const documents = get(parsedResponse, 'documents', {});
          if (documents.length < 1 || documents.length > MAX_UPLOAD_DOCUMENTS_COUNT) {
            this.setError();
          } else {
            const documentsWithPDFData = documents.map((doc, index) => {
              const docPages = [];
              for (let i = 0; i < this.pdfData[index].numPages; i += 1) {
                docPages.push({ pageNumber: i + 1, ...this.pdfData[index].pageDimensions[i] });
              }

              const originalName = doc.pdf.split('/').reverse()[0];
              let fileName = originalName;
              let nameAppend = 1;
              while (this.pdfNames[fileName]) {
                nameAppend += 1;
                fileName = `${originalName.substring(0, originalName.length - 4)}_${nameAppend}.pdf`; // Assuming filename ends in .pdf
              }
              this.pdfNames[fileName] = true;

              return ({
                ...doc,
                docName: fileName,
                docPages,
              });
            });
            this.pdfData = {};
            const prevDocs = this.state.documents;
            this.props.setURLs([...prevDocs, ...documentsWithPDFData]);

            this.setState({
              progress: 0,
              documents: [...prevDocs, ...documentsWithPDFData],
            });
          }
        } catch (e) {
          this.setError();
        }
      } else {
        this.setError();
      }
    }
  };

  setError = () => {
    this.setState({
      progress: 0,
    });
    this.props.setUploadError('Upload error!');
  };

  onDrop = (formData: Array<File>, rejected: Array<File>) => {
    if (this.state.documents.length === MAX_UPLOAD_DOCUMENTS_COUNT) {
      this.props.setUploadError('Limit error! You can\'t upload new document!');
      return;
    }
    this.setState({
      progress: 0,
      rejected,
    });
    this.props.setUploadError('');

    if (formData.length > 0) {
      const upload = new FormData();
      const diffCount = MAX_UPLOAD_DOCUMENTS_COUNT - this.state.documents.length;
      if (this.state.documents.length + formData.length > MAX_UPLOAD_DOCUMENTS_COUNT) {
        this.props.setUploadError(`Limit error! You can upload ${diffCount} document${diffCount > 1 ? 's' : ''} only!`);
        return;
      }

      formData.forEach(async (item, index) => {
        upload.append('name', item);
        const pdfParser = new PdfParser(item);
        const pdf = await pdfParser.getPdf();
        const { numPages } = pdf;
        let pageDimensions = [];
        const promises = [];
        for (let i = 1; i <= numPages; i += 1) {
          promises.push(pdf.getPage(i).then((page) => {
            const viewport = page.getViewport(1.0);
            const { height, width } = viewport;
            return { width: Math.round(width / DPI_CONV_FACTOR), height: Math.round(height / DPI_CONV_FACTOR) };
          }));
        }
        pageDimensions = await Promise.all(promises);
        this.pdfData[index] = { numPages: pdf.numPages, pageDimensions };
      });

      const authToken = Cookies.get('jwt');
      if (!authToken) {
        this.setError();
        return;
      }
      this.xhr.open('POST', this.uploadEndpoint);
      this.xhr.setRequestHeader('Authorization', `JWT ${authToken}`);
      this.xhr.send(upload);

      this.props.onDrop();
    }
  };

  removeUpload = (index: number) => () => {
    const newDocuments = [...this.state.documents];
    const deletedDoc = newDocuments.splice(index, 1);
    this.setState({
      documents: newDocuments,
      progress: 0,
    });
    this.pdfNames[deletedDoc[0].docName] = undefined;
    this.props.setURLs(newDocuments);
    this.props.setUploadError('');
  };

  removeRejectedNotice = (index: number) => () => {
    const rejected = [...this.state.rejected];
    rejected.splice(index, 1);
    this.setState({
      rejected,
      progress: 0,
    });
  };

  cancelUpload = () => {
    this.xhr.abort();
    this.setState({
      rejected: [],
      progress: 0,
    });
    this.props.setUploadError('');
  };

  dragOver = () => {
    this.setState({
      isDraggingOver: true,
    });
  };

  dragEnd = () => {
    this.setState({
      isDraggingOver: false,
    });
  };

  render() {
    const {
      classes,
      uploadLabel,
      otherDetails,
      acceptTypes,
      maxUploadSize,
      acceptMultiple,
    } = this.props;

    const {
      progress,
      documents,
      rejected,
      isDraggingOver,
    } = this.state;

    const isCurrentUpload = (documents.length < 1 && progress > 0) || (documents && documents.length > 0);

    return (
      <div
        className={classNames({
          [classes.dropzoneContainer]: true,
          [classes.dragOver]: isDraggingOver,
        })}
        data-testid="uploadForm"
      >
        <Dropzone
          maxSize={maxUploadSize}
          onDrop={this.onDrop}
          multiple={acceptMultiple}
          accept={acceptTypes}
        >
          <div
            className={classNames({
              [classes.dropzone]: true,
              [classes.paddingAnimationDropzone]: isCurrentUpload,
              [classes.paddingAnimationDropzoneOff]: !isCurrentUpload,
            })}
            onDragOver={this.dragOver}
            onDragLeave={this.dragEnd}
            onDrop={this.dragEnd}
          >
            <UploadSVGIcon />
            {uploadLabel}
            {otherDetails && <div className={classes.otherDetails}>{otherDetails}</div>}
          </div>
        </Dropzone>
        {progress > 0 ? <LinearProgress data-testid="linear-progress" variant="determinate" value={progress} /> : ''}
        {progress > 0 && progress < 100 && (
          <Button data-testid="cancel-button" onClick={this.cancelUpload}>
            Cancel
            <CancelIcon className={classes.iconSmall} />
          </Button>
        )
        }
        {(progress >= 100) && (
          <Button onClick={this.cancelUpload} data-testid="processing">
            <CircularProgress className={classes.iconSmall} />
            <span className={classes.processing}>
              {PROCESSING}
            </span>
            <CancelIcon className={classes.iconSmall} />
          </Button>
        )}
        {documents && documents.length > 0 && documents.map((item, index) => {
          const name = item.docName;
          return (
            <div
              data-testid={`upload-list-${index}`}
              key={item.uuid}
              className={classes.uploadListContainer}
            >
              <Tooltip
                title={name}
                classes={{
                  tooltip: (name.length > NAME_LENGTH) ? classes.tooltip : classes.hide,
                }}
              >
                <div className={classes.truncateName}>
                  <CheckCircleIcon className={classes.checkIcon} />
                  { stringTruncateWithEllipsis(name, NAME_LENGTH) }
                </div>
              </Tooltip>
              <Button
                onClick={this.removeUpload(index)}
                className={classes.removeButton}
              >
                <TrashIcon className={classes.iconSmall} />
              </Button>
            </div>
          );
        })}
        {rejected && rejected.length > 0 && rejected.map((item, index) => {
          const fileName = get(item, 'name', '');
          return (
            <div
              data-testid={`rejected-list-${index}`}
              key={fileName}
              className={classes.rejectedListContainer}
            >
              <div className={classes.rejectedList}>
                <ErrorIcon className={classes.errorIcon} />
                {
                  !acceptTypes.includes(item.type) && (
                    <div>
                      <FormattedMessage
                        id="wrong-file-format"
                        defaultMessage="Unsupported format: {fileName}. Only PDF is supported."
                        values={{
                          fileName: fileName.substring(0, 40) + (fileName.length > 40 ? '...' : ''),
                        }}
                      />
                    </div>
                  )
                }
                {
                  item.size >= maxUploadSize && (
                    <div>
                      <FormattedMessage
                        id="file-too-large"
                        defaultMessage="File too large: {fileName}. File needs to be smaller than {size}."
                        values={{
                          fileName: fileName.substring(0, 40) + (fileName.length > 40 ? '...' : ''),
                          size: bytesToText(maxUploadSize),
                        }}
                      />
                    </div>
                  )
                }
              </div>
              <Button
                data-testid={`rejected-list-${index}`}
                onClick={this.removeRejectedNotice(index)}
                className={classes.warningButton}
              >
                <TrashIcon className={classes.iconSmall} />
              </Button>
            </div>
          );
        })}
      </div>
    );
  }

}

export default withStyles(styles)(UploadFormC);
