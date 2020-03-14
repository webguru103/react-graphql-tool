import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { DragSource } from 'react-dnd';
import DateIcon from '../../../assets/date.svg';
import { compose } from '../../../utility';
import c from '../../constants';
import styles from './date.styles';

export const datePreview = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAYCAYAAABZY7uwAAAAZUlEQV
RYR+3UOwqAMBRFwZf9L1oR7MQPnE4mTao0w8ldM7ONcyuwTqDjdq4CG6DnLAC9fBtAgNqyKkhBCm
oCCmp+NkhBCmoCCmp+NkhBCmoCCmp+NkhBCmoCCmp+NuhrQc35x693VxguATvUBo8AAAAASUVORK
5CYII=`;

const dateSource = {
  beginDrag(props) {
    const { id } = props;
    return { id };
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview(),
  };
}

type PropType = {
  connectDragPreview: Function,
  connectDragSource: Function,
  handleClick: Function,
  handleKeyDown: Function,
  classes: Object
}

class DateC extends React.PureComponent<PropType, *> {

  componentDidMount() {
    const preview = new Image();
    preview.src = datePreview;
    preview.onload = () => this.props.connectDragPreview && this.props.connectDragPreview(preview, { offsetX: 0, offsetY: 0 });
  }

  render() {
    const {
      connectDragSource, handleClick, classes, handleKeyDown,
    } = this.props;
    return ((
      connectDragSource && connectDragSource((
        <div
          role="button"
          tabIndex="0"
          onKeyDown={ev => handleKeyDown(ev, c.ItemTypes.DATE)}
          onClick={ev => handleClick(ev, c.ItemTypes.DATE)}
          className={classNames(classes.root, 'fieldOutClick')}
          data-testid="dateTool"
        >
          <DateIcon />
          <span className={classes.legend}>Date</span>
        </div>
      ))
    ));
  }

}

export const Date = compose(
  DragSource(c.ItemTypes.DATE, dateSource, collect),
  withStyles(styles, { withTheme: true }),
)(DateC);
