import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router';
// import type { RouterHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Button from '../../shared/button/button';
import { withEmail } from '../api/accountService';
import withFade from '../shared/animationHOC';
import { isEmailValid } from '../shared/utils';
import styles from './emailScreen.styles';
import { logger } from '../../logger';
import { messages } from './constants';
import { messages as sharedMessages } from '../constants';
import { compose } from '../../utility';
import { KEY_CODE } from '../../constants';

type Props = {
  classes: Object,
  setEmail: Function,
  proceed: Function,
  checkEmail: Function,
  setEmailVerified: (string) => void,
  // history: RouterHistory,
  setFirstLogin: (boolean) => void,
};

type State = {
  error: ?React.Element,
  email: string,
  canProceed: boolean,
};

class EmailScreen extends React.PureComponent<Props, State> {

  state = {
    error: null,
    email: '',
    canProceed: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyboard);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyboard);
  }

  handleKeyboard = (e) => {
    if (e.keyCode === KEY_CODE.ENTER && this.state.canProceed) {
      this.handleSubmit();
    }
  };

  handleChange = (ev: SyntheticEvent<HTMLElement>) => {
    const { value } = ev.currentTarget;

    if (value === '') {
      this.setState({ canProceed: false, error: messages.EMAIL_EMPTY });
      return;
    }

    if (!isEmailValid(value)) {
      this.setState({ canProceed: false, error: messages.EMAIL_NOT_VALID });
      return;
    }

    this.setState({
      email: value.trim(), error: '', canProceed: true,
    });
    this.props.setEmail(value.trim());
  };

  handleSubmit = async () => {
    try {
      const {
        data: {
          checkIdentity: {
            foundUser, emailVerified, loggedIn,
          },
        },
      } = await this.props.checkEmail(this.state.email);

      this.setState({ error: '' });

      if (!foundUser) {
        this.setState({ error: messages.USER_NOT_EXISTS });
        return;
      }

      this.props.setEmailVerified(emailVerified);
      this.props.setFirstLogin(!loggedIn);
      this.props.proceed();

    } catch (err) {
      logger.log(err);
      this.setState({ error: sharedMessages.NETWORK_ERROR });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.screenContainer} onSubmit={(e) => { e.preventDefault(); }}>
        <p className={classes.screenTitle}>Log in</p>
        <TextField
          id="email"
          label="Email"
          error={Boolean(this.state.error)}
          helperText={this.state.error}
          required
          onChange={ev => this.handleChange(ev)}
          margin="normal"
          autoFocus
          fullWidth
          className={classes.emailInput}
        />
        <Link to="/forgot-password" className={classes.forgotPassword}> Forgot Password?</Link>
        <div className={classes.controlButtons}>
          {/* TODO: Reimplement signup with payment */}
          {/* <Button
            classes={{ button: classes.controlButton }}
            text="Sign Up"
            disabled={false}
            secondary
            onClick={() => this.props.history.push('/signup/agent/0')}
          /> */}
          <Button
            data-testid="next"
            classes={{ button: classes.controlButton }}
            text="Next"
            secondary={false}
            disabled={!this.state.canProceed}
            onClick={this.handleSubmit}
            testId="next"
          />
        </div>
      </form>
    );
  }

}

export default compose(withFade, withEmail, withStyles(styles, { withTheme: true }), withRouter)(EmailScreen);
