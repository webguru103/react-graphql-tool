import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './tabContentWrapper.styles';

const TabContentWrapperC = ({ classes, children, title }: { classes: Object, children: React.Element, title: string }) => (
  <div className={classes.root}>
    <p className={classes.title}>{title}</p>
    {children}
  </div>
);

export default withStyles(styles, { withTheme: true })(TabContentWrapperC);
