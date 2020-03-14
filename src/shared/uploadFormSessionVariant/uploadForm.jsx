// @flow

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import throttle from 'lodash.throttle';
import { FormattedMessage } from 'react-intl';

import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import CloudUpload from '@material-ui/icons/CloudUpload';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

import CancelIcon from '@material-ui/icons/Cancel';

import { UPLOAD_ENDPOINT } from '../../configurations';
import { bytesToText, get } from '../../utility';
import Dropzone from '../dropzone/dropzone';
import styles from './uploadFormSessionVariant.styles';
import { PdfParser } from '../pdfParser';

const PROCESSING = <FormattedMessage id="processing" defaultMessage="Processing" />;

type Props = {
  classes: Object,
  acceptTypes: Array<string>,
  uploadLabel: Node,
  maxUploadSize: number,
  acceptMultiple: boolean,
  testMode?: boolean, // Used for testing to bypass read-only xhr.readyState property
  uploadEndpoint?: string,
  setUploadError: Function,
  xhr?: XMLHttpRequest,
  onDrop: Function,
  setURLs: Function,
};

type StateType = {
  progress: number,
  processing: boolean,
  documents: Array<Object>,
  rejected: Array<Object>,
  isDraggingOver: boolean,
  disabled: boolean,
}

export class UploadFormC extends React.Component<Props, StateType> {

  state = {
    progress: 0,
    processing: false,
    documents: [],
    rejected: [],
    isDraggingOver: false,
    disabled: false,
  };

  handleProgress = throttle((e) => {
    if (e.lengthComputable && (this.xhr.readyState > 0 || this.props.testMode)) {
      const percentComplete = Math.round((e.loaded / e.total) * 100);
      this.setState({
        progress: percentComplete,
        disabled: true,
        processing: true,
      });
    }
    if (this.state.progress === 100) {
      this.setState({
        disabled: false,
      });
    }
  }, 500);

  xhr = this.props.xhr || new XMLHttpRequest();

  uploadEndpoint = this.props.uploadEndpoint || UPLOAD_ENDPOINT || '';

  pdfData = {
    numPages: 0,
  };

  componentDidMount() {
    this.xhr.upload.addEventListener('progress', this.handleProgress);
    this.xhr.onreadystatechange = this.handleXHRStateChange;
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
          let newDocuments = [...this.state.documents];
          const pendingDocs = get(parsedResponse, 'documents', {});
          if (pendingDocs.length < 1) {
            this.setError();
          } else {
            newDocuments = [...newDocuments, ...pendingDocs];
            this.setState({
              progress: 100,
              processing: false,
              documents: newDocuments,
            });
            // add information about pdf pages to the documents object
            const pages = [];
            for (let i = 0; i < this.pdfData.numPages; i += 1) {
              pages.push({ pageNumber: i + 1 });
            }
            newDocuments[0].pages = pages;

            this.props.setURLs(newDocuments);
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
      processing: false,
    });
    this.props.setUploadError('Upload error!');
  };

  onDrop = (formData: Array<File>, rejected: Array<File>) => {
    this.setState({
      progress: 0,
      processing: false,
      rejected,
    });

    this.props.setUploadError('');

    if (formData.length > 0) {
      const upload = new FormData();

      formData.forEach(async (item) => {
        upload.append('name', item);
        const pdfParser = new PdfParser(item);
        const pdf = await pdfParser.getPdf();
        this.pdfData.numPages = pdf.numPages;
      });

      this.xhr.open('POST', this.uploadEndpoint);
      this.xhr.send(upload);

      this.props.onDrop();
    }
  };

  removeUpload = (index: number) => () => {
    const newUrls = [...this.state.documents];
    newUrls.splice(index, 1);
    this.setState({
      documents: newUrls,
      progress: 0,
      processing: false,
    });
    this.props.setURLs(newUrls);
    this.props.setUploadError('');
  };

  removeRejectedNotice = (index: number) => () => {
    const rejected = [...this.state.rejected];
    rejected.splice(index, 1);
    this.setState({
      rejected,
      progress: 0,
      processing: false,
    });
  };

  cancelUpload = () => {
    this.xhr.abort();
    this.setState({
      rejected: [],
      progress: 0,
      processing: false,
      disabled: false,
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
      acceptTypes,
      maxUploadSize,
      acceptMultiple,
    } = this.props;

    const {
      progress,
      processing,
      documents,
      rejected,
      isDraggingOver,
      disabled,
    } = this.state;

    const isCurrentUpload = (processing && progress > 0) || (documents && documents.length > 0);

    return (
      <div
        className={classNames({
          [classes.dropzoneContainer]: true,
          [classes.dragOver]: isDraggingOver,
        })}
      >
        <Dropzone
          maxSize={maxUploadSize}
          onDrop={this.onDrop}
          multiple={acceptMultiple}
          accept={acceptTypes}
          disabled={disabled}
        >
          <div
            className={classNames({
              [classes.dropzone]: true,
              [classes.paddingAnimationDropzone]: isCurrentUpload,
            })}
            onDragOver={this.dragOver}
            onDragLeave={this.dragEnd}
            onDrop={this.dragEnd}
          >
            <CloudUpload
              classes={{
                root: classNames({
                  [classes.cloudUpload]: true,
                  [classes.paddingAnimationCloud]: isCurrentUpload,
                }),
              }}
            />
            {uploadLabel}
            {'Drag and drop, or click this area to upload.'}
          </div>
        </Dropzone>
        {progress > 0 ? <LinearProgress data-testid="linear-progress" variant="determinate" value={progress} /> : ''}
        {(processing && progress > 0 && progress < 100) && (
          <Button data-testid="cancel-button" onClick={this.cancelUpload}>
            Cancel
            <CancelIcon className={classes.iconSmall} />
          </Button>
        )
        }
        {(processing && progress >= 100) && (
          <Button onClick={this.cancelUpload} data-testid="processing">
            <CircularProgress className={classes.iconSmall} />
            <span className={classes.processing}>
              {PROCESSING}
            </span>
            <CancelIcon className={classes.iconSmall} />
          </Button>
        )}
        {documents && documents.length > 0 && documents.map((item, index) => {
          const url = get(item, 'pdf', '').split('/').reverse()[0];
          return (
            <Button
              data-testid={`upload-list-${index}`}
              key={item.uuid}
              onClick={this.removeUpload(index)}
              className={classes.removeButton}
            >
              {`${url.substring(0, 40)}`}
              {url.length > 40 ? '...' : ''}
              <CancelIcon className={classes.iconSmall} />
            </Button>
          );
        })}
        {rejected && rejected.length > 0 && rejected.map((item, index) => {
          const fileName = get(item, 'name', '');
          return (
            <Button
              data-testid={`rejected-list-${index}`}
              key={fileName}
              onClick={this.removeRejectedNotice(index)}
              className={classes.warningButton}
            >
              <div>
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
              <CancelIcon className={classes.iconSmallWhite} />
            </Button>
          );
        })}
      </div>
    );
  }

}

export default withStyles(styles)(UploadFormC);
