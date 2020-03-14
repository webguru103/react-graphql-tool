import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { SHOW_CAPTCHA } from '../../configurations';
import styles from './passwordInput.styles';

type Props = {
  attemptedLogins: number,
  stopProceed: Function,
  classes: Object,
  clearErrors: boolean,
  setPassword: Function,
}

type State = {
  error: boolean,
  errorText: string,
  showPassword: boolean,
}

export class PasswordInputC extends React.PureComponent<Props, State> {

  state = {
    error: false,
    errorText: '',
    showPassword: false,
  };

  handleClickShowPassword = () => {
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  };

  handleSetPassword = (ev: SyntheticInputEvent<HTMLInputElement>) => {
    clearTimeout(this.timeout);
    const { value: password } = ev.target;
    this.timeout = setTimeout(this.props.setPassword(password), 1000);
  };

  timeout: TimeoutID;

  render() {
    const {
      attemptedLogins, clearErrors, stopProceed, classes,
    } = this.props;

    if (clearErrors) {
      this.setState({ error: false, errorText: '' });
    }

    if (attemptedLogins > 0 && attemptedLogins < Number(SHOW_CAPTCHA)) {
      this.setState({ error: true, errorText: 'Wrong account & password combination.' });
    } else if (attemptedLogins === Number(SHOW_CAPTCHA)) {
      stopProceed();
      this.setState({ error: true, errorText: 'You have entered the wrong account & password combination. Please solve the CAPTCHA to continue.' });
    }

    return (
      <TextField
        id="password"
        label="Password"
        type={this.state.showPassword ? 'text' : 'password'}
        required
        error={this.state.error}
        helperText={this.state.errorText}
        margin="normal"
        autoFocus
        fullWidth
        onKeyUp={ev => this.handleSetPassword(ev)}
        InputProps={{
          endAdornment: (
            <IconButton
              classes={{ root: classes.passwordToggle }}
              aria-label="Toggle password visibility"
              onClick={this.handleClickShowPassword}
            >
              {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        }}
      />
    );
  }

}
export default withStyles(styles, { withTheme: true })(PasswordInputC);
