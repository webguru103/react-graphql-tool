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
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {
  withBrokerages,
  withUserByEmail,
  withInviteNewAdmin,
} from './api/brokerages.service';
import styles from './adminAddInput.styles';
import { compose, pro, get } from '../../utility';
import type { BrokerageType } from './flowTypes';
import { errParser } from '../../api-error-parser';
import c from './constants';
import { ROLE_ID, ROLE_CATEGORY, RESOURCE_CATEGORY } from '../../constants';

type PropType = {
  userEmail: string,
  classes: Object,
  newBrokerage: Object,
  closeDialog: Function,
  createSnackbar: Function,
  getUserByEmail: Function,
  inviteNewAdmin: Function,
  brokerages: Array<BrokerageType>,
};

type StateType = {
  networkError: React.Element,
}

class AdminInviteInputC extends React.Component<PropType, StateType> {

  state = {
    networkError: '',
  };

  addAdmin = async ({
    brokerage,
    permission,
  }: {
    brokerage: string,
    permission: string,
  } = {}) => {
    const {
      userEmail,
      getUserByEmail,
      brokerages,
      inviteNewAdmin,
    } = this.props;

    this.setState({
      networkError: '',
    });

    const selectedBrokerage = brokerages.filter(element => element.brokerageName === brokerage);

    const [err] = await pro(getUserByEmail({
      userEmail,
    }));
    if (err) {
      const parsedErr = errParser.parse(err);
      this.setState({ networkError: get(parsedErr, 'global') });
    }

    const brokerageAcls = [];

    if (permission === '4') {
      brokerageAcls.push({
        brokerageId: selectedBrokerage[0].id,
        roleId: ROLE_ID.SUPER_ADMIN,
        roleCategory: ROLE_CATEGORY.ADMIN,
        resourceCategory: RESOURCE_CATEGORY.BROKERAGE,
      });
    }

    const [errInvite] = await pro(inviteNewAdmin({
      email: userEmail,
      brokerageId: selectedBrokerage[0].id,
    }));
    if (errInvite) {
      const parsedErr = errParser.parse(errInvite);
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
      if (!values.brokerage) {
        errors.brokerage = c.EMPTY_FIELD;
      }
      return errors;
    };

    const brokerage = newBrokerage.brokerageName;
    const hasBrokerage = (element => element.brokerageName === brokerage);

    const add = brokerages.find(hasBrokerage);
    if (!add) {
      brokerages.push(newBrokerage);
    }

    return (
      <Formik
        initialValues={{
          brokerage,
          permission: '4',
        }}
        onSubmit={this.addAdmin}
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
                {brokerages.map(brokerageOption => (
                  <MenuItem key={brokerageOption.id} value={brokerageOption.brokerageName}>
                    {brokerageOption.brokerageName}
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
                className={classes.group}
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
  withUserByEmail,
  withInviteNewAdmin,
  withStyles(styles, { withTheme: true }),
)(AdminInviteInputC);
