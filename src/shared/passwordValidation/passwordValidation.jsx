import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import styles from './passwordValidation.styles';
import { compose } from '../../utility';
import * as Utils from './utils';
import ValidIcon from './icons/baseline-check_circle_outline-24px.svg';
import InvalidIcon from './icons/baseline-error_outline-24px.svg';

type Props = {
  classes: Object,
  autoFocus?: boolean,
  onChange: Function,
};

type StateType = {
  password: string,
  confirmPassword: string,
  showPassword: boolean,
  showConfirmPassword: boolean,
  passwordCorrectLength: boolean,
  passwordContainsUpper: boolean,
  passwordContainsLower: boolean,
  passwordContainsNumber: boolean,
  passwordsMatch: boolean,
  validated: boolean,
};

class PasswordValidationC extends React.PureComponent<Props, StateType> {

  static defaultProps = {
    autoFocus: true,
  };

  state = {
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
    passwordCorrectLength: false,
    passwordContainsUpper: false,
    passwordContainsLower: false,
    passwordContainsNumber: false,
    passwordsMatch: false,
    validated: false,
  };

  onConfirmPasswordChange = (e) => {
    const { value } = e.target;
    this.setState(prevState => ({
      confirmPassword: value,
      passwordsMatch: value === prevState.password,
    }), () => {
      this.setValidated(this.state.passwordContainsLower
        && this.state.passwordContainsUpper
        && this.state.passwordContainsNumber
        && this.state.passwordCorrectLength
        && this.state.passwordsMatch);
    });
  };

  onPasswordChange = (e) => {
    const { value } = e.target;
    this.setState(prevState => ({
      password: value,
      passwordContainsLower: Utils.hasLowerCase(value),
      passwordContainsUpper: Utils.hasUpperCase(value),
      passwordContainsNumber: Utils.hasDigit(value),
      passwordCorrectLength: Utils.hasCorrectLength(value),
      passwordsMatch: value === prevState.confirmPassword,
    }), () => {
      this.setValidated(this.state.passwordContainsLower
        && this.state.passwordContainsUpper
        && this.state.passwordContainsNumber
        && this.state.passwordCorrectLength
        && this.state.passwordsMatch);
    });
  };

  setValidated = (validated: boolean) => {
    this.setState({ validated }, () => {
      this.props.onChange(this.state.password, this.state.validated);
    });
  };

  handleClickShowPassword = () => {
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  };

  handleClickShowConfirmPassword = () => {
    this.setState(prevState => ({ showConfirmPassword: !prevState.showConfirmPassword }));
  };

  render() {
    const { classes, autoFocus } = this.props;

    const validIcon = <ValidIcon className={classes.validIcon} style={{ width: '20px', height: '20px' }} />;
    const invalidIcon = <InvalidIcon className={classes.invalidIcon} style={{ width: '20px', height: '20px' }} />;

    const lowerIcon = this.state.passwordContainsLower ? validIcon : invalidIcon;
    const upperIcon = this.state.passwordContainsUpper ? validIcon : invalidIcon;
    const numberIcon = this.state.passwordContainsNumber ? validIcon : invalidIcon;
    const lengthIcon = this.state.passwordCorrectLength ? validIcon : invalidIcon;

    return (
      <React.Fragment>
        <TextField
          id="password"
          label="New Password"
          type={this.state.showPassword ? 'text' : 'password'}
          value={this.state.password}
          error={Boolean(this.state.password && this.state.confirmPassword && !this.state.passwordsMatch)}
          margin="normal"
          onChange={this.onPasswordChange}
          className={classes.passwordInput}
          fullWidth
          autoFocus={autoFocus}
          InputProps={{
            endAdornment: (
              <IconButton
                classes={{ root: classes.passwordToggle }}
                aria-label="Toggle password visibility"
                disableRipple
                onClick={this.handleClickShowPassword}
              >
                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
          inputProps={{ // eslint-disable-line
            tabIndex: 1,
          }}
        />
        <div className={classes.validationGrid}>
          <div className={classes.validationCell}>
            <Typography
              className={this.state.passwordContainsLower ? classes.validatedText : classes.nonValidatedText}
            >
              Lowercase
            </Typography>
            {lowerIcon}
          </div>
          <div className={classes.validationCell}>
            <Typography
              className={this.state.passwordContainsUpper ? classes.validatedText : classes.nonValidatedText}
            >
              Uppercase
            </Typography>
            {upperIcon}
          </div>
          <div className={classes.validationCell}>
            <Typography
              className={this.state.passwordContainsNumber ? classes.validatedText : classes.nonValidatedText}
            >
              Number
            </Typography>
            {numberIcon}
          </div>
          <div className={classes.validationCell}>
            <Typography
              className={this.state.passwordCorrectLength ? classes.validatedText : classes.nonValidatedText}
            >
              8 Characters
            </Typography>
            {lengthIcon}
          </div>
        </div>
        <TextField
          id="confirm-password"
          label="Confirm New Password"
          error={Boolean(this.state.password && this.state.confirmPassword && !this.state.passwordsMatch)}
          type={this.state.showConfirmPassword ? 'text' : 'password'}
          value={this.state.confirmPassword}
          margin="normal"
          onChange={this.onConfirmPasswordChange}
          className={classes.passwordInput}
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton
                classes={{ root: classes.passwordToggle }}
                aria-label="Toggle password visibility"
                disableRipple
                onClick={this.handleClickShowConfirmPassword}
              >
                {this.state.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
          inputProps={{ // eslint-disable-line
            tabIndex: 1,
          }}
        />
        {
          this.state.password && this.state.confirmPassword && !this.state.passwordsMatch
          && (
            <FormControl className={classes.error} fullWidth error={this.state.password && this.state.confirmPassword && !this.state.passwordsMatch}>
              <FormHelperText>New Passwords do not match</FormHelperText>
            </FormControl>
          )
        }

      </React.Fragment>
    );
  }

}

export default compose(withStyles(styles, { withTheme: true }))(PasswordValidationC);
