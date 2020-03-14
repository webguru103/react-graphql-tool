import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogButtonBottom from '../../shared/dialogButtonBottom/dialogButtonBottom';
import styles from './formSettingsDialog.styles';
import { withUpdateForm, withFormGroups } from './api/form.service';
import { compose, pro, get } from '../../utility';
import { errParser } from '../../api-error-parser';
import { withSnackbar } from '../../shared/snackbar/withSnackbar';
import { withDialog } from '../../shared/dialog/withDialog';
import c from './constants';
import type { Form, FormGroup } from '../../flowTypes';
import type { ParsedApiError } from '../../api-error-parser/errorParser';

type PropType = {
  updateForm: ({ id: number, formName: string, formGroupId: number, formStatus: string }) => Promise<Form>,
  closeDialog: () => void,
  createSnackbar: (React.Element) => void,
  form: Form,
  classes: Object,
  formGroups: Array<FormGroup>,
  refetch: () => void,
}

type StateType = {
  networkError: ParsedApiError
}

export class FormSettingsDialogC extends React.PureComponent<PropType, StateType> {

  state = {
    networkError: {},
  };

  handleSubmit = async ({ formName, formGroupId, formStatus }: { formName: string, formGroupId: number, formStatus: string } = {}) => {
    const {
      form: { id }, updateForm, closeDialog, createSnackbar, refetch,
    } = this.props;
    const [err] = await pro(updateForm({
      id, formName, formGroupId, formStatus,
    }));

    if (err) {
      const parsedError = errParser.parse(err);
      this.setState({ networkError: parsedError });
      return;
    }

    closeDialog();
    refetch();
    createSnackbar(c.FORM_UPDATED);
  };

  render() {
    const {
      classes, formGroups, form: { formName, formStatus, formGroupId },
    } = this.props;
    const { networkError } = this.state;
    return (
      <DialogButtonBottom
        actionButtonText="Update"
        onSubmit={this.handleSubmit}
        initialValues={{
          formName,
          formStatus,
          formGroupId,
        }}
        title="Form Settings"
        validate={(values) => {
          const errors = {};
          if (!values.formName) {
            errors.formName = c.NOT_EMPTY;
          }
          return errors;
        }}
      >
        {
          ({ handleChange, values, errors }) => (
            <div className={classes.dialog}>
              <FormControl fullWidth>
                <TextField
                  id="form-name"
                  label="Form Name"
                  className={classes.textField}
                  name="formName"
                  onChange={handleChange}
                  margin="normal"
                  error={Boolean(errors.formName || get(networkError, 'validations.formName'))}
                  value={values.formName}
                  fullWidth
                />
                <FormHelperText id="component-error-text">{errors.formName || get(networkError, 'validations.formName')}</FormHelperText>
              </FormControl>
              <Select
                value={values.formGroupId}
                onChange={handleChange}
                name="formGroupId"
                className={classes.formGroupSelect}
                input={(
                  <OutlinedInput
                    labelWidth={50}
                    fullWidth
                    name="formGroupId"
                    id="outlined-age-simple"
                  />
                )}
              >
                {formGroups.map(fg => <MenuItem key={fg.id} value={fg.id}>{fg.formGroupName}</MenuItem>)}
              </Select>
              <RadioGroup
                aria-label="formStatus"
                name="formStatus"
                className={classes.group}
                value={values.formStatus}
                onChange={handleChange}
              >
                <FormControlLabel value="ACTIVE" control={<Radio />} label={c.ACTIVE} />
                <FormControlLabel value="INACTIVE" control={<Radio />} label={c.INACTIVE} />
              </RadioGroup>
              {networkError && networkError.global && <FormHelperText error>{networkError.global}</FormHelperText>}
              {networkError && networkError.network && <FormHelperText error>{c.NETWORK_ERROR}</FormHelperText>}
            </div>
          )
        }
      </DialogButtonBottom>
    );
  }

}

export default compose(
  withUpdateForm,
  withFormGroups,
  withStyles(styles),
  withDialog,
  withSnackbar,
)(FormSettingsDialogC);
