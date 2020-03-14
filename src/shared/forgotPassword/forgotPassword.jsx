import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '../button/button';
import styles from './forgotPassword.styles';
import { KEY_CODE } from '../../constants';

type Props = {
  classes: Object,
  onHandleBack: Function,
  onHandleNext: Function,
  errors: Object,
  resetErrors: Function,
};

class ForgotPasswordC extends React.PureComponent<Props, *> {

  state = {
    email: '',
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyboard);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyboard);
  }

  handleKeyboard = (e) => {
    if (e.keyCode === KEY_CODE.ENTER) {
      this.handleNext();
    }
  };

  handleNext = () => this.props.onHandleNext(this.state.email);

  setEmail = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      email: e.currentTarget.value.trim(),
    });

    if (this.props.errors != null) {
      this.props.resetErrors();
    }
  };

  render() {
    const {
      classes, onHandleBack, errors,
    } = this.props;
    const { email } = this.state;
    return (
      <div className={classes.forgotPasswordC}>
        <Typography classes={{ root: classes.title }} variant="title" gutterBottom>Forgot your password?</Typography>
        <Typography classes={{ root: classes.subtitle }} variant="subheading">
          Enter your registration email and we will send you a link to reset your password
        </Typography>
        <TextField
          id="email"
          name="email"
          label="Email Address"
          value={email}
          onChange={this.setEmail}
          fullWidth
          error={errors && Boolean(errors.email)}
          helperText={errors.email}
          InputProps={{
            classes: {
              root: classes.inputWrapper,
              input: classes.input,
              error: classes.inputError,
            },
            disableUnderline: true,
          }}
          InputLabelProps={{
            classes: { root: classes.label },
            required: true,
          }}
        />
        {
          errors && Boolean(errors.network)
          && (
          <FormControl classes={{ root: classes.networkErrorWrapper }} error={errors && Boolean(errors.network)}>
            <FormHelperText classes={{ root: classes.helperText, error: classes.networkErrorMessage }}>{errors.network}</FormHelperText>
          </FormControl>
          )
        }
        <div className={classes.buttons}>
          <Button
            testId="submit-button"
            classes={{ button: classes.button }}
            text="Next"
            disabled={errors && (Boolean(errors.network) || Boolean(errors.email))}
            onClick={this.handleNext}
          />
          <Button testId="button-back" classes={{ button: classes.button }} secondary text="Back" onClick={onHandleBack} />
        </div>
      </div>
    );
  }

}

export default withStyles(styles, { withTheme: true })(ForgotPasswordC);
