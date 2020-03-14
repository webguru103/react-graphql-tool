import React from 'react';
import { withStyles } from '@material-ui/core';
import type { RouterHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import styles from './emailVerificationScreen.styles';
import { withVerificationEmail } from '../api/accountService';
import Button from '../../shared/button/button';
import SuccessIcon from '../shared/icons/ill-success.svg';
import { compose } from '../../utility';
import { withSnackbar } from '../../shared/snackbar/withSnackbar';
import { messages } from '../constants';

type PropType = {
  loading: boolean,
  email: string,
  classes: Object,
  verifyEmail: Function,
  history: RouterHistory,
  createSnackbar: Function,
}

type StateType = {
  resentEmail: boolean,
}

class EmailVerificationC extends React.PureComponent<PropType, StateType> {

  state = {
    resentEmail: false,
  }

  sendVerificationEmail = async () => {
    try {
      await this.props.verifyEmail(this.props.email);
      this.setState({ resentEmail: true });
      this.props.createSnackbar(messages.EMAIL_RESENT);
    } catch (error) {
      this.props.createSnackbar(messages.REQUEST_ERROR);
    }
  };

  render() {
    const {
      loading, email, classes, history,
    } = this.props;
    return (
      <div className={classes.screenContainer}>
        <SuccessIcon style={{ width: '70px', height: '70px' }} />
        <p className={classes.screenHeader}>Account Created</p>
        {
          loading && `Sending Email to ${email}`
        }
        {
          !loading
          && (
            <React.Fragment>
              <p className={classes.screenContent}>{`An email was sent to ${email}. Please verify your email address to log into your account.`}</p>
              <div className={classes.controlButtons}>
                <Button text="Resend Email" onClick={this.sendVerificationEmail} secondary disabled={this.state.resentEmail} />
                <Button text="Back to Login" onClick={() => history.push('/login')} />
              </div>
            </React.Fragment>
          )
        }
      </div>
    );
  }

}

export default compose(
  withVerificationEmail,
  withStyles(styles, { withTheme: true }),
  withRouter,
  withSnackbar,
)(EmailVerificationC);
