import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './pageFooter.styles';

type PropType = {
  classes: Object,
  height: number,
  width: number,
  zoom: number,
  totalPages: number,
  pageNumber: number,
  formName: string,
}

const PageBorderC = ({
  classes, height, width, zoom, totalPages, pageNumber, formName,
}: PropType) => (
  <div
    className={classes.pageFooter}
    style={{ width: width * zoom, top: height * zoom }}
  >
    <div style={{ textAlign: 'left', paddingLeft: '10px' }}>
      {formName}
      <div style={{ float: 'right', paddingRight: '10px' }}>
        {`${pageNumber}/${totalPages}`}
      </div>
    </div>
  </div>
);

export default withStyles(styles)(PageBorderC);
