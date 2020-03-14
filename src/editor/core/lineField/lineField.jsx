import * as React from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { withStyles } from '@material-ui/core';
import classnames from 'classnames';
import ResizeIcon from '@material-ui/icons/Brightness1';
import onClickOutside from 'react-onclickoutside';
import debounce from 'lodash.debounce';
import { compose, isDefined } from '../../../utility';
import styles from './lineField.styles';
import c, { EDITOR_MODE } from '../../constants';
import { adjustLineAttributesForPageSize } from '../utils';
import type { LineAttributes, AdaptedLineField } from '../flowTypes';

const MINIMUM_LINE_THICKNESS = 1;

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const fieldSource = {
  beginDrag(props) {
    const {
      field: {
        id, x1, y1, x2, y2,
      }, inActiveSelection, pageIndex,
    } = props;
    return {
      id, pageIndex, x1, y1, x2, y2, inActiveSelection,
    };
  },
};

/**
 * Specifies resize dragging contract for vertex 1
 */
const fieldSourceResize1 = {
  beginDrag(props) {
    const {
      field: {
        id, x1, y1,
      }, pageIndex,
    } = props;
    return {
      id, pageIndex, x1, y1,
    };
  },
};

/**
 * Specifies resize dragging contract for vertex 2
 */
const fieldSourceResize2 = {
  beginDrag(props) {
    const {
      field: {
        id, x2, y2,
      }, pageIndex,
    } = props;
    return {
      id, pageIndex, x2, y2,
    };
  },
};

/**
 * Props to inject for dragging.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
}

/**
 * Props to inject for resize dragging on vertex 1.
 */
function collectResize1(connect, monitor) {
  return {
    connectDragPreviewResize1: connect.dragPreview(),
    connectDragSourceResize1: connect.dragSource(),
    isDraggingResize1: monitor.isDragging(),
  };
}

/**
 * Props to inject for resize dragging on vertex 2.
 */
function collectResize2(connect, monitor) {
  return {
    connectDragPreviewResize2: connect.dragPreview(),
    connectDragSourceResize2: connect.dragSource(),
    isDraggingResize2: monitor.isDragging(),
  };
}

type PropType = {
  classes: Object,
  connectDragSource: Function,
  connectDragSourceResize1: Function,
  connectDragSourceResize2: Function,
  connectDragPreview: Function,
  connectDragPreviewResize1: Function,
  connectDragPreviewResize2: Function,
  dragging: boolean,
  currentActivePageField: boolean,
  inActiveSelection: boolean,
  handleActiveSelectionRemove: Function,
  handleActiveSelectionClear: Function,
  offsetHeight: number,
  offsetWidth: number,
  addFieldsToSelection?: Function,
  field: AdaptedLineField,
  pageIndex: number,
  handleLineFieldUpdate: Function,
  pageRef: React.Element,
  isDragging: boolean,
  isDraggingResize1: boolean,
  isDraggingResize2: boolean,
  mode: string,
  zoom: number,
}

const UNBLOCK_DELAY = 250;
const UNBLOCK_TIMER_DEBOUNCE = 100;

export class LineFieldC extends React.Component<PropType, *> {

  // Store calculated values on 'this' rather than in state to
  // prevent double state updates on calculation in render() which
  // would occur with this.setState(), but still want to keep a record
  // of the last updated value on the object itself.
  queuedLineCoordinateUpdate = false;

  // Set to true to temporarily block updates from props
  // This should be done so that in the time between when the coordinates
  // for the line are updated at the top level and the time dragging stops,
  // there is no update back to the previous state, which may cause the line to flash.
  blockingUpdateAfterDrag = false;

  adjustedx1 = (this.props.field.x1 || 0) * this.props.zoom;

  adjustedy1 = (this.props.field.y1 || 0) * this.props.zoom;

  adjustedx2 = (this.props.field.x2 || 0) * this.props.zoom;

  adjustedy2 = (this.props.field.y2 || 0) * this.props.zoom;

  // Call this function to set block updates back to false
  // after a period of time.
  acceptUpdatesAfterTimer = debounce(() => {
    setTimeout(() => {
      this.blockingUpdateAfterDrag = false;
    }, UNBLOCK_DELAY);
  }, UNBLOCK_TIMER_DEBOUNCE)

