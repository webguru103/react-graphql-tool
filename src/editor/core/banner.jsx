import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './banner.styles';

type Props = {
  classes: Object,
  children: React.Node
};

const BannerC = ({ classes, children }: Props) => (
  <div className={classes.banner}>
    {children}
  </div>
);

export default withStyles(styles, { withTheme: true })(BannerC);
