import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import DialogButtonBottom from '../../shared/dialogButtonBottom/dialogButtonBottom';
import PasswordValidation from '../../shared/passwordValidation/passwordValidation';
import type { UserType } from '../../flowTypes';
import { withUpdateUser } from './api/accountSettings.service';
import { withAppUser, withUpdateUserState } from '../../shared/authorization/userConsumer';
import { withSnackbar } from '../../shared/snackbar/withSnackbar';
import { withDialog } from '../../shared/dialog/withDialog';
import { compose, get } from '../../utility';
import { logger } from '../../logger';
import { errParser } from '../../api-error-parser';
import styles from './passwordChangeDialog.styles';
import { messages } from './formattedMessages';

type Props = {
  classes: Object,
  user: UserType,
  refetchUser: Function,
  updateUser: Function,
  closeDialog: Function,
  createSnackbar: Function,
}

type State = {
  canSubmit: boolean,
  showOldPassword: boolean,
  oldPassword: string,
  password: string,
  passwordValidated: boolean,
  error: React.Node,
}
class PasswordChangeDialog extends React.PureComponent<Props, State> {

  state = {
    canSubmit: false,
    showOldPassword: false,
    oldPassword: '',
    password: '',
    passwordValidated: false,
    error: '',
  };

  handleClickShowOldPassword = () => {
    this.setState(prevState => ({ showOldPassword: !prevState.showOldPassword }));
  };

  handleSetOldPassword = (ev: SyntheticInputEvent<HTMLInputElement>) => {
    const oldPassword = ev.target.value;
    const { password } = this.state;
    const isPasswordNew = oldPassword !== password;
    const passwordError = isPasswordNew ? '' : messages.PASSWORD_NOT_CHANGED;
    this.setState({
      oldPassword,
      error: oldPassword && password ? passwordError : '',
      canSubmit: Boolean(oldPassword && password && isPasswordNew && this.state.passwordValidated),
    });
  };

  onChange = (password: string, validated: boolean) => {
    const { oldPassword } = this.state;
    const isPasswordNew = oldPassword !== password;
    const passwordError = isPasswordNew ? '' : messages.PASSWORD_NOT_CHANGED;
    this.setState({
      password,
      passwordValidated: validated,
      error: oldPassword && password ? passwordError : '',
      canSubmit: Boolean(oldPassword && password && isPasswordNew && validated),
    });
  };

  handlePasswordUpdate = async () => {
    const updatedUser = {
      password: this.state.password,
      oldPassword: this.state.oldPassword,
    };

    // Update user object and refetch global user
    try {
      await this.props.updateUser(this.props.user.id, updatedUser);
      await this.props.refetchUser();
    } catch (error) {
      logger.log(error);
      const returnedErrorMessage = get(error, 'graphQLErrors.0.message');
      if (returnedErrorMessage === errParser.OLD_PASSWORD_DOES_NOT_MATCH) {
        this.setState({ error: messages.OLD_PASSWORD_DOES_NOT_MATCH });
      } else {
        this.setState({ error: messages.FAILED_TO_UPDATE_USER });
      }
      return;
    }

    // Password updated successfully, show message and update date display
    this.props.createSnackbar(messages.PASSWORD_UPDATED_SUCCESSFULLY);

    this.props.closeDialog();
  }

  render() {
    const { classes } = this.props;
    const { error } = this.state;
    return (
      <DialogButtonBottom
        actionButtonText="Save"
        isButtonCancel
        title="Change Password"
        content={(
          <React.Fragment>
            <TextField
              id="old-password"
              label="Old Password"
              type={this.state.showOldPassword ? 'text' : 'password'}
              required
              margin="normal"
              autoFocus
              fullWidth
              onChange={ev => this.handleSetOldPassword(ev)}
              value={this.state.oldPassword}
              InputProps={{
                endAdornment: (
                  <IconButton
                    classes={{ root: classes.passwordToggle }}
                    disableRipple
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowOldPassword}
                  >
                    {this.state.showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
              inputProps={{ // eslint-disable-line
                tabIndex: 1,
              }}
            />
            <PasswordValidation autoFocus={false} onChange={this.onChange} />
            <FormControl className={classes.error} fullWidth margin="normal" error={Boolean(error)}>
              <FormHelperText>{error}</FormHelperText>
            </FormControl>
          </React.Fragment>
        )}
        onSubmit={this.handlePasswordUpdate}
        canSubmit={this.state.canSubmit}
      />
    );
  }

}

export default compose(
  withUpdateUser,
  withAppUser,
  withUpdateUserState,
  withSnackbar,
  withDialog,
  withStyles(styles),
)(PasswordChangeDialog);
