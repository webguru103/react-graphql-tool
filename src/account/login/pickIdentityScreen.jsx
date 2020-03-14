// @flow

import React from 'react';
import type { RouterHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '../../shared/button/button';
import withFade from '../shared/animationHOC';
import styles from './pickIdentityScreen.styles';
import { getRedirectPathBySelectedIdentity } from '../utility';
import { compose } from '../../utility';
import { IDENTITY } from '../../constants';

type Props = {
  classes: Object,
  history: RouterHistory,
  location: {
    search: Object,
  },
  userName?: string,
  userTypes: {[string]: boolean},
  setUserType: Function,
  firstLogin: boolean,
};

class PickIdentityScreenC extends React.PureComponent<Props, *> {

  static defaultProps = {
    userName: '',
  };

  handleSelectIdentity = (selectedIdentity: string) => {
    const { location: { search }, firstLogin } = this.props;
    const urlParams = new URLSearchParams(search);
    const redirectUrl = urlParams.get('url');

    this.props.setUserType(selectedIdentity);
    this.props.history.push(getRedirectPathBySelectedIdentity(redirectUrl, selectedIdentity, firstLogin));
  };

  render() {
    const { classes, userName, userTypes } = this.props;
    return (
      <div className={classes.screenContainer}>
        <p className={classes.screenTitle}>{ userName ? `Welcome back, ${userName}!` : 'Welcome back!'}</p>
        {
          userTypes.agent
          && (
            <Button
              text="Go to Agent Panel"
              classes={{ button: classes.selectionButton }}
              secondary={false}
              fullWidth
              onClick={() => this.handleSelectIdentity(IDENTITY.AGENT)}
            />
          )
        }
        {
          userTypes.admin
          && (
            <Button
              text="Go to Admin Panel"
              classes={{ button: classes.selectionButton }}
              secondary={false}
              fullWidth
              onClick={() => this.handleSelectIdentity(IDENTITY.ADMIN)}
            />
          )
        }
        {
          userTypes.cpUser
          && (
            <Button
              testId="go-to-cp"
              text="Go to Control Panel"
              classes={{ button: classes.selectionButton }}
              secondary={false}
              fullWidth
              onClick={() => this.handleSelectIdentity(IDENTITY.CP_USER)}
            />
          )
        }
      </div>
    );
  }

}

export default compose(
  withFade,
  withStyles(styles, { withTheme: true }),
  withRouter,
)(PickIdentityScreenC);
