import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './layout.styles';
import DTLogo from '../../assets/dt-full-white.svg';

const CertificateLayoutC = ({ classes, children }: { classes: Object, children: React.Element }) => (
  <div className={classes.root}>
    <div className={classes.dealtapLogo}>
      <DTLogo />
      <div className={classes.pageTitle}>Signature Validation System</div>
    </div>
    <div className={classes.content}>
      {children}
    </div>
  </div>
);

export default withStyles(styles, { withTheme: true })(CertificateLayoutC);
