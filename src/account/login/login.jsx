import React from 'react';
import type { RouterHistory } from 'react-router';
import { Redirect, withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import withFade from '../shared/animationHOC';
import EmailScreen from './emailScreen';
import PasswordScreen from './passwordScreen';
import PickIdentityScreen from './pickIdentityScreen';
import EmailVerificationScreen from './emailVerificationScreen';
import { withAppUser } from '../../shared/authorization/userConsumer';
import { withSnackbar } from '../../shared/snackbar/withSnackbar';
import type { UserType } from './flowTypes';
import { getRedirectPathBySelectedIdentity } from '../utility';
import { compose, get } from '../../utility';

type Props = {
  user: ?UserType,
  history: RouterHistory,
  isUserLoading: boolean,
  location: {
    search: Object,
  }
}

type State = {
  currentScreen: string,
  email: string,
  userTypes?: ?{[identity: string]: boolean},
  emailVerified: boolean,
  firstLogin: boolean,
  stayLoggedIn: boolean,
}

const screens = [
  'EMAIL',
  'PASSWORD/VERIFY',
  'OFFICE',
];

// TODO switch to openID for tokens?
const saveUserSession = ({
  days, jwt, profile,
}: { days?: ?number, jwt: string, profile?: string }) => {
  if (days) {
    Cookies.set('jwt', jwt, { expires: days });
  } else {
    Cookies.set('jwt', jwt);
  }

  if (profile && days) {
    Cookies.set('profile', profile, { expires: days });
  }
};

class Login extends React.PureComponent<Props, State> {

  state = {
    currentScreen: screens[0],
    email: '',
    emailVerified: false,
    userTypes: null,
    firstLogin: false,
    stayLoggedIn: false,
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.isUserLoading && this.props.user) {
      this.props.history.push('/');
    }
  };

  setEmail = (email: string) => {
    this.setState({ email: email.trim() });
  };

  setEmailVerified = (emailVerified: boolean) => {
    this.setState({ emailVerified });
  };

  setUserType = (userTypeSelected: string) => {
    this.saveUserType(userTypeSelected);
  };

  setUserTypes = (userTypes) => {
    this.setState({
      userTypes,
    });
  };

  setFirstLogin = (firstLogin: boolean) => {
    this.setState({
      firstLogin,
    });
  };

  setStayLoggedIn = (stayLoggedIn: boolean) => {
    this.setState({ stayLoggedIn });
  };

  saveUserType = (userTypeSelected: string) => {
    const { user } = this.props;

    if (user) {
      saveUserSession({ days: this.state.stayLoggedIn ? 30 : null, jwt: user.temporaryToken, profile: userTypeSelected });
    }
  };

  proceed = () => {
    this.setState(prevState => ({
      currentScreen: screens[screens.indexOf(prevState.currentScreen) + 1],
    }));
  };

  goBack = () => {
    this.setState(prevState => ({
      currentScreen: screens[screens.indexOf(prevState.currentScreen) - 1],
    }));
  };

  render() {
    const { location: { search }, user } = this.props;
    const {
      email, userTypes, currentScreen, emailVerified, firstLogin,
    } = this.state;
    const urlParams = new URLSearchParams(search);
    const redirectUrl = urlParams.get('url');

    return (
      <React.Fragment>
        {currentScreen === screens[0]
        && (
          <EmailScreen
            proceed={this.proceed}
            setEmail={this.setEmail}
            setEmailVerified={this.setEmailVerified}
            setFirstLogin={this.setFirstLogin}
          />
        )
        }
        {currentScreen === screens[1] && !emailVerified
        && (
          <EmailVerificationScreen
            email={email}
            goBack={this.goBack}
          />
        )
        }
        {currentScreen === screens[1] && emailVerified
        && (
          <PasswordScreen
            goBack={this.goBack}
            proceed={this.proceed}
            setUserType={this.setUserType}
            setUserTypes={this.setUserTypes}
            setStayLoggedIn={this.setStayLoggedIn}
            email={email}
          />
        )}
        {currentScreen === screens[2] && emailVerified && userTypes
        && (
          <PickIdentityScreen
            userName={user && user.firstName}
            userTypes={userTypes}
            setUserType={this.setUserType}
            firstLogin={firstLogin}
          />
        )}
        {currentScreen === screens[2] && emailVerified && !userTypes && user
        && (
          <Redirect
            to={getRedirectPathBySelectedIdentity(redirectUrl, get(user, 'systemAclsByUserId.nodes.0.systemBySystemId.id'), firstLogin)}
          />
        )
        }
      </React.Fragment>
    );
  }

}

export default compose(
  withFade,
  withSnackbar,
  withAppUser,
  withRouter,
)(Login);
