import React from 'react';
import { withStyles } from '@material-ui/core';
import type { RouterHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import styles from './agentIdentityAddedScreen.styles';
import Button from '../../shared/button/button';
import SuccessIcon from '../shared/icons/ill-success.svg';
import { compose } from '../../utility';
import { getRedirectPathByRoleCategory } from '../utility';
import { ROLE_CATEGORY } from '../../constants';
import { messages } from '../constants';

type PropType = {
  classes: Object,
  history: RouterHistory,
}

const AgentIdentityAddedScreenC = ({ classes, history }: PropType) => {

  const redirectToLogin = () => {
    history.push(getRedirectPathByRoleCategory(ROLE_CATEGORY.AGENT));
  };

  return (
    <div className={classes.screenContainer}>
      <SuccessIcon className={classes.screenIcon} />
      <p className={classes.screenHeader}>{messages.AGENT_IDENTITY_ADDED}</p>
      <p className={classes.screenContent}>{messages.AGENT_IDENTITY_ADDED_MESSAGE}</p>
      <Button onClick={redirectToLogin}>Log In Now</Button>
    </div>
  );
};

export default compose(
  withStyles(styles, { withTheme: true }),
  withRouter,
)(AgentIdentityAddedScreenC);
