import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './layout.styles';
import DTLogo from '../../assets/dt-full-big-white.svg';

const SignatureLayoutC = ({ classes, children }: { classes: Object, children: React.Element }) => (
  <div className={classes.root}>
    <div className={classes.actionPanel}>
      <div>
        <div className={classes.dealtapLogo}>
          <DTLogo />
        </div>
        <div className={classes.content}>
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default withStyles(styles, { withTheme: true })(SignatureLayoutC);
