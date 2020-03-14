import * as React from 'react';
import { Formik } from 'formik';
import classNames from 'classnames';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withInviteUser, withBrokerages } from './api/brokerages.service';
import styles from './adminInput.styles';
import { compose, pro, get } from '../../utility';
import type { BrokerageType } from './flowTypes';
import { errParser } from '../../api-error-parser';
import c from './constants';
import { ROLE_ID, ROLE_CATEGORY, RESOURCE_CATEGORY } from '../../constants';

type PropType = {
  email: string,
  classes: Object,
  newBrokerage: Object,
  closeDialog: Function,
  createSnackbar: Function,
  inviteUser: Function,
  brokerages: Array<BrokerageType>,
};

type StateType = {
  networkError: React.Element,
}

class AdminInputC extends React.Component<PropType, StateType> {

  state = {
    networkError: '',
  };

  componentDidMount() {
    const brokerage = this.props.newBrokerage.brokerageName;
    const hasBrokerage = (element => element.brokerageName === brokerage);
    const add = this.props.brokerages.find(hasBrokerage);
    if (!add) {
      this.props.brokerages.push(this.props.newBrokerage);
    }
  }

  createAdmin = async ({
    firstName,
    lastName,
    permission,
  }: {
      // eslint-disable-next-line
      firstName: string,
      // eslint-disable-next-line
      lastName: string,
      // eslint-disable-next-line
      permission: string,
  }) => {
    const {
      email,
      inviteUser,
      newBrokerage,
    } = this.props;

    this.setState({
      networkError: '',
    });

    let invite = {};
    if (permission === '4') {
      invite = {
        email,
        firstName,
        lastName,
        resourceId: newBrokerage.id,
        roleId: ROLE_ID.SUPER_ADMIN,
        resourceCategory: RESOURCE_CATEGORY.BROKERAGE,
        roleCategory: ROLE_CATEGORY.ADMIN,
      };
    }

    const [err] = await pro(inviteUser({
      invite,
    }));
    if (err) {
      const parsedErr = errParser.parse(err);
      this.setState({ networkError: get(parsedErr, 'global') });
      return;
    }
    this.props.createSnackbar(c.SUCCESS_INVITE_ADMIN);
    this.props.closeDialog();

  };

  render() {
    const {
      classes,
      closeDialog,
      brokerages,
      newBrokerage,
    } = this.props;

    const {
      networkError,
    } = this.state;

    const validate = (values) => {
      const errors = {};
      if (!values.firstName) {
        errors.firstName = c.EMPTY_FIELD;
      }
      if (!values.lastName) {
        errors.lastName = c.EMPTY_FIELD;
      }
      if (!values.brokerage) {
        errors.brokerage = c.EMPTY_FIELD;
      }
      return errors;
    };

    return (
      <Formik
        initialValues={{
          brokerage: newBrokerage.brokerageName,
          firstName: '',
          lastName: '',
          permission: '4',
        }}
        onSubmit={this.createAdmin}
        validate={validate}
        render={({
          values, touched, errors, handleSubmit, handleChange,
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogTitle
              classes={{
                root: classes.dialogTitle,
              }}
              disableTypography
            >
              {<span>{c.ADD_ADMIN}</span>}
              <IconButton
                classes={{ root: classes.dialogClose }}
                disableRipple
                onClick={closeDialog}
              >
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent classes={{ root: classes.dialogContent }}>
              <div className={classes.flexInputs}>
                <TextField
                  error={touched.firstName && Boolean(errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && (errors.firstName)}
                  label="First Name"
                  id="input"
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
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                />
                <TextField
                  error={touched.lastName && Boolean(errors.lastName)}
                  fullWidth
                  helperText={touched.lastName && (errors.lastName)}
                  label="Last Name"
                  id="input"
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
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                />
              </div>
              <TextField
                error={touched && touched.brokerage && errors && Boolean(errors.brokerage)}
                select
                label="To Which Brokerage Office?"
                id="input"
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
                className={classNames(classes.margin, classes.textField, classes.select)}
                onChange={handleChange}
                value={values && values.brokerage}
                name="brokerage"
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
              >
                {brokerages.map(brokerageOpt => (
                  <MenuItem key={brokerageOpt.id} value={brokerageOpt.brokerageName}>
                    {brokerageOpt.brokerageName}
                  </MenuItem>
                ))}
              </TextField>
              <FormLabel
                className={classNames(classes.group, classes.textFieldLabel)}
              >
                Permission
              </FormLabel>
              <RadioGroup
                aria-label="permission"
                name="permission"
                className={classNames(classes.group, classes.textFieldLabel)}
                value={values && values.permission}
                onChange={handleChange}
              >
                <FormControlLabel value="4" control={<Radio />} label="Super Admin" />
              </RadioGroup>
              <FormControl
                error={Boolean(networkError)}
              >
                <FormHelperText>
                  {networkError}
                </FormHelperText>
              </FormControl>
            </DialogContent>
            <DialogActions
              classes={{
                root: classes.dialogActions,
                action: classes.dialogAction,
              }}
            >
              <Button variant="raised" color="default" onClick={closeDialog}>Cancel</Button>
              <Button variant="raised" color="primary" type="submit">{c.ADD}</Button>
            </DialogActions>
          </form>
        )}
      />
    );
  }

}

export default compose(
  withBrokerages,
  withInviteUser,
  withStyles(styles, { withTheme: true }),
)(AdminInputC);
