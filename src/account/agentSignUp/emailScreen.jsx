import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import type { RouterHistory } from 'react-router';
import TextField from '@material-ui/core/TextField';
import { withIdentity } from '../api/accountService';
import Button from '../../shared/button/button';
import withFade from '../shared/animationHOC';
import { isEmailValid } from '../shared/utils';
import { messages } from '../constants';
import { compose, get } from '../../utility';
import { SYSTEM_ID, KEY_CODE } from '../../constants';
import styles from './emailScreen.styles';
import { errParser } from '../../api-error-parser';

type PropType = {
  email: string,
  classes: Object,
  checkIdentity: Function,
  proceed: Function,
  setEmail: Function,
  setExistingUser: Function,
  history: RouterHistory,
}

type StateType = {
  emailIsValid: boolean,
  email: string,
  error: React.Node,
}

class EmailScreenC extends React.PureComponent<PropType, StateType> {

  constructor(props) {
    super(props);
    this.state = {
      emailIsValid: isEmailValid(this.props.email),
      email: this.props.email || '',
      error: '',
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyboard);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyboard);
  }

  handleKeyboard = (e) => {
    if (e.keyCode === KEY_CODE.ENTER && this.state.emailIsValid) {
      this.handleSubmit();
    }
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ email: value.trim() });
    const validEmail = isEmailValid(value.trim());
    if (validEmail) {
      this.setState({
        emailIsValid: true,
      });
    }

    if (!validEmail) {
      this.setState({
        emailIsValid: false,
      });
    }
  };

  handleSubmit = async () => {
    try {
      const { data: { checkIdentityResponse } } = await this.props.checkIdentity({
        email: this.state.email,
        systemId: SYSTEM_ID.AGENT_PANEL,
      });

      this.props.setExistingUser(checkIdentityResponse.foundUser);

      if (checkIdentityResponse.identityExists) {
        this.setState({ error: messages.EMAIL_ALREADY_TAKEN });
        return;
      }

      this.props.setEmail(this.state.email);
      this.props.proceed();
    } catch (err) {
      const parsedErr = errParser.parse(err);
      this.setState({ error: get(parsedErr, 'global') });
    }
  };

  jumpToLogin = () => {
    this.props.history.push('/login');
  };

  render() {
    const { classes } = this.props;
    const { emailIsValid, error } = this.state;
    return (
      <div className={classes.screenContainer}>
        <p className={classes.screenTitle}>Create an agent account</p>
        <div className={classes.emailInput}>
          <TextField
            id="Email"
            label="Email"
            className={classes.emailInput}
            value={this.state.email}
            onChange={this.handleChange}
            margin="normal"
            fullWidth
            error={Boolean(error)}
            helperText={error && error}
            autoFocus
          />
        </div>
        <div className={classes.controlButtons}>
          <Button classes={{ button: classes.controlButton }} text="Back" onClick={this.jumpToLogin} secondary />
          <Button testId="button-next" classes={{ button: classes.controlButton }} text="Next" disabled={!emailIsValid} onClick={this.handleSubmit} />
        </div>
      </div>
    );
  }

}

export default compose(withRouter, withFade, withIdentity, withStyles(styles))(EmailScreenC);
