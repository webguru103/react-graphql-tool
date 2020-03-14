import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Button from '../../shared/button/button';
import styles from './cannotReach.styles';
import c from './constants';
import IllSmallLock from '../shared/icons/ill_small_lock.svg';

type PropType = {
  classes: Object,
  changeView: Function,
}

export const CannotReachC = ({ classes, changeView }: PropType) => (
  <React.Fragment>
    <p className={classes.screenTitle} data-testid="cannot-reach">
      {c.CANNOT_REACH_TITLE}
    </p>
    <div className={classes.notice}>
      <div className={classes.noticeImageContainer}>
        <IllSmallLock style={{ width: '80px', transform: 'translate(-18px, -12px)' }} />
      </div>
      <div className={classes.noticeText}>
        {c.CANNOT_REACH_MSG}
      </div>
    </div>
    <div className={classes.controlButtons}>
      <Button
        testId="change-view-do-it-later"
        classes={{ button: classes.controlButton }}
        text={c.DO_IT_LATER}
        onClick={() => changeView('do-it-later')}
        secondary
      />
      <Button
        testId="change-view-make-request"
        classes={{ button: classes.controlButton }}
        text={c.TRY_AGAIN}
        onClick={() => changeView('make-request')}
      />
    </div>
  </React.Fragment>
);

export default withStyles(styles)(CannotReachC);
