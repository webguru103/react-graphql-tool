import * as React from 'react';
import { withStyles } from '@material-ui/core';
import classNames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';
import SignatureIcon from '../../../assets/signature-alt.svg';
import { EDITOR_MODE } from '../../../constants';
import { STAMP_URL_PLACEHOLDER, DEFAULT_STAMP_URL_FONT_SIZE } from '../../constants';
import { getWidthHeightFromSVGString } from './stamp.utils';

type Props = {
  classes: Object,
  value: string,
  onClick: () => void,
  stampLookupUrl?: string,
  wipe: () => void,
  mode: $Keys<typeof EDITOR_MODE>,
  loading: boolean,
  height: number,
  zoom: number,
  color: { red: number, green: number, blue: number },
  disabled: boolean,
  width: number,
}

type State = {
  hovered: boolean,
}

const styles = theme => ({
  root: {
    minHeight: '100%',
    minWidth: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  loaderContainer: {
    color: 'white',
    borderRadius: 25,
    backgroundColor: theme.palette.primary.main,
  },
  loader: {
    color: 'white',
    margin: '0 10px',
  },
  signButton: {
    border: 'none',
    borderRadius: 25,
    color: 'white',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    outline: 'none',
  },
  signText: {
    fontSize: 14,
  },
  imageContainer: {
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsImage: {
    width: '100%',
    height: '100%',
    outline: 'none',
  },
  signIcon: {
    margin: '0 10px',
    color: 'white',
  },
  stampLookupUrl: {
    position: 'absolute',
    whiteSpace: 'nowrap',
  },
  clearButton: {
    height: 16,
    width: 39,
    borderRadius: 3,
    border: `1px solid ${theme.palette.neutrals.tertiaryGrey}`,
    backgroundColor: 'white',
    fontSize: 9,
    animation: 'loaded 0.8s linear, unloaded 0.8s linear',
    zIndex: theme.zIndex.activeItem,
    position: 'absolute',
  },
  '@keyframes loaded': {
    '0%': { opacity: 0 },
    '25%': { opacity: '40%' },
    '50%': { opacity: '70%' },
    '75%': { opacity: '90%' },
    '100%': { opacity: '100%' },
  },
  '@keyframes unloaded': {
    '100%': { opacity: '100%' },
    '75%': { opacity: '90%' },
    '50%': { opacity: '70%' },
    '25%': { opacity: '40%' },
    '0%': { opacity: 0 },
  },
  meOnly: {
    backgroundColor: theme.palette.primary.main,
  },
});

export class SignatureC extends React.PureComponent<Props, State> {

  state = {
    hovered: false,
  };

  handleMouseEnter = () => {
    if (this.clearButtonTimeout) {
      clearTimeout(this.clearButtonTimeout);
    }

    this.setState({
      hovered: true,
    });
  };

  handleMouseLeave = () => {
    this.clearButtonTimeout = setTimeout(
      () => this.setState({
        hovered: false,
      }),
      250,
    );
  };

  clearButtonTimeout: TimeoutID;

  render() {
    const {
      classes, value, onClick, stampLookupUrl, wipe, loading, height, zoom, mode, disabled, width,
    } = this.props;

    const { hovered } = this.state;

    if (loading) {
      return (
        <div className={classNames(classes.root, classes.loaderContainer)}>
          <CircularProgress
            variant="indeterminate"
            value={100}
            className={classes.loader}
            size={24}
            thickness={2}
          />
          Adding...
        </div>
      );
    }

    if (!value) {
      return (
        <React.Fragment>
          <button
            type="button"
            className={classNames(
              classes.root,
              classes.signButton,
              { [classes.meOnly]: mode === EDITOR_MODE.SIGNING },
            )}
            onClick={onClick}
          >
            <div className={classes.signIcon}>
              <SignatureIcon />
            </div>
            <span className={classes.signText}>Sign Here</span>
          </button>
          <div
            className={classes.stampLookupUrl}
            style={{ top: height * zoom, fontSize: DEFAULT_STAMP_URL_FONT_SIZE * zoom }}
          >
            {STAMP_URL_PLACEHOLDER}
          </div>
        </React.Fragment>
      );
    }

    // Get svg image dimensions from svg string.
    const svgDimensions = getWidthHeightFromSVGString(value);
    let imageWidth = 0;
    let imageHeight = 0;

    if (svgDimensions) {
      const { width: svgWidth, height: svgHeight } = svgDimensions;
      const widthRatio = width * zoom / svgWidth;
      const heightRatio = height * zoom / svgHeight;

      // As a ratio, use the smallest one of two
      if (widthRatio > heightRatio) {
        imageWidth = svgWidth * heightRatio;
        imageHeight = svgHeight * heightRatio;
      } else {
        imageWidth = svgWidth * widthRatio;
        imageHeight = svgHeight * widthRatio;
      }
    }

    return (
      <React.Fragment>
        <div
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          className={classes.imageContainer}
        >
          <img
            src={value}
            alt="signature"
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              width: imageWidth,
              height: imageHeight,
            }}
          />
        </div>
        <div
          className={classes.stampLookupUrl}
          style={{ top: height * zoom, fontSize: DEFAULT_STAMP_URL_FONT_SIZE * zoom }}
        >
          {stampLookupUrl}
        </div>
        {
          hovered && mode === EDITOR_MODE.SIGNING && !disabled
          && (
            <button
              type="button"
              className={classes.clearButton}
              onClick={wipe}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
              style={{ left: `${width * zoom}px` }}
            >
              Clear
            </button>
          )
        }
      </React.Fragment>
    );
  }

}

export default withStyles(styles)(SignatureC);
