import React from 'react';
import { withStyles } from '@material-ui/core';
import moment from 'moment';
import AvatarIcon from '../../assets/person.svg';
import EyeHideIcon from '../../assets/eye-hide.svg';
import EyeIcon from '../../assets/eye.svg';
import CircleCheckIcon from '../../assets/circle-check.svg';
import type { SessionSignee } from '../api/fragments/sessionSignee';
import themeSrc from '../../startup/theme';
import { messages } from './constants';

type Props = {
  signee: SessionSignee,
  classes: Object,
}

const styles = theme => ({
  signee: {
    display: 'flex',
    padding: '0 0 10px 0',
  },
  avatarIcon: {
    width: '50px',
  },
  signeeDetails: {
    overflow: 'hidden',
  },
  detailLine1: {
    display: 'flex',
    paddingBottom: '2px',
  },
  signeeName: {
    fontSize: '15px',
    padding: '0 5px 0 0',
    fontWeight: 600,
  },
  signeeEmail: {
    fontSize: '12px',
    margin: 'auto 0',
  },
  detailLine2: {
    display: 'flex',
  },
  signeeStatus: {
    fontSize: '12px',
    margin: '0 5px 0 0',
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.neutrals.mainText,
  },
  signeeStatusIcon: {
    margin: '0 3px 0 0',
  },
  signeeStatusTime: {
    fontSize: '12px',
    margin: 'auto 0',
    color: theme.palette.neutrals.mainText,
  },
});

const SigneeCardC = ({ signee, classes }: Props) => (
  <div key={signee.id} className={classes.signee}>
    <AvatarIcon className={classes.avatarIcon} />
    <div className={classes.signeeDetails}>
      <div className={classes.detailLine1}>
        <div className={classes.signeeName}>
          {signee.sessionSigneeName}
        </div>
        <div className={classes.signeeEmail}>
          {signee.userByUserId && signee.userByUserId.email}
        </div>
      </div>
      <div className={classes.detailLine2}>
        <div className={classes.signeeStatus}>
          {!signee.viewedAt && !signee.signedAt
            && (
            <React.Fragment>
              <EyeHideIcon className={classes.signeeStatusIcon} style={{ color: themeSrc.palette.neutrals.tertiaryGrey }} />
              {messages.NOT_VIEWED}
            </React.Fragment>
            )
          }
          {signee.viewedAt && !signee.signedAt && (
            <React.Fragment>
              <EyeIcon className={classes.signeeStatusIcon} style={{ color: themeSrc.palette.highlight.blue }} />
              {messages.VIEWED}
            </React.Fragment>
          )}
          {signee.signedAt
          && (
            <React.Fragment>
              <CircleCheckIcon className={classes.signeeStatusIcon} style={{ color: themeSrc.palette.intent.green }} />
              {messages.COMPLETED}
            </React.Fragment>
          )}
        </div>
        <div className={classes.signeeStatusTime}>
          {signee.viewedAt && !signee.signedAt
          && `at ${moment(signee.viewedAt).local().format('YYYY-MM-DD h:mm A')}`
          }
          {signee.signedAt
          && `at ${moment(signee.signedAt).local().format('YYYY-MM-DD h:mm A')}`
          }
        </div>
      </div>
    </div>
  </div>
);

export default withStyles(styles)(SigneeCardC);
