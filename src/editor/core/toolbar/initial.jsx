import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { DragSource } from 'react-dnd';
import { compose } from '../../../utility';
import InitialIcon from '../../../assets/initial.svg';
import c from '../../constants';
import styles from './initial.styles';

export const initialPreview = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAkCAYAAADPRbkKAAAAd0lEQV
RYR+3SQQrAIBTE0O/9D20plF7gLUSIG1cTMHHNzJ6Lz/oe8N43nt0DDmerwOEAU4EKoIG+EArkeQ
VYIQIqgAJ5XgFWiIAKoECeV4AVIqACKJDnFWCFCKgACuR5BVghAiqAAnleAVaIgAqgQJ7/BZh0Cv
AAqs5GAWJ5nOsAAAAASUVORK5CYII=`;

const initialSource = {
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

class InitialC extends React.PureComponent<PropType, *> {

  componentDidMount() {
    const preview = new Image();
    preview.src = initialPreview;
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
          onKeyDown={ev => handleKeyDown(ev, c.ItemTypes.INITIAL)}
          onClick={ev => handleClick(ev, c.ItemTypes.INITIAL)}
          className={classNames(classes.root, 'fieldOutClick')}
          data-testid="initialTool"
        >
          <InitialIcon />
          <span className={classes.legend}>Initial</span>
        </div>
      ))
    ));
  }

}

export const Initial = compose(
  DragSource(c.ItemTypes.INITIAL, initialSource, collect),
  withStyles(styles, { withTheme: true }),
)(InitialC);
