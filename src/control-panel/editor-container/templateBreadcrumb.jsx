import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './templateBreadcrumb.styles';

const TemplateBreadcrumbC = ({
  classes, groupName, formName, published,
}: {
  classes: Object, groupName: string, formName: string, published: boolean,
}) => (
  <div>
    <div className={classes.groupName}>
      {groupName}
    </div>
    <div className={classes.formName}>
      <span>{formName}</span>
      <span>{published ? '(Published)' : ''}</span>
    </div>
  </div>
);

export default withStyles(styles, { withTheme: true })(TemplateBreadcrumbC);
