import * as React from 'react';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { FormLabel } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import PasswordChangeDialog from './passwordChangeDialog';
import styles from './personal.styles';
import PhoneNumberInput from '../../shared/maskedInputs/phoneNumberInput';
import type { UserType } from '../../flowTypes';
import { compose } from '../../utility';
import { withDialog } from '../../shared/dialog/withDialog';
import { withSnackbar } from '../../shared/snackbar/withSnackbar';
import { withUpdateUser } from './api/accountSettings.service';
import { withAppUser, withUpdateUserState } from '../../shared/authorization/userConsumer';
import { logger } from '../../logger';
import validator from '../../validation/helpers';
import { personValidationSchema } from '../../validation/validationSchemas';
import { messages } from './formattedMessages';
import { MESSAGES } from './constants';

type Props = {
  createDialog: Function,
  createSnackbar: Function,
  classes: Object,
  user: UserType,
  updateUser: Function,
  refetchUser: Function,
};

type State = {
  previousValues: { [string]: string },
  name: string,
  email: string,
  phone: string,
  editing: {
    email: boolean,
    name: boolean,
    phone: boolean,
  },
  errors: {
    [string]: string
  },
  globalError: React.Element,
  updated: boolean,
}

class PersonalC extends React.Component<Props, State> {

  state = {
    previousValues: {},
    name: `${this.props.user.firstName} ${this.props.user.lastName}`,
    email: this.props.user.email,
    phone: this.props.user.phone,
    editing: {
      email: false,
      name: false,
      phone: false,
    },
    errors: {},
    globalError: '',
    updated: false,
  };

  handleChange = name => (event) => {
    const { value } = event.target;
    let values;
    if (name === 'name') {
      const spaceCount = (value.split(' ').length - 1);
      let firstName = '';
      let lastName = '';
      if (spaceCount > 0) {
        firstName = value.substr(0, value.indexOf(' '));
        lastName = value.substr(value.indexOf(' ') + 1);
      } else {
        firstName = value;
      }

      values = {
        firstName,
        lastName,
        phone: this.state.phone,
      };
    } else {
      values = {
        [name]: value,
        firstName: this.state.name.substr(0, this.state.name.indexOf(' ')),
        lastName: this.state.name.substr(this.state.name.indexOf(' ') + 1),
      };
    }

    const validationResult = validator(values, personValidationSchema);
    if (Object.keys(validationResult.errors).length) {
      this.setState({ errors: validationResult.errors, updated: false });
    } else {
      this.setState({ errors: {}, updated: true });
    }

    this.setState({ [name]: value });
  };

  toggleEdit = (fieldName: string) => {
    const { editing } = this.state;

    if (fieldName === 'name') {
      // Show confirmation dialog asking to discard changes if user was editing phone number field
      if (editing.phone && this.state.previousValues['phone'] !== this.state.phone && !confirm(MESSAGES.DISCARD_PHONE_NUMBER_CHANGES)) return // eslint-disable-line

      this.setState({
        editing: {
          ...editing,
          [fieldName]: !editing[fieldName],
          phone: false,
        },
        phone: this.props.user.phone,
        errors: {},
      });
    } else if (fieldName === 'phone') {
      // Show confirmation dialog asking to discard changes if user was editing name field
      if (editing.name && this.state.previousValues['name'] !== this.state.name && !confirm(MESSAGES.DISCARD_NAME_CHANGES)) return // eslint-disable-line

      this.setState({
        editing: {
          ...editing,
          [fieldName]: !editing[fieldName],
          name: false,
        },
        name: `${this.props.user.firstName} ${this.props.user.lastName}`,
        errors: {},
      });
    } else if (fieldName === 'password') {
      // Show confirmation dialog asking to discard changes in either case where user was editing one of the other fields
      if (editing.name && this.state.previousValues['name'] !== this.state.name && !confirm(MESSAGES.DISCARD_NAME_CHANGES)) return // eslint-disable-line
      if (editing.phone && this.state.previousValues['phone'] !== this.state.phone && !confirm(MESSAGES.DISCARD_PHONE_NUMBER_CHANGES)) return // eslint-disable-line

      this.setState({
        editing: {
          ...editing,
          name: false,
          phone: false,
        },
        name: `${this.props.user.firstName} ${this.props.user.lastName}`,
        phone: this.props.user.phone,
        errors: {},
      });
      this.handlePasswordDialogOpen();
      return;
    }

    if (!editing[fieldName]) {
      this.setPreviousValues(fieldName);
    }
  };

  setPreviousValues = (fieldName: string) => {
    this.setState(prevState => ({
      previousValues: {
        ...prevState.previousValues,
        [fieldName]: this.state[fieldName],
      },
    }));
  };

