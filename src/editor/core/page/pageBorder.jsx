import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './pageBorder.styles';

type PropType = {
  classes: Object,
  height: number,
  zoom: number,
}

export const DEFAULT_WIDTH = 7;

const PageBorderC = ({
  classes, height, zoom,
}: PropType) => (
  <div className={classes.pageBorder} style={{ height: height * zoom, width: DEFAULT_WIDTH * zoom, left: -DEFAULT_WIDTH * zoom }} />
);

export default withStyles(styles)(PageBorderC);
