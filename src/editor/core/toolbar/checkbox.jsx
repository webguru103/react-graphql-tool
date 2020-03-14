import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { DragSource } from 'react-dnd';
import { compose } from '../../../utility';
import CheckboxIcon from '../../../assets/checkbox.svg';
import c from '../../constants';
import styles from './checkbox.styles';

export const checkboxPreview = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0
IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAAD
x4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC
4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLX
JkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgIC
AgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgIC
AgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZX
NjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAAStJREFUSA3tVkFug0
AMZHdJesgxkSIewAEeA1/ilSB4AKSVuDWHJNrdehDbUilSLNW9rSVrwbZm7DmNyvPcl2X54Zz79N
6bRDiUUgnhWq31oeu6c1LX9WUcxxMVFeUb5U4498Du+/5UVdUltdZesyybaRNPx92ED/yGI9KZVL
ymVIGMO8o7NsEEZJAKwgQejtnTa9L1B4VAtHxLERJ+2N6BXIerpAhe4ej1wldzYn0thsQEioRMof
hjUVK+VszJKClTKP5YlJSvFXMySsoUij/275LCVmwjWIzFdzRNg1c6A99yHFybpXygSoQOr2T8eK
jkTt82hSMehuFIp89EBLv4W4O/s0OxxzRNR3ApWP2iKN5hUqlhtqbqmaML/W0v1J7tts5ZY8yhbd
vzF3tIs9U1lPZvAAAAAElFTkSuQmCC`;

const checkboxSource = {
  beginDrag(props) {
    const { id, pageId } = props;
    return { id, pageId };
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
  classes: Object,
  connectDragSource: Function,
  handleClick: Function,
  handleKeyDown: Function,
}

class CheckboxC extends React.PureComponent<PropType, *> {

  componentDidMount() {
    const preview = new Image();
    preview.src = checkboxPreview;
    preview.onload = () => this.props.connectDragPreview && this.props.connectDragPreview(preview, { offsetX: 0, offsetY: 0 });
  }

  render() {
    const {
      classes, connectDragSource, handleClick, handleKeyDown,
    } = this.props;
    return connectDragSource && connectDragSource((
      <div
        role="button"
        tabIndex="0"
        onClick={ev => handleClick(ev, c.ItemTypes.CHECKBOX)}
        onKeyDown={ev => handleKeyDown(ev, c.ItemTypes.CHECKBOX)}
        className={classNames(classes.root, 'fieldOutClick')}
        data-testid="checkboxTool"
      >
        <CheckboxIcon />
        <span className={classes.legend}>Checkbox</span>
      </div>
    ));
  }

}

export const Checkbox = compose(
  DragSource(c.ItemTypes.CHECKBOX, checkboxSource, collect),
  withStyles(styles, { withTheme: true }),
)(CheckboxC);
