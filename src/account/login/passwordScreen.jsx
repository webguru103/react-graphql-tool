import React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import Recaptcha from 'react-grecaptcha';
import { Link } from 'react-router-dom';
import Button from '../../shared/button/button';
import { RECAPTCHA_KEY, SHOW_CAPTCHA } from '../../configurations';
import { withLogin } from '../api/accountService';
import { withUpdateUserState } from '../../shared/authorization/userConsumer';
import withFade from '../shared/animationHOC';
import PasswordInput from './passwordInput';
import styles from './passwordScreen.styles';
import { compose, pro, get } from '../../utility';
import { withSnackbar } from '../../shared/snackbar/withSnackbar';
import type { UserType } from './flowTypes';
import { KEY_CODE, IDENTITY, ROLE_CATEGORY } from '../../constants';
import { errParser } from '../../api-error-parser';

type Props = {
  classes: Object,
  goBack: Function,
  proceed: Function,
  setUserType: Function,
  setUserTypes: Function,
  setStayLoggedIn: Function,
  login: Function,
  email: string,
  setUser: (user: UserType) => {},
};

type State = {
  attemptedLogins: number,
  clearErrors: boolean,
  password: string,
  canProceed: boolean,
  canGoBack: boolean,
  error: string,
};

class PasswordScreenC extends React.PureComponent<Props, State> {

  state = {
    attemptedLogins: 0,
    clearErrors: true,
    password: '',
    canProceed: false,
    canGoBack: true,
    error: '',
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyboard);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyboard);
  }

  handleKeyboard = (e) => {
    if (e.keyCode === KEY_CODE.ENTER && this.state.canProceed) {
      this.handleLogin();
    }
  };

  setPassword = (password: string) => {
    this.setState({ password, canProceed: true });
  };

  stopProceed = () => {
    this.setState({ canProceed: false });
  };

  handleLogin = async () => {
    const {
      proceed, email, setUser, setUserType, setUserTypes,
    } = this.props;
    const [err, data] = await pro(this.props.login({ email, password: this.state.password }));

    if (err) {
      const parsedError = errParser.parse(err);
      if (this.state.attemptedLogins + 1 === SHOW_CAPTCHA) {
        this.setState({ canGoBack: false });
      }
      this.setState(prevState => ({
        attemptedLogins: prevState.attemptedLogins + 1,
        error: parsedError.global,
      }));
      return;
    }

    const { data: { user } } = data;
    setUser(user);

    const systemAcls = get(user, 'systemAclsByUserId.nodes', []);

    const isAgent = systemAcls.findIndex(sa => sa.roleCategory === ROLE_CATEGORY.AGENT) !== -1;
    const isAdmin = systemAcls.findIndex(sa => sa.roleCategory === ROLE_CATEGORY.ADMIN) !== -1;
    const isCPUser = systemAcls.findIndex(sa => sa.roleCategory === ROLE_CATEGORY.CP_ADMIN) !== -1;

    if (systemAcls.length === 1) {
      setUserType((isAgent && IDENTITY.AGENT) || (isAdmin && IDENTITY.ADMIN) || (isCPUser && IDENTITY.CP_USER));
    } else {
      setUserTypes({ agent: isAgent, admin: isAdmin, cpUser: isCPUser });
    }

    proceed();
  };

  handleStayLoggedIn = () => {
    this.props.setStayLoggedIn(true);
  };

  removeLock = () => {
    this.setState({
      attemptedLogins: 0, clearErrors: true, canProceed: true, canGoBack: true,
    });
  };

  render() {
    const { classes, goBack } = this.props;
    const {
      attemptedLogins, canProceed, canGoBack, clearErrors, error,
    } = this.state;
    return (
      <form className={classes.screenContainer} onSubmit={e => e.preventDefault()}>
        <p className={classes.screenTitle}>Log in</p>
        <PasswordInput
          attemptedLogins={attemptedLogins}
          stopProceed={this.stopProceed}
          clearErrors={clearErrors}
          setPassword={this.setPassword}
        />
        { error && <FormHelperText error>{error}</FormHelperText> }
        <div className={classes.options}>
          <FormControlLabel
            control={
              <Checkbox defaultChecked onChange={this.handleStayLoggedIn} />
            }
            label="Stay logged in"
            className={classes.stayLoggedIn}
          />
          <Link to="/forgot-password" className={classes.forgotPassword}> Forgot Password?</Link>
        </div>
        <div className={classes.controlButtons}>
          <Button text="Back" classes={{ button: classes.controlButton }} secondary disabled={!canGoBack} onClick={goBack} />
          <Button
            testId="log-in"
            text="Log in"
            classes={{ button: classes.controlButton }}
            secondary={false}
            disabled={!canProceed}
            onClick={this.handleLogin}
          />
        </div>
        {(attemptedLogins === Number(SHOW_CAPTCHA))
          && <Recaptcha sitekey={RECAPTCHA_KEY} callback={this.removeLock} expiredCallback={this.stopProceed} />
        }
      </form>
    );
  }

}

export default compose(
  withFade,
  withLogin,
  withSnackbar,
  withStyles(styles, { withTheme: true }),
  withUpdateUserState,
)(PasswordScreenC);
