import React from 'react';
import { withStyles } from '@material-ui/core';
import type { RouterHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import styles from './accountCreatedScreen.styles';
import Button from '../../shared/button/button';
import SuccessIcon from './icons/ill-success.svg';
import { compose } from '../../utility';
import { getRedirectPathByRoleCategory } from '../utility';
import { messages } from '../constants';
import { KEY_CODE } from '../../constants';

type Props = {
  classes: Object,
  history: RouterHistory,
  roleCategory: string,
}

class AccountCreatedC extends React.PureComponent<Props, *> {

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyboard);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyboard);
  }

  handleKeyboard = (e) => {
    if (e.keyCode === KEY_CODE.ENTER) {
      this.redirectToLogin();
    }
  };

  redirectToLogin = () => {
    this.props.history.push(`/login?url=${getRedirectPathByRoleCategory(this.props.roleCategory)}`);
  };

  render() {
    const {
      classes,
    } = this.props;
    return (
      <div className={classes.screenContainer}>
        <SuccessIcon style={{ width: '70px', height: '70px' }} />
        <p className={classes.screenHeader}>{messages.ACCOUNT_CREATED}</p>
        <p className={classes.screenContent}>{messages.ACCOUNT_CREATED_MESSAGE}</p>
        <Button onClick={this.redirectToLogin}>Log In Now</Button>
      </div>
    );
  }

}

export default compose(withStyles(styles, { withTheme: true }), withRouter)(AccountCreatedC);
