import * as React from 'react';
import classNames from 'classnames';
import { Formik } from 'formik';
import Select from 'react-select';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';
import styles from './inviteNewAdminDialog.styles';
import {
  compose, get, isEmailValid, pro,
} from '../../utility';
import c from './constants';
import type { BrokerageType } from '../../flowTypes';
import { errParser } from '../../api-error-parser';

type Props = {
  classes: Object,
  closeDialog: Function,
  inviteNewAdmin: Function,
  brokerages: Array<BrokerageType>,
  onSuccessInvite: () => void,
};

type State = {
  networkError: React.Node,
};

export class InviteNewAdminDialogC extends React.Component<Props, State> {

  state = {
    networkError: '',
  };

  resetNetworkError = () => {
    this.setState({
      networkError: '',
    });
  };

  inviteNewAdmin = async ({
    email, firstName, lastName, brokerage,
  }: { email: string, firstName: string, lastName: string, brokerage: { value: string } }) => { // eslint-disable-line
    const { inviteNewAdmin, closeDialog, onSuccessInvite } = this.props;
    const trimmedEmail = email.trim();
    const [err] = await pro(inviteNewAdmin({
      email: trimmedEmail,
      firstName,
      lastName,
      brokerageId: brokerage.value,
    }));

    if (err) {
      const parsedErr = errParser.parse(err);
      if (parsedErr.network) {
        this.setState({
          networkError: c.REQUEST_ERROR,
        });
        return;
      }
      if (parsedErr.global) {
        this.setState({
          networkError: parsedErr.global,
        });
      }
    } else {
      if (onSuccessInvite) {
        onSuccessInvite();
      }
      closeDialog();
    }
  };

  render() {
    const { classes, closeDialog, brokerages } = this.props;
    const { networkError } = this.state;

    return (
      <Formik
        initialValues={{
          email: '',
          firstName: '',
          lastName: '',
          brokerage: get(brokerages[0], 'id'),
          permission: 'super-admin',
        }}
        onSubmit={this.inviteNewAdmin}
        validate={({
          email, firstName, lastName, brokerage,
        }) => {
          const errors = {};
          if (!isEmailValid(email)) {
            errors.email = c.INVALID_EMAIL;
          }
          if (!email) {
            errors.email = c.EMPTY_EMAIL;
          }
          if (!firstName) {
            errors.firstName = c.EMPTY_FIRST_NAME;
          }
          if (!lastName) {
            errors.lastName = c.EMPTY_LAST_NAME;
          }

          if (!brokerage.value) {
            errors.brokerage = c.EMPTY_BROKERAGE;
          }
          return errors;
        }}
        render={({
          values, touched, errors, handleSubmit, setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogTitle
              classes={{ root: classes.dialogTitle }}
              disableTypography
            >
              Invite New Admin
            </DialogTitle>
            <DialogContent classes={{ root: classes.dialogContent }}>
              <TextField
                error={touched.email && Boolean(errors.email)}
                fullWidth
                helperText={touched.email && (errors.email)}
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
                  classes: { root: `${classNames(classes.textFieldLabel, classes.label)}` },
                  required: true,
                }}
                onChange={(e) => {
                  this.resetNetworkError();
                  setFieldValue('email', e.target.value);
                }}
                value={values.email}
                name="email"
              />
              <div className={classes.flexInputs}>
                <TextField
                  classes={{ root: classes.flexInput }}
                  error={touched.firstName && Boolean(errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && (errors.firstName)}
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
                    classes: { root: `${classNames(classes.textFieldLabel, classes.label)}` },
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
                    classes: { root: `${classNames(classes.textFieldLabel, classes.label)}` },
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
              <div className={classes.select}>
                <Select
                  className={classes.select}
                  options={brokerages.map(b => ({ value: b.id, label: b.brokerageName }))}
                  value={values.brokerage}
                  onChange={option => setFieldValue('brokerage', option)}
                  placeholder="To Which Brokerage Office?"
                  name="brokerage"
                />
                <FormHelperText error={touched.brokerage && Boolean(errors.brokerage)}>{touched.brokerage && errors.brokerage}</FormHelperText>
              </div>
              <FormControl component="fieldset" className={classes.radio}>
                <FormLabel component="legend" className={classNames(classes.textFieldLabel, classes.label)}>Permission</FormLabel>
                <RadioGroup
                  aria-label="Permission"
                  className={classes.radioGroup}
                  value={values.permission}
                  name="permission"
                  onChange={e => setFieldValue('permission', e.target.value)}
                >
                  <FormControlLabel value="super-admin" control={<Radio />} label="Super Admin" />
                </RadioGroup>
              </FormControl>
              <FormControl className={classes.networkErrorMessage} error={Boolean(networkError)}>
                <FormHelperText>{networkError}</FormHelperText>
              </FormControl>
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
                data-testid="submit-button"
                disabled={Boolean(networkError
                  || (touched.email && errors.email)
                  || (touched.firstName && errors.firstName)
                  || (touched.lastName && errors.lastName))
                }
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
  withStyles(styles, { withTheme: true }),
)(InviteNewAdminDialogC);
