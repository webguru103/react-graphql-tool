import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './footer.styles';
import { VERSION_NUMBER, ENVIRONMENT } from '../../configurations';

const FooterC = ({ classes }: { classes: Object }) => (
  <div className={classes.root}>{`${String(ENVIRONMENT)} Version: ${VERSION_NUMBER}`}</div>
);

export default withStyles(styles)(FooterC);
