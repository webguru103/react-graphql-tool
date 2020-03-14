import * as React from 'react';
import ReactDropzone from 'react-dropzone';
import { withStyles } from '@material-ui/core/styles';
import styles from './dropzone.styles';

type DropZoneProps = {
  maxSize: number,
  accept: Array<string>,
  onDrop: Function,
  multiple: boolean,
  children?: React.Node,
  classes: Object,
  disabled?: boolean,
}

class Dropzone extends React.Component<DropZoneProps, *> {

  static defaultProps = {
    children: null,
    disabled: false,
  };

  dropzoneRef = null;

  handleDrop = (acceptedFiles: Array<File>, rejectedFiles: Array<File>) => {
    const { onDrop } = this.props;

    onDrop(acceptedFiles, rejectedFiles);
  };

  handleOpenFileDialog = () => {
    if (this.dropzoneRef) {
      this.dropzoneRef.open();
    }
  };

  render() {
    const {
      maxSize,
      accept,
      children,
      multiple,
      classes,
      disabled,
    } = this.props;

    return (
      <ReactDropzone
        data-testid="dropzone"
        onDrop={this.handleDrop}
        maxSize={maxSize}
        accept={accept.join()}
        multiple={multiple}
        className={classes.root}
        ref={(node) => { this.dropzoneRef = node; }}
        disabled={disabled}
        disableClick={disabled}
      >
        {children}
      </ReactDropzone>
    );
  }

}

export default withStyles(styles)(Dropzone);