  handleUpdate = async (fieldName: string) => {

    // If updating value is the same as previous value, exit and do not save
    if (this.state.previousValues[fieldName] === this.state[fieldName]) {
      this.toggleEdit(fieldName);
      return;
    }

    let updatedUser;
    if (fieldName === 'name') {
      // If setting name, split name field into first and last names
      const nameValue = this.state.name;
      const spaceCount = (nameValue.split(' ').length - 1);
      let firstName;
      let lastName;
      if (spaceCount > 0) {
        firstName = nameValue.substr(0, nameValue.indexOf(' '));
        lastName = nameValue.substr(nameValue.indexOf(' ') + 1);
      } else {
        firstName = nameValue;
        lastName = ' ';
      }

      updatedUser = {
        firstName,
        lastName,
      };
    } else {
      // Otherwise, just add field to update
      updatedUser = {
        [fieldName]: this.state[fieldName],
      };
    }

    // Update user object and refetch global user
    try {
      await this.props.updateUser(this.props.user.id, updatedUser);
      await this.props.refetchUser();
    } catch (error) {
      logger.log(error);
      this.setState({ globalError: messages.FAILED_TO_UPDATE_USER });
    }

    // Reset edit icon, disable field
    this.toggleEdit(fieldName);

    if (fieldName === 'name') {
      this.props.createSnackbar(messages.NAME_UPDATED_SUCCESSFULLY);
    } else if (fieldName === 'phone') {
      this.props.createSnackbar(messages.PHONE_NUMBER_UPDATED_SUCCESSFULLY);
    }
  };

  handlePasswordDialogOpen = () => {
    this.props.createDialog({
      dialogContent: <PasswordChangeDialog />,
    });
  };

  render() {
    const { user, classes } = this.props;
    const {
      name, email, phone, errors, globalError,
    } = this.state;
    return (
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          id="email"
          label="Email"
          type="email"
          InputProps={{
            readOnly: true,
          }}
          value={email}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          id="name"
          label="Name"
          InputProps={{
            endAdornment: (
              !this.state.editing.name
                ? (
                  <IconButton
                    className={classes.iconButton}
                    disableRipple
                    onClick={() => this.toggleEdit('name')}
                  >
                    <EditIcon />
                  </IconButton>
                )
                : (
                  <IconButton
                    className={classes.iconButton}
                    disableRipple
                    disabled={((Boolean(errors.firstName) || Boolean(errors.lastName)))}
                    onClick={() => this.handleUpdate('name')}
                  >
                    <SaveIcon />
                  </IconButton>
                )
            ),
          }}
          value={name}
          onChange={this.handleChange('name')}
          fullWidth
          margin="normal"
          disabled={!this.state.editing.name}
          error={(Boolean(errors.firstName) || Boolean(errors.lastName))}
          helperText={errors.firstName || errors.lastName}
        />
        <TextField
          id="phone"
          label="Phone Number"
          InputProps={{
            inputComponent: PhoneNumberInput,
            endAdornment: (!this.state.editing.phone)
              ? (
                <IconButton
                  className={classes.iconButton}
                  disableRipple
                  onClick={() => this.toggleEdit('phone')}
                >
                  <EditIcon />
                </IconButton>
              )
              : (
                <IconButton
                  className={classes.iconButton}
                  disableRipple
                  disabled={((Boolean(errors.phone)))}
                  onClick={() => this.handleUpdate('phone')}
                >
                  <SaveIcon />
                </IconButton>
              ),
          }}
          error={Boolean(errors.phone)}
          helperText={errors.phone}
          value={phone}
          onChange={this.handleChange('phone')}
          fullWidth
          disabled={!this.state.editing.phone}
        />
        <TextField
          id="passwordUpdate"
          label="Password"
          InputProps={{
            endAdornment: (
              <IconButton
                className={classes.iconButton}
                disableRipple
                onClick={() => this.toggleEdit('password')}
              >
                <EditIcon />
              </IconButton>
            ),
          }}
          value={user.passwordChangedAt
            ? `Last updated ${moment(user.passwordChangedAt).format('MMMM Do YYYY, h:mm A')}`
            : 'Not updated since signing up'}
          fullWidth
          margin="normal"
          disabled
        />
        {globalError && <FormLabel className={classes.error} error>{globalError}</FormLabel>}
      </form>
    );
  }

}

export default compose(
  withAppUser,
  withUpdateUser,
  withUpdateUserState,
  withStyles(styles, { withTheme: true }),
  withDialog,
  withSnackbar,
)(PersonalC);
