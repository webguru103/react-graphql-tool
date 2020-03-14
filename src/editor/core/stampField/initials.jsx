import * as React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import InitialIcon from '../../../assets/initial-alt.svg';
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
  width: number,
  zoom: number,
  color: { red: number, green: number, blue: number },
  disabled: boolean,
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
    justifyContent: 'center',
    flexFlow: 'column',
  },
  loaderContainer: {
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main,
  },
  loader: {
    color: 'white',
  },
  signButton: {
    border: 'none',
    borderRadius: 5,
    color: 'white',
    backgroundColor: 'transparent',
    outline: 'none',
  },
  signText: {
    fontSize: 12,
  },
  initialsImage: {
    outline: 'none',
    maxWidth: '100%',
    maxHeight: '100%',
    width: 'inherit',
    height: 'inherit',
  },
  signIcon: {
    color: 'white',
  },
  stampLookupUrl: {
    position: 'absolute',
    whiteSpace: 'nowrap',
  },
  imageContainer: {
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    width: 'inherit',
    height: 'inherit',
  },
  meOnly: {
    backgroundColor: theme.palette.primary.main,
  },
});

export class InitialsC extends React.PureComponent<Props, State> {

  state = {
    hovered: false,
  };

  handleMouseEnter = () => {
    if (this.clearButtonTimeout) {
      clearTimeout(this.clearButtonTimeout);
    }
    this.setState({ hovered: true });
  };

  handleMouseLeave = () => {
    this.clearButtonTimeout = setTimeout(() => this.setState({ hovered: false }), 250);
  };

  clearButtonTimeout: TimeoutID;

  render() {
    const {
      classes, value, onClick, stampLookupUrl, wipe, loading, height, width, zoom, mode, disabled,
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
              // if field has no value, and it's a signing mode, add a background
              { [classes.meOnly]: mode === EDITOR_MODE.SIGNING },
            )}
            onClick={onClick}
          >
            <div className={classes.signIcon}>
              <InitialIcon />
            </div>
            <span className={classes.signText}>Initial</span>
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
            alt="initials"
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

export default withStyles(styles)(InitialsC);
