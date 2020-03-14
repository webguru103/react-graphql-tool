import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '../../shared/button/button';
import withFade from './animationHOC';
import styles from './passwordSetScreen.styles';
import { compose } from '../../utility';
import SignUpAs from './signUpAs';
import PasswordValidation from '../../shared/passwordValidation/passwordValidation';
import { messages } from '../constants';
import type { RoleType } from '../../flowTypes';
import { KEY_CODE } from '../../constants';

type PropType = {
  invitedToSignUp?: boolean,
  setPassword: Function,
  proceed: Function,
  moveBack: Function,
  email: string,
  classes: Object,
  role?: RoleType,
  brokerageName?: string,
}

type StateType = {
  passwordIsValid: boolean,
  password: string,
}

class PasswordScreenC extends React.PureComponent<PropType, StateType> {

  static defaultProps = {
    invitedToSignUp: false,
    role: {},
    brokerageName: '',
  };

  state = {
    passwordIsValid: false,
    password: '',
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyboard);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyboard);
  }

  handleKeyboard = (e) => {
    if (e.keyCode === KEY_CODE.ENTER && this.state.passwordIsValid) {
      this.handleSubmit();
    }
  };

  setPassword = (password, passwordIsValid) => {
    this.setState({ password, passwordIsValid });
  };

  handleSubmit = async () => {
    if (this.state.passwordIsValid) {
      this.props.setPassword(this.state.password);
      this.props.proceed();
    }
  };

  render() {
    const {
      invitedToSignUp, moveBack, email, classes, role, brokerageName,
    } = this.props;
    const {
      passwordIsValid,
    } = this.state;
    return (
      <div className={classes.screenContainer}>
        {!invitedToSignUp && <p className={classes.screenTitle}>Create a new Agent account</p>}
        {invitedToSignUp && role
        && (
          <div className={classes.headerSection}>
            <Typography variant="title" gutterBottom>{messages.SIGN_UP}</Typography>
            <Typography className={classes.headerTitle}>{messages.INVITED_TO_SIGN_UP_AS}</Typography>
            <Typography className={classes.headerContent}>
              {
                <SignUpAs role={role} brokerageName={brokerageName} />
              }
            </Typography>
          </div>
        )}
        <TextField
          type="email"
          margin="normal"
          InputProps={{
            classes: {
              input: classes.disabledField,
            },
            readOnly: true,
            disableUnderline: true,
          }}
          defaultValue={email}
          disabled
          fullWidth
        />
        <div className={classes.passwordInput}>
          <PasswordValidation
            onChange={this.setPassword}
          />
        </div>
        <div className={classes.controlButtons}>
          <Button classes={{ button: classes.controlButton }} text="Back" onClick={moveBack} secondary />
          <Button classes={{ button: classes.controlButton }} text="Next" disabled={!passwordIsValid} onClick={this.handleSubmit} />
        </div>
      </div>
    );
  }

}

export default compose(withFade, withStyles(styles, { withTheme: true }))(PasswordScreenC);
