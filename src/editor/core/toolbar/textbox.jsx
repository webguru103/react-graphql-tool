import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { DragSource } from 'react-dnd';
import { compose } from '../../../utility';
import TextBoxIcon from '../../../assets/text.svg';
import c from '../../constants';
import styles from './textbox.styles';

export const textboxPreview = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAAZCAYAAAD5VyZAAAAAkUlEQV
RoQ+3ZyQ3AIAwFUdN/0YlQFtHDPC6c/WdkLLPGSSewZuZKJxAv/hNg304vgYsAPehnxQRo8x8CEO
AZAs0ATRN0gCb3v2oCEMATUHZAByjT30tAe4C2AQRo89cB4vwJQID3N9AiqKmCGaDJ3SIozp0ABH
gS8ATETSAAAfwFlB3QAcr0zQBx+qcAoogmcAOvzi4C854AvwAAAABJRU5ErkJggg==`;

const checkboxSource = {
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

class TextboxC extends React.PureComponent<PropType, *> {

  componentDidMount() {
    const preview = new Image();
    preview.src = textboxPreview;
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
          onKeyDown={ev => handleKeyDown(ev, c.ItemTypes.TEXT)}
          onClick={ev => handleClick(ev, c.ItemTypes.TEXT)}
          className={classNames(classes.root, 'fieldOutClick')}
          data-testid="textboxTool"
        >
          <TextBoxIcon />
          <span className={classes.legend}>Text</span>
        </div>
      ))
    ));
  }

}

export const Textbox = compose(
  DragSource(c.ItemTypes.TEXT, checkboxSource, collect),
  withStyles(styles, { withTheme: true }),
)(TextboxC);
