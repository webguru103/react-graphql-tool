import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
import Button from '../../shared/button/button';
import { withLogin } from '../api/accountService';
import { withUpdateUserState } from '../../shared/authorization/userConsumer';
import styles from './passwordEnterScreen.styles';
import { messages } from '../constants';
import { compose, get } from '../../utility';
import { errParser } from '../../api-error-parser';
import type { UserType } from '../../flowTypes';
import { KEY_CODE } from '../../constants';

type PropType = {
  email: string,
  login: Function,
  proceed: Function,
  moveBack: Function,
  classes: Object,
  setFirstName: Function,
  setLastName: Function,
  setPhoneNumber: Function,
  setExistingUserId: Function,
  setUser: (user: UserType) => {},
}

type StateType = {
  password: string,
  error: React.Element,
}

const saveUserSession = ({ jwt }: { jwt: string }) => {
  Cookies.set('jwt', jwt, { expires: 30 });
};

class PasswordScreenC extends React.PureComponent<PropType, StateType> {

  state = {
    password: '',
    error: '',
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyboard);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyboard);
  }

  handleKeyboard = (e) => {
    if (e.keyCode === KEY_CODE.ENTER && this.state.password !== '') {
      this.handleSubmit();
    }
  };

  handleSubmit = async () => {
    try {
      const { data: { user }, error } = await this.props.login({ email: this.props.email, password: this.state.password });
      if (user.id && !error) {
        this.props.setExistingUserId(user.id);
        this.props.setFirstName(user.firstName);
        this.props.setLastName(user.lastName);
        this.props.setPhoneNumber(user.phone);
        this.props.setUser(user);
        saveUserSession({ jwt: user.temporaryToken });
        this.props.proceed();
      } else {
        this.setState({ error: messages.WRONG_USERNAME_PASSWORD });
      }
    } catch (err) {
      const parsedErr = errParser.parse(err);
      this.setState({ error: get(parsedErr, 'global') });
    }
  };

  handlePasswordChange = (e) => {
    const { value } = e.target;

    this.setState({
      password: value,
    });
  };

  render() {
    const { moveBack, email, classes } = this.props;
    const { error } = this.state;
    return (
      <div className={classes.screenContainer}>
        <p className={classes.screenTitle}>Create a new Agent account</p>
        <TextField
          type="email"
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          defaultValue={email}
          fullWidth
        />
        <p>{messages.EMAIL_ALREADY_REGISTERED}</p>
        <TextField
          id="password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          margin="normal"
          onChange={this.handlePasswordChange}
          fullWidth
          error={Boolean(error)}
          helperText={error && error}
          autoFocus
        />
        <div className={classes.controlButtons}>
          <Button classes={{ button: classes.controlButton }} text="Back" onClick={moveBack} secondary />
          <Button classes={{ button: classes.controlButton }} text="Next" disabled={this.state.password === ''} onClick={this.handleSubmit} />
        </div>

      </div>
    );
  }

}

export default compose(
  withStyles(styles, { withTheme: true }),
  withLogin,
  withRouter,
  withUpdateUserState,
)(PasswordScreenC);
