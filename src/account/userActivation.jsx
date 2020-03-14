import React from 'react';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import type { RouterHistory } from 'react-router';
import { withUserActivation } from './api/accountService';
import SuccessIcon from './shared/icons/ill-success.svg';
import Button from '../shared/button/button';
import styles from './userActivation.styles';
import { messages } from './constants';
import { compose } from '../utility';

type PropType = {
  history: RouterHistory,
  classes: Object,
  activateUser: Function,
}

type StateType = {
  userActivated: boolean,
  activating: boolean,
  error: string,
}

class UserActivation extends React.PureComponent<PropType, StateType> {

  state = {
    userActivated: false,
    activating: true,
    error: '',
  };

  componentDidMount() {
    this.activateUser();
  }

  activateUser = async () => {
    try {
      const { error } = await this.props.activateUser();
      if (error) {
        // TODO set token expired err
        this.setState({ activating: false, error: 'Network Error' });
        return;
      }
      this.setState({ activating: false, userActivated: true });
    } catch (err) {
      this.setState({ activating: false, error: 'Network Error' });
    }
  };

  redirectToAgentPage = () => {
    this.props.history.push('/'); // TODO redirect to correct page
  };

  redirectToMainPage = () => {
    this.props.history.push('/');
  };

  render() {
    const {
      classes,
    } = this.props;
    const { userActivated, activating, error } = this.state;
    return (
      <div className={classes.screenContainer}>
        <div className={classes.feedbackIcon}>
          {userActivated && !activating && <SuccessIcon width="100%" height="100%" />}
        </div>
        <p className={classes.screenHeader}>
          {activating && messages.ACTIVATING_ACCOUNT}
          {!activating && userActivated && messages.ACCOUNT_ACTIVATED}
          {!activating && !userActivated && messages.COULD_NOT_ACTIVATE}
        </p>
        <p className={classes.screenContent}>
          {activating && messages.PLEASE_WAIT}
          {!activating && userActivated && messages.SUCCESSFULLY_ACTIVATED}
          {!activating && error && '[TBD]: Try again later'}
        </p>
        {
          !activating && userActivated
          && (
            <Button onClick={this.redirectToAgentPage} fullWidth>Log In</Button>
          )
        }
        {
          !activating && error
          && (
            <Button onClick={this.redirectToMainPage} fullWidth>Go to main page</Button>
          )
        }
      </div>
    );
  }

}

export default compose(withRouter, withStyles(styles, { withTheme: true }), withUserActivation)(UserActivation);
