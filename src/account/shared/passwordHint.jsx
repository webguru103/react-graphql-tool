import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './passwordHint.styles';

// TODO actualize password hints
const PasswordHint = ({ classes }: { classes: Object }) => (
  <div className={classes.root}>
    <p>Password requirements:</p>
    <ul className={classes.hintsList}>
      <li>At least 8 characters</li>
      <li>At least one uppercase symbol</li>
      <li>At least one digit</li>
    </ul>
  </div>
);

export default withStyles(styles, { withTheme: true })(PasswordHint);
