import * as React from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { errParser } from '../../api-error-parser';
import { withDialog } from '../../shared/dialog/withDialog';
import { compose, get, pro } from '../../utility';
import validator from '../../validation/helpers';
import { withInviteNewCpUser } from './api/cpUsers.service';
import c from './constants';
import styles from './inviteNewCpUserDialog.styles';

type Props = {
  classes: Object,
  closeDialog: Function,
  inviteNewCpUser: Function,
  inviteSent: Function,
};

type State = {
  networkError: React.Node,
};

export class InviteNewCpUserDialogC extends React.Component<Props, State> {

  state = {
    networkError: '',
  };

  resetNetworkError = () => this.setState({ networkError: '' });

  inviteNewCpUser = async ({
    email, firstName, lastName,
  }: { email: string, firstName: string, lastName: string }) => { // eslint-disable-line
    const {
      inviteNewCpUser, closeDialog, inviteSent,
    } = this.props;
    const [err, data] = await pro(inviteNewCpUser({
      email,
      firstName,
      lastName,
    }));
    if (data) {
      closeDialog();
      inviteSent();
    } else if (err) {
      const parsedErr = errParser.parse(err);
      this.setState({
        networkError: get(parsedErr, 'global'),
      });
    }
  };

  render() {
    const { classes, closeDialog } = this.props;
    const { networkError } = this.state;

    return (
      <Formik
        initialValues={{
          email: '',
          firstName: '',
          lastName: '',
        }}
        onSubmit={this.inviteNewCpUser}
        validate={(values) => {
          const validationResult = validator(values, {
            email: yup.string().email(c.INVALID_EMAIL).required(c.EMPTY_EMAIL),
            firstName: yup.string().trim().required(c.EMPTY_FIRST_NAME),
            lastName: yup.string().trim().required(c.EMPTY_LAST_NAME),
          });

          return validationResult.errors;
        }}
        render={({
          values, touched, errors, handleSubmit, setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogTitle
              classes={{ root: classes.dialogTitle }}
              disableTypography
            >
              Invite New Control Panel User
            </DialogTitle>
            <DialogContent classes={{ root: classes.dialogContent }}>
              <TextField
                error={touched.email && Boolean(errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                label="Email"
                id="email"
                InputProps={{
                  classes: {
                    root: classes.textFieldInputWrapper,
                    input: classes.textFieldInput,
                    error: classes.textFieldInputError,
                  },
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  classes: { root: classes.textFieldLabel },
                  required: true,
                }}
                onChange={(e) => {
                  this.resetNetworkError();
                  setFieldValue('email', e.target.value);
                }}
                value={values.email}
                name="email"
              />
              <FormHelperText
                error={Boolean(networkError)}
              >
                {networkError}
              </FormHelperText>
              <div className={classes.flexInputs}>
                <TextField
                  classes={{ root: classes.flexInput }}
                  error={touched.firstName && Boolean(errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="First Name"
                  id="firstName"
                  InputProps={{
                    classes: {
                      root: classes.textFieldInputWrapper,
                      input: classes.textFieldInput,
                      error: classes.textFieldInputError,
                    },
                    disableUnderline: true,
                  }}
                  InputLabelProps={{
                    classes: { root: classes.textFieldLabel },
                    required: true,
                  }}
                  onChange={(e) => {
                    this.resetNetworkError();
                    setFieldValue('firstName', e.target.value);
                  }}
                  value={values.firstName}
                  name="firstName"
                />
                <TextField
                  classes={{ root: classes.flexInput }}
                  error={touched.lastName && Boolean(errors.lastName)}
                  fullWidth
                  helperText={touched.lastName && (errors.lastName)}
                  label="Last Name"
                  id="lastName"
                  InputProps={{
                    classes: {
                      root: classes.textFieldInputWrapper,
                      input: classes.textFieldInput,
                      error: classes.textFieldInputError,
                    },
                    disableUnderline: true,
                  }}
                  InputLabelProps={{
                    classes: { root: classes.textFieldLabel },
                    required: true,
                  }}
                  onChange={(e) => {
                    this.resetNetworkError();
                    setFieldValue('lastName', e.target.value);
                  }}
                  value={values.lastName}
                  name="lastName"
                />
              </div>
            </DialogContent>
            <DialogActions
              classes={{
                root: classes.dialogActions,
                action: classes.dialogAction,
              }}
            >
              <Button variant="raised" color="default" onClick={closeDialog}>Cancel</Button>
              <Button
                variant="raised"
                color="primary"
                type="submit"
                disabled={
                  Boolean(networkError
                    || (touched.email && errors.email)
                    || (touched.firstName && errors.firstName)
                    || (touched.lastName && errors.lastName))
                }
                data-testid="submit-button"
              >
                Invite
              </Button>
            </DialogActions>
          </form>
        )}
      />

    );
  }

}

export default compose(
  withInviteNewCpUser,
  withStyles(styles, { withTheme: true }),
  withDialog,
)(InviteNewCpUserDialogC);
