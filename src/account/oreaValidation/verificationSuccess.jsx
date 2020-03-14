import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Button from '../../shared/button/button';
import styles from './verificationSuccess.styles';
import c from './constants';
import IcCompleteGreen from '../shared/icons/ic-complete-green.svg';

type PropType = {
  classes: Object,
  closeDialog: Function,
}

export const VerificationSuccessC = ({ classes, closeDialog }: PropType) => (
  <React.Fragment>
    <p className={classes.screenTitle} data-testid="verification-success">{c.VER_SUCCESS_TITLE}</p>
    <div className={classes.notice}>
      <div className={classes.noticeImageContainer}>
        <IcCompleteGreen style={{ width: '80px' }} />
      </div>
      <div className={classes.noticeText}>
        {c.VER_SUCCESS_MSG}
      </div>
    </div>
    <Button
      testId="close-dialog"
      classes={{ button: classes.singleButton }}
      text={c.DONE}
      onClick={closeDialog}
      fullWidth
    />
  </React.Fragment>
);

export default withStyles(styles)(VerificationSuccessC);
