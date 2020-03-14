import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import SignatureCanvas from './canvas';
import styles from './signature.styles';

type SignatureFrameProps = {
  height: number,
  classes: Object,
  width: number,
  text?: string,
  onDrawEnd?: (name: ?string, data: string) => void,
  name?: string,
  dataURL?: string,
  onClear?: Function,
};

type SignatureFrameState = {
  isFieldActive: boolean,
}

export class SignatureFrameC extends React.PureComponent<SignatureFrameProps, SignatureFrameState> {

  state = {
    isFieldActive: false,
  }

  clear: Function = () => {};

  setFieldActive = () => {
    this.setState({ isFieldActive: true });
  }

  render() {
    const {
      classes, width, text, height, onDrawEnd, name, dataURL, onClear,
    } = this.props;
    const { isFieldActive } = this.state;

    return (
      <div
        tabIndex={-1}
        role="button"
        className={classes.root}
        style={{ width, height }}
        onMouseDown={this.setFieldActive}
      >
        {Boolean(dataURL) === false && !isFieldActive && (
          <div className={classes.drawNotice}>
            {text}
          </div>
        )}
        <div className={classes.signature}>
          <SignatureCanvas
            width={width}
            height={height}
            clearFunction={(c) => { this.clear = c; }}
            onDrawEnd={onDrawEnd}
            name={name}
            dataURL={dataURL}
          />
        </div>
        {(Boolean(dataURL) || isFieldActive) && (
          <div className={classes.clear}>
            <button
              className={classNames(classes.button, classes.clearButton)}
              onClick={() => {
                this.clear();
                if (onClear) {
                  onClear();
                }
              }}
              type="button"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    );
  }

}

export default withStyles(styles, { withTheme: true })(SignatureFrameC);
