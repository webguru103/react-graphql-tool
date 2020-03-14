import * as React from 'react';
import classNames from 'classnames';
import { withStyles, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import ChevronRight from '../../../assets/chevron_right.svg';
import ChevronLeft from '../../../assets/chevron_left.svg';
import ZoomIn from '../../../assets/zoomIn.svg';
import ZoomOut from '../../../assets/zoomOut.svg';
import Logo from '../../../assets/gfx-logo-dt-full.svg';
import styles from './toolbar.styles';
import { Checkbox, checkboxPreview } from './checkbox';
import { Textbox, textboxPreview } from './textbox';
import { Date, datePreview } from './date';
import { Signature, signaturePreview } from './signature';
import { Initial, initialPreview } from './initial';
import { Line, linePreview } from './line';
import { KEY_CODE } from '../../../constants';
import {
  EDITOR_MODE,
  ZOOM_INCREASE_DEFAULT,
  ZOOM_DECREASE_DEFAULT,
  ZOOM_MINIMUM,
  ZOOM_MAXIMUM,
} from '../../constants';
import SigneesDropdown from './signeesDropdown';
import type { SessionSignee } from '../../../agent-panel/api/fragments/sessionSignee';
import Download from '../../../assets/download.svg';
import { noop } from '../../../utility';

type Props = {
  floatingFieldType: ?string,
  classes: Object,
  mode: string,
  updateFloatingFieldType: Function,
  handleUpdateZoom: Function,
  zoom: number,
  signees: Array<?SessionSignee>,
  currentSignee: string,
  onSigneeChange: (string) => void,
  colorMap: {[string]: { red: string, blue: string, green: string, alpha: string }},
  totalSign: number,
  signed: number,
  jumpToNextField: () => void,
  jumpToPreviousField: () => void,
  sessionFinished: boolean,
  downloadDocuments: () => void,
  zoomAdjustmentFactor: number,
  currentlyDownloading: ?boolean,
};

type State = {
  floatingFieldX: number,
  floatingFieldY: number,
}
export class ToolbarC extends React.Component<Props, State> {

  state = {
    floatingFieldX: 0,
    floatingFieldY: 0,
  };

  componentDidUpdate() {
    if (this.props.floatingFieldType === null) {
      window.removeEventListener('mousemove', this.handleMouseMove);
    }
  }

  handleMouseMove = (ev: SyntheticMouseEvent<HTMLElement>) => {
    this.setState({ floatingFieldX: ev.clientX, floatingFieldY: ev.clientY });
  };

  createFloatingElement = (type: string) => {
    this.props.updateFloatingFieldType(type);
    window.addEventListener('mousemove', this.handleMouseMove);
  };

  destroyFloatingElement = () => {
    this.props.updateFloatingFieldType(null);
    window.removeEventListener('mousemove', this.handleMouseMove);
  };

  handleClick = (ev: SyntheticMouseEvent<HTMLElement>, type: string) => {
    if (this.props.floatingFieldType) {
      ev.preventDefault();
      ev.stopPropagation();
      this.destroyFloatingElement();
    } else {
      this.createFloatingElement(type);
      this.setState({ floatingFieldX: ev.clientX, floatingFieldY: ev.clientY });
    }
  };

  handleTileKeyPress = (e: SyntheticKeyboardEvent<HTMLElement>) => {
    if (e.keyCode === KEY_CODE.ENTER || e.keyCode === KEY_CODE.SPACE) {
      // TODO drop field onto page
    }
  };

  handleToolbarKeyPress = (e: SyntheticKeyboardEvent<HTMLElement>) => {
    if (e.keyCode === KEY_CODE.ESC) {
      this.destroyFloatingElement();
    }
  };

  renderFollowField = () => {
    const {
      classes, floatingFieldType, colorMap, currentSignee,
    } = this.props;
    const { floatingFieldX, floatingFieldY } = this.state;
    let bg;

    if (floatingFieldType) {
      switch (floatingFieldType) {
        case 'checkbox':
          bg = checkboxPreview;
          break;
        case 'text':
          bg = textboxPreview;
          break;
        case 'date':
          bg = datePreview;
          break;
        case 'signature':
          bg = signaturePreview;
          break;
        case 'initial':
          bg = initialPreview;
          break;
        case 'line':
          bg = linePreview;
          break;
        default:
          bg = checkboxPreview;
          break;
      }
    }
    const style = {
      left: floatingFieldX,
      top: floatingFieldY,
      pointerEvents: 'none',
      backgroundColor: `rgba(
        ${colorMap[currentSignee || ''].red},
        ${colorMap[currentSignee || ''].green},
        ${colorMap[currentSignee || ''].blue},
        ${colorMap[currentSignee || ''].alpha}
      )`,
    };
    return <img style={style} src={bg} className={classes.followField} alt={floatingFieldType} />;
  };

  render() {
    const {
      classes,
      floatingFieldType,
      mode,
      zoom,
      handleUpdateZoom,
      signees,
      currentSignee,
      onSigneeChange,
      colorMap,
      totalSign,
      signed,
      jumpToNextField,
      jumpToPreviousField,
      sessionFinished,
      downloadDocuments,
      zoomAdjustmentFactor,
      currentlyDownloading,
    } = this.props;

    const canZoomIn = zoom + ZOOM_INCREASE_DEFAULT * zoomAdjustmentFactor <= ZOOM_MAXIMUM * zoomAdjustmentFactor;
    const canZoomOut = zoom + ZOOM_DECREASE_DEFAULT * zoomAdjustmentFactor >= ZOOM_MINIMUM * zoomAdjustmentFactor;

    return (

      <div
        className={classNames({
          [classes.root]: true,
          [classes.withAppBar]: (mode !== EDITOR_MODE.INSTANCE_VIEW),
        })}
        style={{
          position: (mode === EDITOR_MODE.INSTANCE_VIEW) || (mode === EDITOR_MODE.SIGNING) ? 'fixed' : 'static',
        }}
      >
        {mode !== EDITOR_MODE.INSTANCE_VIEW && (
          <React.Fragment>
            <div
              className={classNames({
                [classes.zoomIcons]: true,
              })}
            >
              <ZoomIn
                className={classNames(classes.zoomIcon, { [classes.zoomIconDisabled]: !canZoomIn })}
                onClick={canZoomIn ? () => handleUpdateZoom(ZOOM_INCREASE_DEFAULT) : noop}
              />
            </div>
            <div
              className={classNames({
                [classes.zoomIcons]: true,
              })}
            >
              <ZoomOut
                className={classNames(classes.zoomIcon, { [classes.zoomIconDisabled]: !canZoomOut })}
                onClick={canZoomOut ? () => handleUpdateZoom(ZOOM_DECREASE_DEFAULT) : noop}
              />
            </div>
          </React.Fragment>
        )}
        {
          (mode !== EDITOR_MODE.TEMPLATE_PUBLISHED)
          && (mode !== EDITOR_MODE.SIGNING)
          && (mode !== EDITOR_MODE.INSTANCE_VIEW)
          && (
            <React.Fragment>
              <div
                role="button"
                tabIndex={-1}
                onKeyDown={this.handleToolbarKeyPress}
                className={classNames(classes.addFieldIcons, 'pageOutClick')}
              >
                {floatingFieldType && this.renderFollowField()}
                <Textbox handleClick={this.handleClick} handleKeyDown={this.handleTileKeyPress} />
                <Checkbox handleClick={this.handleClick} handleKeyDown={this.handleTileKeyPress} />
                <Signature handleClick={this.handleClick} handleKeyDown={this.handleTileKeyPress} />
                <Initial handleClick={this.handleClick} handleKeyDown={this.handleTileKeyPress} />
                <Date handleClick={this.handleClick} handleKeyDown={this.handleTileKeyPress} />
                <Line handleClick={this.handleClick} handleKeyDown={this.handleTileKeyPress} />
              </div>
              {
                mode === EDITOR_MODE.INSTANCE_PREPARATION && (
                  <SigneesDropdown colorMap={colorMap} signees={signees} currentSignee={currentSignee} handleChange={onSigneeChange} />
                )
              }
            </React.Fragment>
          )
        }
        {
          (mode === EDITOR_MODE.SIGNING && (
            <React.Fragment>
              <Button
                onClick={jumpToPreviousField}
                classes={{ root: classNames(classes.signJumpButtons, { [classes.signJumpButtonsDisabled]: sessionFinished }) }}
                disabled={sessionFinished}
              >
                <span className={classes.chevronArrows}>
                  <ChevronLeft />
                </span>
                Previous
              </Button>
              <Button
                onClick={jumpToNextField}
                classes={{ root: classNames(classes.signJumpButtons, { [classes.signJumpButtonsDisabled]: sessionFinished }) }}
                disabled={sessionFinished}
              >
                Next
                <span className={classes.chevronArrows}>
                  <ChevronRight />
                </span>
              </Button>
              <span className={classes.signedCount}>{`${signed} / ${totalSign} Signed`}</span>
            </React.Fragment>
          ))
        }
        {
          (mode === EDITOR_MODE.INSTANCE_VIEW) && (
            <React.Fragment>
              <Logo className={classes.logo} />
              <div
                className={classNames({
                  [classes.zoomViewIcons]: true,
                })}
              >
                <ZoomIn
                  className={classNames(classes.zoomIcon, { [classes.zoomIconDisabled]: !canZoomIn })}
                  onClick={canZoomIn ? handleUpdateZoom(ZOOM_INCREASE_DEFAULT) : noop}
                />
              </div>
              <div
                className={classNames({
                  [classes.zoomViewIcons]: true,
                })}
              >
                <ZoomOut
                  className={classNames(classes.zoomIcon, { [classes.zoomIconDisabled]: !canZoomOut })}
                  onClick={canZoomOut ? handleUpdateZoom(ZOOM_DECREASE_DEFAULT) : noop}
                />
              </div>
              <Button
                onClick={() => downloadDocuments()}
              >
                <span className={classes.downloadIcon}>
                  {!currentlyDownloading ? <Download /> : (
                    <CircularProgress
                      variant="indeterminate"
                      value={100}
                      size={20}
                      thickness={2}
                      className={classes.loader}
                    />
                  )}
                </span>
                  Download
              </Button>
            </React.Fragment>
          )
        }
      </div>
    );
  }

}

export default withStyles(styles, { withTheme: true })(ToolbarC);
