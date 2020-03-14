import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Button from '../../shared/button/button';
import styles from './verificationFailed.styles';
import c from './constants';
import IllSmallLock from '../shared/icons/ill_small_lock.svg';

type PropType = {
  classes: Object,
  changeView: Function,
}

export const VerificationFailedC = ({ classes, changeView }: PropType) => (
  <React.Fragment>
    <p className={classes.screenTitle} data-testid="verification-failed">{c.VER_FAILURE_TITLE}</p>
    <div className={classes.notice}>
      <div className={classes.noticeImageContainer}>
        <IllSmallLock style={{ width: '80px' }} />
      </div>
      <div className={classes.noticeText}>
        {c.VER_FAILURE_MSG}
      </div>
    </div>
    <Button
      testId="change-view-make-request"
      classes={{ button: classes.singleButton }}
      text={c.TRY_AGAIN}
      onClick={() => changeView('make-request')}
      fullWidth
    />
  </React.Fragment>
);

export default withStyles(styles)(VerificationFailedC);
