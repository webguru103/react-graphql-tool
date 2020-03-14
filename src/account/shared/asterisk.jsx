import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = (theme: Object) => ({
  asterisk: {
    color: theme.palette.semantic.mainRed,
  },
});

const AsteriskC = ({ classes }: { classes: Object }) => <span className={classes.asterisk}>*</span>;

export default withStyles(styles, { withTheme: true })(AsteriskC);