  handleUpdateLine = debounce((adjusted: LineAttributes) => {
    const {
      field: { id },
      pageIndex,
      handleLineFieldUpdate,
    } = this.props;

    handleLineFieldUpdate(id, adjusted.x1, adjusted.y1, adjusted.x2, adjusted.y2, pageIndex);
  }, 200)

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: false,
    });
    this.props.connectDragPreviewResize1(getEmptyImage(), {
      captureDraggingState: true,
    });
    this.props.connectDragPreviewResize2(getEmptyImage(), {
      captureDraggingState: true,
    });
  }

  shouldComponentUpdate(nextProps: PropType) {
    // Update this component when it is in the active selection,
    // unless just switching from selected to not selected.
    if (this.props.inActiveSelection !== nextProps.inActiveSelection) {
      return true;
    }

    // Update the component as a result of external events, like zoom change
    if (this.props.zoom !== nextProps.zoom) {
      return true;
    }

    if (!nextProps.inActiveSelection) {
      return false;
    }

    return true;
  }

  handleClickOutside = () => {
    this.props.handleActiveSelectionClear();
  };

  handleFieldClick = (ev: SyntheticMouseEvent<HTMLElement>, id: number) => {
    const {
      inActiveSelection,
      addFieldsToSelection,
      handleActiveSelectionRemove,
    } = this.props;

    ev.stopPropagation();

    if (ev.ctrlKey || ev.metaKey) {
      if (inActiveSelection) {
        handleActiveSelectionRemove(id);
      } else if (addFieldsToSelection) {
        // calling addFieldToSelection function with top/left corner
        // coordinates of a line rectangle
        addFieldsToSelection([id]);
      }
    } else if (!inActiveSelection && addFieldsToSelection) {
      addFieldsToSelection([id], { resetSelection: true });
    }
  };

  render() {
    const {
      field: {
        id, strokeThickness, temporary, x1, y1, x2, y2, positionLock,
      },
      classes,
      connectDragSource,
      dragging,
      currentActivePageField,
      inActiveSelection,
      pageRef,
      offsetHeight,
      offsetWidth,
      isDragging,
      isDraggingResize2,
      isDraggingResize1,
      connectDragSourceResize1,
      connectDragSourceResize2,
      mode,
      zoom,
    } = this.props;

    const pageRect = pageRef && pageRef.getBoundingClientRect();
    const strokeThicknessWithZoom = ((strokeThickness || 0) * zoom);

    // Adjust coordinates for each drag type.
    // Set queuedLineCoordinateUpdate = true to signal that an update should be sent to
    // handleUpdateLine and templateEditor function handleLineFieldUpdate
    if (!positionLock && isDraggingResize1 && isDefined(offsetWidth) && isDefined(offsetHeight)) {
      const updated = {
        x1: Math.round((x1 || 0) * zoom + offsetWidth),
        y1: Math.round((y1 || 0) * zoom + offsetHeight),
      };
      const adjusted = adjustLineAttributesForPageSize(pageRect.height, pageRect.width, updated);
      this.adjustedx1 = adjusted.x1;
      this.adjustedy1 = adjusted.y1;
      this.queuedLineCoordinateUpdate = true;
      this.blockingUpdateAfterDrag = true;
      this.acceptUpdatesAfterTimer();
    }

    if (!positionLock && isDraggingResize2 && isDefined(offsetWidth) && isDefined(offsetHeight)) {
      const updated = {
        x2: Math.round((x2 || 0) * zoom + offsetWidth),
        y2: Math.round((y2 || 0) * zoom + offsetHeight),
      };
      const adjusted = adjustLineAttributesForPageSize(pageRect.height, pageRect.width, updated);
      this.adjustedx2 = adjusted.x2;
      this.adjustedy2 = adjusted.y2;
      this.queuedLineCoordinateUpdate = true;
      this.blockingUpdateAfterDrag = true;
      this.acceptUpdatesAfterTimer();
    }

    // If coordinates have been updated and dragging stopped, trigger handleUpdateLine
    // to push changes up to parent components
    if (this.queuedLineCoordinateUpdate
      && !isDragging
      && !isDraggingResize2
      && !isDraggingResize2
      && !isDefined(offsetWidth)
      && !isDefined(offsetHeight)
    ) {
      this.queuedLineCoordinateUpdate = false;
      this.handleUpdateLine({
        x1: Math.floor(this.adjustedx1 / zoom),
        y1: Math.floor(this.adjustedy1 / zoom),
        x2: Math.floor(this.adjustedx2 / zoom),
        y2: Math.floor(this.adjustedy2 / zoom),
      });
      this.blockingUpdateAfterDrag = true;
      this.acceptUpdatesAfterTimer();
    }

    // If new props are received when not dragging, update directly
    if (!this.blockingUpdateAfterDrag
      && !isDragging
      && !isDraggingResize2
      && !isDraggingResize2
      && !isDefined(offsetWidth)
      && !isDefined(offsetHeight)
    ) {
      this.adjustedx1 = (this.props.field.x1 || 0) * zoom;
      this.adjustedy1 = (this.props.field.y1 || 0) * zoom;
      this.adjustedx2 = (this.props.field.x2 || 0) * zoom;
      this.adjustedy2 = (this.props.field.y2 || 0) * zoom;
    }

    // Trig Time
    // Line is rendered with a div, and a div is rendered with a top, left absolute positioning
    // and then rotated by degrees on its midpoint.
    // Therefore, need to translate x1, y1, x2, y2 coordinates into top, left and rotation degree to render the div correctly.
    const calculatedLineLength = Math.sqrt(((this.adjustedx1 - this.adjustedx2) ** 2) + ((this.adjustedy1 - this.adjustedy2) ** 2));
    const midPoint = {
      x: (this.adjustedx1 + this.adjustedx2) / 2,
      y: (this.adjustedy1 + this.adjustedy2) / 2,
    };
    const opposite = Math.abs(this.adjustedy1 - this.adjustedy2) / 2;
    const hypoteneuse = calculatedLineLength / 2;
    const oppositeOverHypoteneuse = opposite / hypoteneuse;
    const radians = Math.asin(oppositeOverHypoteneuse);
    let angle = radians * (180 / Math.PI);

    // isUpperPointTopRight is true if the vertex closest to the top of the page is further right
    // than the second vertex of the line.
    // The angle calculation above is found simply by using the absolute value of (y1 - y2) then divided by 2 to find
    // the length of the opposite side of a right triangle in which the hypoteneuse = calculatedLineLength / 2,
    // so this is basically assuming the line runs diagonally from the top left to the bottom right.
    // If isUpperPointTopRight is true, that means the line runs top right to bottom left,
    // and the angle calculation needs to be 'reversed' by finding the difference between the
    // calculated angle and 180.
    const uppermostPoint = this.adjustedy1 < this.adjustedy2 ? 'adjustedy1' : 'adjustedy2';
    const isUpperPointTopRight = (uppermostPoint === 'adjustedy1' && this.adjustedx1 > this.adjustedx2)
      || (uppermostPoint === 'adjustedy2' && this.adjustedx2 > this.adjustedx1);

    if (isUpperPointTopRight) {
      angle = Math.abs(angle - 180);
    }

    const topLeftCorner = {
      x: midPoint.x - (calculatedLineLength / 2),
      y: midPoint.y,
    };

    return (
      <div className="fieldOutClick">
        { (mode !== EDITOR_MODE.TEMPLATE_PUBLISHED && positionLock !== true) ? connectDragSource && connectDragSource((
          <div
            onMouseDown={e => this.handleFieldClick(e, id)}
            role="button"
            tabIndex="-1"
            data-testid="line-field-container"
            style={{
              height: 0,
              width: calculatedLineLength,
              transform: `translate(${topLeftCorner.x}px, ${topLeftCorner.y}px) rotate(${angle}deg)`,
            }}
            key={id}
            className={classnames({
              [classes.fieldContainer]: true,
              [classes.dragging]: dragging && inActiveSelection,
              [classes.temporary]: temporary,
            })}
          >
            <div
              style={{
                height: strokeThicknessWithZoom < MINIMUM_LINE_THICKNESS ? MINIMUM_LINE_THICKNESS : strokeThicknessWithZoom,
                width: calculatedLineLength,
              }}
              className={classnames({
                [classes.field]: true,
                [classes.activeSelection]: inActiveSelection,
              })}
            />
          </div>
        ))
          : (
            <div
              onMouseDown={e => this.handleFieldClick(e, id)}
              role="button"
              tabIndex="-1"
              data-testid="line-field-container"
              style={{
                height: 0,
                width: calculatedLineLength,
                transform: `translate(${topLeftCorner.x}px, ${topLeftCorner.y}px) rotate(${angle}deg)`,
              }}
              key={id}
              className={classnames({
                [classes.fieldContainer]: true,
                [classes.temporary]: temporary,
              })}
            >
              <div
                style={{
                  height: strokeThicknessWithZoom < MINIMUM_LINE_THICKNESS ? MINIMUM_LINE_THICKNESS : strokeThicknessWithZoom,
                  width: calculatedLineLength,
                }}
                className={classnames({
                  [classes.field]: true,
                  [classes.activeSelection]: inActiveSelection,
                })}
              />
            </div>
          )
        }

        {(mode !== EDITOR_MODE.TEMPLATE_PUBLISHED && positionLock !== true) && currentActivePageField && connectDragSourceResize1((
          <div
            onMouseDown={e => e.stopPropagation()}
            onKeyDown={e => e.stopPropagation()}
            role="button"
            tabIndex="-1"
          >
            <ResizeIcon
              className={classnames({
                [classes.resizeHandle]: true,
                [classes.dragging]: dragging,
              })}
              style={{
                left: this.adjustedx1,
                top: this.adjustedy1,
              }}
            />
          </div>
        ))
        }
        {(mode !== EDITOR_MODE.TEMPLATE_PUBLISHED && positionLock !== true) && currentActivePageField && connectDragSourceResize2((
          <div
            onMouseDown={e => e.stopPropagation()}
            onKeyDown={e => e.stopPropagation()}
            role="button"
            tabIndex="-1"
          >
            <ResizeIcon
              className={classnames({
                [classes.resizeHandle]: true,
                [classes.dragging]: dragging,
              })}
              style={{
                left: this.adjustedx2,
                top: this.adjustedy2,
              }}
            />
          </div>
        ))
        }
      </div>
    );
  }

}

export default compose(
  DragSource(c.ItemTypes.FIELD, fieldSource, collect),
  DragSource(c.ItemTypes.RESIZE_LINE, fieldSourceResize1, collectResize1),
  DragSource(c.ItemTypes.RESIZE_LINE, fieldSourceResize2, collectResize2),
  withStyles(styles, { withTheme: true }),
  onClickOutside,
)(LineFieldC);
