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
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withAdminIdentity } from './api/brokerages.service';
import { compose, get } from '../../utility';
import { errParser } from '../../api-error-parser';
import styles from './emailInput.styles';
import c from './constants';

type PropType = {
  email?: string,
  classes: Object,
  nextForm: Function,
  checkAdminIdentity: Function,
  setExistingUser: Function,
  setEmail: Function,
  closeDialog: Function,
};

type StateType = {
  networkError: React.Node,
}

class EmailInputC extends React.Component<PropType, StateType> {

  static defaultProps = {
    email: '',
  };

  state = {
    networkError: '',
  };

  checkEmailAndProceed = async ({
    email,
  }: {
    email?: string,
  }) => {

    let trimmedEmail;
    if (email) {
      trimmedEmail = email.trim();
    }

    try {
      const { data: { checkIdentityResponse: { foundUser } } } = await this.props.checkAdminIdentity(trimmedEmail);
      if (foundUser) {
        this.props.setExistingUser(trimmedEmail);
      } else {
        this.props.setEmail(trimmedEmail);
      }

      this.props.nextForm();

    } catch (error) {
      const parsedErr = errParser.parse(error);
      this.setState({ networkError: get(parsedErr, 'global') });
    }
  };

  render() {
    const {
      classes,
      closeDialog,
      email,
    } = this.props;

    const {
      networkError,
    } = this.state;

    const validate = (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = c.EMPTY_FIELD;
      }
      return errors;
    };

    return (
      <Formik
        initialValues={{
          email,
        }}
        onSubmit={this.checkEmailAndProceed}
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
              {<span>{c.WANT_TO_ADD_ADMIN}</span>}
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
                error={touched.email && Boolean(errors.email)}
                fullWidth
                helperText={touched.email && (errors.email)}
                label="Super Admin Email Address"
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
                value={values.email}
                name="email"
              />
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
              <Button variant="raised" color="default" onClick={closeDialog}>{c.NOT_NOW}</Button>
              <Button variant="raised" color="primary" type="submit">{c.SUBMIT}</Button>
            </DialogActions>
          </form>
        )}
      />

    );
  }

}

export default compose(
  withStyles(styles, { withTheme: true }),
  withAdminIdentity,
)(EmailInputC);
