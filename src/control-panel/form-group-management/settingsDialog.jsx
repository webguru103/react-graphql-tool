import * as React from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import { withUpdateFormGroup } from './api/formGroup.service';
import { compose } from '../../utility';
import { withDialog } from '../../shared/dialog/withDialog';
import validator from '../../validation/helpers';
import c, { FORM_GROUP_VISIBILITY } from './constants';
import styles from './settingsDialog.styles';

type PropType = {
  classes: Object,
  closeDialog: Function,
  updateFormGroup: Function,
  formGroupId: number,
  formGroupVis: string,
  formGroupName: string,
  onSubmit: Function,
};

type StateType = {
  networkError: React.Element,
}

class SettingsDialogC extends React.PureComponent<PropType, StateType> {

  state = {
    networkError: '',
  };

  submitUpdateFormGroup = async ({
    groupName,
    visibility,
  }: {
      groupName: string,
      visibility: string,
    } = {}) => {
    const {
      updateFormGroup, closeDialog, formGroupId, onSubmit,
    } = this.props;

    const formGroup = {
      formGroupName: groupName,
      visibility,
    };
    try {
      await updateFormGroup({ id: formGroupId, formGroup });
      onSubmit();
      closeDialog();
    } catch (err) {
      this.setState({ networkError: c.REQUEST_ERROR });
    }
  };

  render() {
    const {
      classes, closeDialog, formGroupVis, formGroupName,
    } = this.props;

    const {
      networkError,
    } = this.state;

    // TODO: make sure visibility is within a set array of values
    const validate = (values) => {
      const validationResult = validator(values, {
        groupName: yup.string().trim().required(c.EMPTY_GROUP_NAME),
        visibility: yup.string().matches(/(EVERYONE|OREA|NO_ONE)/, c.EMPTY_VISIBILITY).required(c.EMPTY_VISIBILITY),
      });
      return validationResult.errors;
    };

    return (
      <Formik
        onSubmit={this.submitUpdateFormGroup}
        validate={validate}
        initialValues={{
          groupName: (formGroupName || ''),
          visibility: (formGroupVis || ''),
        }}
        render={({
          values, touched, errors, handleSubmit, handleChange,
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogTitle classes={{ root: classes.dialogTitle }} disableTypography>{c.SETTINGS}</DialogTitle>
            <DialogContent classes={{ root: classes.dialogContent }}>
              <div className={classes.flexInputs}>
                <TextField
                  error={touched && touched.groupName && errors && Boolean(errors.groupName)}
                  fullWidth
                  label="Group Name"
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
                  value={values && values.groupName}
                  name="groupName"
                />
                <FormControl
                  error={errors && Boolean(networkError)}
                >
                  <FormLabel
                    className={classNames(classes.label, classes.textFieldLabel)}
                    focused={false}
                  >
                    Visibility
                  </FormLabel>
                  <RadioGroup
                    aria-label="visibility"
                    name="visibility"
                    classes={{ root: classes.radioGroup }}
                    value={values && values.visibility}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      data-testid="settings-form-group-visible-everyone"
                      value={FORM_GROUP_VISIBILITY.EVERYONE}
                      control={<Radio classes={{ root: classes.radio }} disableRipple />}
                      label="Everyone"
                    />
                    <FormControlLabel
                      data-testid="settings-form-group-visible-orea"
                      value={FORM_GROUP_VISIBILITY.OREA}
                      control={<Radio classes={{ root: classes.radio }} disableRipple />}
                      label="Limit To OREA"
                    />
                    <FormControlLabel
                      data-testid="settings-form-group-visible-no-one"
                      value={FORM_GROUP_VISIBILITY.NO_ONE}
                      control={<Radio classes={{ root: classes.radio }} disableRipple />}
                      label="No One"
                    />
                  </RadioGroup>
                  <FormHelperText
                    error
                  >
                    {networkError || errors.visibility}
                  </FormHelperText>
                </FormControl>
              </div>
            </DialogContent>
            <DialogActions classes={{ root: classes.dialogActions, action: classes.dialogAction }}>
              <Button variant="raised" color="default" onClick={closeDialog}>{c.CANCEL}</Button>
              <Button
                variant="raised"
                color="primary"
                data-testid="submit-button"
                type="submit"
                disabled={
                  Boolean(networkError
                    || (touched.groupName && errors.groupName)
                    || (touched.visibility && errors.visibility))
                }
              >
                {c.CONFIRM}
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
  withDialog,
  withUpdateFormGroup,
)(SettingsDialogC);
