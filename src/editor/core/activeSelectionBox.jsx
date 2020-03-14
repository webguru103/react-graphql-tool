import * as React from 'react';
import { DragSource } from 'react-dnd';
import { withStyles } from '@material-ui/core';
import classnames from 'classnames';
import onClickOutside from 'react-onclickoutside';
import { compose } from '../../utility';
import styles from './activeSelectionBox.styles';
import c from '../constants';

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const fieldSourceSelectionBox = {
  beginDrag(props) {
    const {
      id, pageId, width, height, pageFieldIds, pageFieldRelativePos,
    } = props;
    return {
      id, pageId, width, height, pageFieldIds, pageFieldRelativePos,
    };
  },
};

/**
 * Props to inject
 */
function collectSelectionBox(connect, monitor) {
  return {
    connectDragSourceSelectionBox: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

type Props = {
  classes: Object,
  left: number,
  top: number,
  width: number,
  height: number,
  connectDragSourceSelectionBox: Function,
  isDragging: boolean,
  clearActiveSelectionBox: Function,
};

class ActiveSelectionBoxC extends React.PureComponent<Props> {

  handleClickOutside = () => this.props.clearActiveSelectionBox();

  render() {
    const {
      classes,
      left,
      top,
      width,
      height,
      connectDragSourceSelectionBox,
      isDragging,
    } = this.props;

    return (
      <div className="activeSelectionBoxOutClick">
        {
          connectDragSourceSelectionBox
          && connectDragSourceSelectionBox((
            <div
              onMouseDown={e => e.stopPropagation()}
              onKeyDown={e => e.stopPropagation()}
              role="button"
              tabIndex="-1"
              className={classnames({ [classes.activeSelectionBox]: true, [classes.grabbing]: isDragging })}
              style={{
                left,
                top,
                height,
                width,
              }}
            />
          ))
        }
      </div>
    );
  }

}

export default compose(
  DragSource(c.ItemTypes.SELECTION_BOX, fieldSourceSelectionBox, collectSelectionBox),
  withStyles(styles, { withTheme: true }),
  onClickOutside,
)(ActiveSelectionBoxC);
