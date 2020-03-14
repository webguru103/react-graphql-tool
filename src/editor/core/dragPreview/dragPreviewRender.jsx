import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './dragPreviewRender.style';
import type {
  AdaptedTextField, AdaptedLineField, AdaptedBoolField, AdaptedInitialField,
} from '../flowTypes';

type PropType = {
  activeSelectionRelPos: { [string]: { x: number, y: number } },
  classes: Object,
  fields: { [string]: AdaptedTextField | AdaptedBoolField | AdaptedLineField | AdaptedInitialField },
  offsets: { x: number, y: number },
  zoom: number,
};

class DragPreviewC extends React.PureComponent<PropType, *> {

  render() {
    const {
      activeSelectionRelPos, classes, fields, offsets, zoom,
    } = this.props;
    return (
      Object.keys(activeSelectionRelPos).map((fieldId) => {
        let height = 0;
        let width = 0;
        let line = false;
        let lineStyles = {};
        const { x: fieldX, y: fieldY } = activeSelectionRelPos[fieldId];
        if (fields[fieldId]) {

          if (fields[fieldId].positionLock) {
            return null;
          }

          if (fields[fieldId].type === 'line') {
            let x1 = (fields[fieldId].x1 || 0) * zoom;
            let y1 = (fields[fieldId].y1 || 0) * zoom;
            let x2 = (fields[fieldId].x2 || 0) * zoom;
            let y2 = (fields[fieldId].y2 || 0) * zoom;
            const { strokeThickness } = fields[fieldId];
            line = true;
            x1 -= (offsets ? offsets.x * zoom : 0);
            y1 -= (offsets ? offsets.y * zoom : 0);
            x2 -= (offsets ? offsets.x * zoom : 0);
            y2 -= (offsets ? offsets.y * zoom : 0);
            // Math explained extensively in lineField.jsx
            const calculatedLineLength = Math.sqrt(((x1 - x2) ** 2) + ((y1 - y2) ** 2));
            const midPoint = {
              x: (x1 + x2) / 2,
              y: (y1 + y2) / 2,
            };
            const opposite = Math.abs(y1 - y2) / 2;
            const hypoteneuse = calculatedLineLength / 2;
            const oppositeOverHypoteneuse = opposite / hypoteneuse;
            const radians = Math.asin(oppositeOverHypoteneuse);
            let angle = radians * (180 / Math.PI);
            const uppermostPoint = y1 < y2 ? 'y1' : 'y2';
            const isUpperPointTopRight = (uppermostPoint === 'y1' && x1 > x2)
              || (uppermostPoint === 'y2' && x2 > x1);

            if (isUpperPointTopRight) {
              angle = Math.abs(angle - 180);
            }
            const topLeftCorner = {
              x: (midPoint.x - (calculatedLineLength / 2)),
              y: (midPoint.y),
            };

            lineStyles = {
              height: strokeThickness,
              marginTop: -(strokeThickness || 0) / 2,
              width: calculatedLineLength,
              transform: `translate(${topLeftCorner.x}px, ${topLeftCorner.y}px) rotate(${angle}deg)`,
            };
          } else {
            ({ height, width } = fields[fieldId]);
          }
        }
        return (
          <div
            key={fieldId}
            className={classes.dragField}
            style={line ? lineStyles
              : {
                top: fieldY * zoom,
                left: fieldX * zoom,
                height: `${(height || 0) * zoom}px`,
                width: `${(width || 0) * zoom}px`,
              }
            }
          />
        );
      })
    );
  }

}

export default withStyles(styles)(DragPreviewC);
