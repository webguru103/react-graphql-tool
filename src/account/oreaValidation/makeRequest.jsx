import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import { ENVIRONMENT } from '../../configurations';
import Button from '../../shared/button/button';
import styles from './makeRequest.styles';
import c from './constants';
import IllSmallAccess from '../shared/icons/ill_small_access.svg';

type PropType = {
  classes: Object,
  fetchOREA: Function,
  testOREADown: Function,
  firstLogin: boolean,
  changeView: (string) => void,
  closeDialog: () => void,
}

export const MakeRequestC = ({
  fetchOREA, classes, testOREADown, firstLogin, changeView, closeDialog,
}: PropType) => (
  <React.Fragment>
    <p className={classes.screenTitle} data-testid="make-request">{c.MAKE_REQUEST_TITLE}</p>
    <div className={classes.notice}>
      <div className={classes.noticeImageContainer}>
        <IllSmallAccess style={{ width: '90px' }} />
      </div>
      <div className={classes.noticeText}>
        {firstLogin
          ? (
            <React.Fragment>
              <span>
                <b>{c.FIRST_LOGIN_MSG_ACCENT}</b>
                {c.FIRST_LOGIN_MSG}
              </span>
            </React.Fragment>
          )
          : c.MAKE_REQUEST_MSG
        }
      </div>
    </div>
    <div className={classes.controlButtons}>
      <Button
        classes={{ button: classes.controlButton }}
        text={firstLogin ? c.ILL_DO_IT_LATER : c.CANCEL}
        onClick={firstLogin ? () => changeView('do-it-later') : () => closeDialog()}
        secondary
      />
      <Button
        testId="fetch-orea"
        classes={{ button: classes.controlButton }}
        text={c.GO_TO_OREA}
        onClick={() => fetchOREA()}
      />
    </div>
    { ENVIRONMENT !== c.ENVIRONMENTS.PROD
      && (
      <Button
        classes={{ button: classes.singleButton }}
        text="***TEST OREA DOWN***"
        onClick={() => testOREADown()}
        fullWidth
      />
      )
    }
  </React.Fragment>
);

export default withStyles(styles)(MakeRequestC);
