import React from 'react';
import { withStyles } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import styles from './pageHeader.styles';
import { stringTruncateWithEllipsis } from '../../utility';

export const PAGE_HEADER_HEIGHT = 24;
const DOC_NAME_LENGTH = 50;

// TODO: Replace usage of tooltip in codebase with ellipsis component.
const PageHeaderC = ({ classes, documentName }) => (
  <div style={{ height: PAGE_HEADER_HEIGHT }} className={classes.pageHeaderContainer}>
    <div className={classes.pageHeader}>
      <Tooltip
        title={documentName}
        classes={{
          tooltip: (documentName.length > DOC_NAME_LENGTH) ? classes.tooltip : classes.hide,
        }}
      >
        <div>
          { stringTruncateWithEllipsis(documentName, DOC_NAME_LENGTH) }
        </div>
      </Tooltip>
    </div>
  </div>
);

export default withStyles(styles)(PageHeaderC);
