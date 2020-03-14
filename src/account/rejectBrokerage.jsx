import React from 'react';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import type { RouterHistory } from 'react-router';
import { withAppUser } from '../shared/authorization/userConsumer';
import { withRejectBOInvitation } from './api/accountService';
import styles from './rejectBrokerage.styles';
import { messages } from './constants';
import type { UserType } from '../flowTypes';
import { compose } from '../utility';
import Button from '../shared/button/button';
import { withSnackbar } from '../shared/snackbar/withSnackbar';

type PropType = {
  history: RouterHistory,
  classes: Object,
  rejectBrokerageInvitation: Function,
  user?: ?UserType,
  isUserLoading: Boolean,
  createSnackbar: Function,
}

type StateType = {
  brokerageRejected: boolean,
  processing: boolean,
  error: string,
}

class RejectBrokerage extends React.PureComponent<PropType, StateType> {

  static defaultProps = {
    user: {},
  };

  state = {
    brokerageRejected: false,
    processing: true,
    error: '',
  };

  componentDidMount() {
    if (!this.props.isUserLoading) {
      this.rejectBrokerage();
    }
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.isUserLoading !== this.props.isUserLoading) && !this.props.isUserLoading) {
      this.rejectBrokerage();
    }
  }

  rejectBrokerage = async () => {
    const { user, rejectBrokerageInvitation, createSnackbar } = this.props;

    try {
      await rejectBrokerageInvitation();
      this.setState({ processing: false, brokerageRejected: true });

      if (user) {
        setTimeout(() => {
          this.props.history.push('/account-settings');
          createSnackbar(messages.BROKERAGE_REJECTED, {
            timer: 5000,
          });
        }, 1500);
      }
    } catch (err) {
      this.setState({ processing: false, error: 'Network Error' });
    }
  };

  redirectToLogin = () => {
    this.props.history.push('/login?url=account-settings');
  };

  redirectToMainPage = () => {
    this.props.history.push('/');
  };

  render() {
    const { classes, user } = this.props;
    const { brokerageRejected, processing, error } = this.state;

    return (
      <div className={classes.screenContainer}>
        <p className={classes.screenHeader}>
          {(user || (!user && !brokerageRejected)) && !error && messages.PLEASE_WAIT}
          {!user && brokerageRejected && messages.BROKERAGE_REJECTED}
          {!processing && error && messages.BROKERAGE_NOT_REJECTED}
        </p>
        <p className={classes.screenContent}>
          {(user || (!user && !brokerageRejected)) && !error && messages.REQUEST_BEING_PROCESSED}
          {!processing && error && messages.NETWORK_ERROR}
        </p>
        {
          !processing && !user
          && (
            <Button onClick={this.redirectToLogin} text="Log In" />
          )
        }
        {
          !processing && user && error
          && (
            <Button onClick={this.redirectToMainPage} text="Back to Dashboard" />
          )
        }
      </div>
    );
  }

}

export default compose(
  withRouter,
  withSnackbar,
  withStyles(styles, { withTheme: true }),
  withRejectBOInvitation,
  withAppUser,
)(RejectBrokerage);
