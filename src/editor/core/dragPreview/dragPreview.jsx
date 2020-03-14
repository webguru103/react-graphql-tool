import * as React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './dragPreview.styles';
import DragPreviewRender from './dragPreviewRender';
import type { BoolField, TextField, LineField } from '../flowTypes';

const getContainerStyle = (props) => {
  const { activeSelectionBox: { left: selectionOffsetX, top: selectionOffsetY }, currentOffset } = props;
  if (!currentOffset) {
    return {
      display: 'none',
      offsets: { x: selectionOffsetX, y: selectionOffsetY },
    };
  }

  let x = 0;
  let y = 0;

  if (currentOffset) {
    x = (selectionOffsetX * props.zoom + currentOffset.x);
    y = (selectionOffsetY * props.zoom + currentOffset.y);
  }

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
    offsets: { x: selectionOffsetX, y: selectionOffsetY },
  };
};

type PropType = {
  classes: Object,
  activeSelectionRelPos: { string: { x: number, y: number } },
  activeSelectionBox: { top: number, left: number },
  fields: { [string]: TextField | BoolField | LineField },
  currentOffset: { x: number, y: number },
  zoom: number,
}

const DragPreviewC = (props: PropType) => {
  const {
    classes, activeSelectionRelPos, activeSelectionBox, fields, zoom,
  } = props;

  const containerStyle = getContainerStyle(props);

  return (
    <div className={classes.dragContainer} style={containerStyle}>
      <DragPreviewRender
        zoom={zoom}
        fields={fields}
        activeSelectionBox={activeSelectionBox}
        activeSelectionRelPos={activeSelectionRelPos}
        offsets={containerStyle.offsets}
      />
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(DragPreviewC);
