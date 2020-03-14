import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { compose } from '../../utility';
import { withResetPassword } from '../api/accountService';
import { messages } from '../constants';
import PasswordValidation from '../../shared/passwordValidation/passwordValidation';
import styles from './resetPassword.styles';
import Button from '../../shared/button/button';
import { EVENT_KEYS } from '../../constants';

type Props = {
  classes: Object,
  location: Object,
  history: Object,
  resetPassword: Function,
};
type State = {
  errorMessage: React.Element,
  password: string,
  canSubmit: boolean,
  reset: boolean,
}

class ResetPasswordC extends React.PureComponent<Props, State> {

  state = {
    errorMessage: '',
    password: '',
    canSubmit: false,
    reset: false,
  }

  handleReset = async () => {
    const { location: { search } } = this.props;
    const urlParams = new URLSearchParams(search);
    const tokenId = urlParams.get('token');
    const { password } = this.state;
    try {
      const result = await this.props.resetPassword(password, tokenId);
      const { user: updatedUser } = result.data;
      if (updatedUser) {
        this.setState({ reset: true });
      } else {
        this.setState({ errorMessage: messages.FAILED_TO_RESET });
      }
    } catch (error) {
      this.setState({ errorMessage: messages.FAILED_TO_RESET });
    }
  }

  redirectToLogin = () => {
    this.props.history.push('/login');
  }

  onChange = (password: string, validated: boolean) => {
    this.setState({
      password,
      canSubmit: validated,
    });
  }

  handleSubmit = (ev: SyntheticKeyboardEvent<any>) => {
    if (ev.key === EVENT_KEYS.ENTER && this.state.canSubmit) {
      this.handleReset();
    }
  }

  render() {
    const {
      errorMessage, reset,
    } = this.state;
    const { classes } = this.props;

    if (errorMessage) {
      return <div className={classes.root}>{errorMessage}</div>;
    }
    if (reset) {
      return (
        <div className={classes.screenContainer}>
          <Typography className={classes.screenTitle}>{messages.PASSWORD_RESET_SUCCESS_TITLE}</Typography>
          <Typography className={classes.messageText}>
            {messages.PASSWORD_RESET_SUCCESS_MESSAGE}
          </Typography>
          <div className={classes.buttonContainer}>
            <Button color="primary" text="Log in" onClick={this.redirectToLogin} />
          </div>
        </div>
      );
    }
    return (
      <div className={classes.screenContainer} onKeyPress={ev => this.handleSubmit(ev)} role="button" tabIndex="-1">
        <Typography className={classes.screenTitle}>{messages.RESET_PASSWORD}</Typography>
        <PasswordValidation onChange={this.onChange} />
        <Button
          testId="button-submit"
          color="primary"
          classes={{ button: classes.submitButton }}
          text="Submit"
          onClick={() => this.handleReset()}
          disabled={!this.state.canSubmit}
        />
        {errorMessage}
      </div>
    );

  }

}

export default compose(withStyles(styles, { withTheme: true }), withResetPassword)(ResetPasswordC);
