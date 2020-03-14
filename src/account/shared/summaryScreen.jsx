import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Divider from '@material-ui/core/Divider';
import styles from './summaryScreen.styles';
import Button from '../../shared/button/button';
import { withCreateUser, withAcceptInvitation } from '../api/accountService';
import { compose, get } from '../../utility';
import SignUpAs from './signUpAs';
import { INVITATION_ACTION, KEY_CODE } from '../../constants';
import type { RoleType } from '../../flowTypes';
import { messages } from '../constants';
import { errParser } from '../../api-error-parser';

type PropType = {
  classes: Object,
  email: string,
  password?: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  proceed: Function,
  moveBack: Function,
  createUser: Function,
  acceptInvitation: Function,
  role?: RoleType,
  inviteId?: ?number,
  brokerageName?: string,
  token: string,
}

type StateType = {
  error: React.Node,
};

class SummaryScreenC extends React.PureComponent<PropType, StateType> {

  static defaultProps = {
    password: '',
    inviteId: null,
    brokerageName: '',
    role: {},
  };

  state = {
    error: '',
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyboard);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyboard);
  }

  handleKeyboard = (e) => {
    const { lastName, firstName } = this.props;
    if (e.keyCode === KEY_CODE.ENTER && (lastName && firstName)) {
      this.handleSubmit();
    }
  };

  handleSubmit = async () => {
    const {
      email, password, firstName, lastName, phoneNumber, proceed, inviteId, token,
    } = this.props;

    try {

      if (inviteId) { // Invited To Sign Up (New or Existing)
        await this.props.acceptInvitation({
          id: inviteId,
          action: INVITATION_ACTION.ACCEPT,
          invitedUser: {
            firstName,
            lastName,
            password,
            phone: phoneNumber,
          },
        },
        token);
      } else {
        await this.props.createUser({ // New Agent Sign Up
          user: {
            email,
            password,
            firstName,
            lastName,
            phone: phoneNumber,
          },
        });
      }

      proceed();

    } catch (err) {
      const parsedErr = errParser.parse(err);
      this.setState({ error: get(parsedErr, 'global') });
    }
  };

  render() {
    const {
      firstName, lastName, phoneNumber, email, classes, moveBack, role, inviteId, brokerageName,
    } = this.props;
    const { error } = this.state;
    return (
      <div className={classes.screenContainer}>
        <p className={classes.screenTitle}>Summary</p>
        <div className={classes.listHeader}>First Name</div>
        <div className={classes.listContent}>{firstName}</div>
        <Divider />
        <div className={classes.listHeader}>Last Name</div>
        <div className={classes.listContent}>{lastName}</div>
        <Divider />
        <div className={classes.listHeader}>Phone</div>
        <div className={classes.listContent}>{phoneNumber}</div>
        <Divider />
        <div className={classes.listHeader}>Email</div>
        <div className={classes.listContent}>{email}</div>
        <Divider />
        {
          inviteId && role
          && (
            <div className={classes.bottomSection}>
              <Typography className={classes.listHeader}>{messages.SIGN_UP_AS}</Typography>
              <Typography className={classes.listContent}>
                {
                  <SignUpAs role={role} brokerageName={brokerageName} />
                }
              </Typography>
            </div>
          )
        }
        {
          Boolean(error)
          && (
            <FormControl classes={{ root: classes.errorWrapper }} error={Boolean(error)}>
              <FormHelperText classes={{ root: classes.helperText, error: classes.errorMessage }}>{error}</FormHelperText>
            </FormControl>
          )
        }
        <div className={classes.controlButtons}>
          <Button
            classes={{ button: classes.controlButton }}
            text="Back"
            onClick={moveBack}
            secondary
          />
          <Button
            classes={{ button: classes.controlButton }}
            text="Submit"
            disabled={!lastName || !firstName}
            onClick={this.handleSubmit}
          />
        </div>
      </div>
    );
  }

}

export default compose(
  withStyles(styles, { withTheme: true }),
  withCreateUser,
  withAcceptInvitation,
)(SummaryScreenC);
