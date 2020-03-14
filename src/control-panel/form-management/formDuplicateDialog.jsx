import * as React from 'react';
import type { RouterHistory } from 'react-router';
import { withRouter } from 'react-router';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogButtonBottom from '../../shared/dialogButtonBottom/dialogButtonBottom';
import styles from './formDuplicateDialog.styles';
import { withFormGroups, withDuplicateForm } from './api/form.service';
import { compose, pro, get } from '../../utility';
import { errParser } from '../../api-error-parser';
import { withDialog } from '../../shared/dialog/withDialog';
import type { Form, FormGroup } from '../../flowTypes';
import type { ParsedApiError } from '../../api-error-parser/errorParser';
import UploadForm from '../../shared/uploadForm/uploadForm';
import c, {
  PDF, MAX_UPLOAD_SIZE,
} from './constants';
import { DEFAULT_PAGE_WIDTH, DEFAULT_PAGE_HEIGHT } from '../../editor/constants';

import type { DocumentUpload, PageUpload } from './flowTypes';

type PropType = {
  duplicateForm: ({
    id: number,
    form: {
      formName: string,
      formGroupId: number,
      formStatus: string,
    },
    sourceURL: string,
    pages: Array<PageUpload>,
  }) => Promise<Form>,
  closeDialog: () => void,
  form: Form,
  classes: Object,
  formGroups: Array<FormGroup>,
  history: RouterHistory,
}

type StateType = {
  networkError: ParsedApiError,
  updateFormBase: boolean,
}

export class FormDuplicateDialogC extends React.PureComponent<PropType, StateType> {

  state = {
    networkError: {},
    updateFormBase: false,
  };

  handleSubmit = async ({
    formName, formGroupId, formStatus, documents,
  }: { formName: string, formGroupId: number, formStatus: string, documents: Array<DocumentUpload> } = {}) => {
    const {
      form: { id }, duplicateForm, closeDialog, history,
    } = this.props;
    const [err, data] = await pro(duplicateForm({
      id,
      form: {
        formName: formName.trim(),
        formGroupId,
        formStatus,
      },
      sourceURL: get(documents[0], 'pdf', null),
      pages: get(documents[0], 'pages', [])
        .map((p) => {
          const newP = {
            ...p,
            sourceURL: p.url || '',
            // TODO: send width and height from the response, right now mocking out sample height/width.
            width: DEFAULT_PAGE_WIDTH,
            height: DEFAULT_PAGE_HEIGHT,
          };
          delete newP.url;
          return newP;
        }),
    }));

    if (err) {
      const parsedError = errParser.parse(err);
      this.setState({ networkError: parsedError });
      return;
    }

    history.push(`/cp-user/editor/edit?formId=${get(data, 'data.form.id', '')}`);
    closeDialog();
  };

  handleUpdateFormBaseToggle = () => {
    this.setState(prevState => ({ updateFormBase: !prevState.updateFormBase }));
  };

  resetNetworkError = () => {
    this.setState({ networkError: {} });
  };

  render() {
    const {
      classes, formGroups, form: {
        formName, formStatus, formGroupId,
      },
    } = this.props;
    const { networkError, updateFormBase } = this.state;
    return (
      <DialogButtonBottom
        actionButtonText={updateFormBase ? 'Upload & Start Editing' : 'Start Editing'}
        onSubmit={this.handleSubmit}
        initialValues={{
          formName: `Copy - ${formName}`,
          formStatus,
          formGroupId,
          updateFormBase: false,
          documents: [],
        }}
        title="Duplicate"
        validate={(values) => {
          const errors = {};
          if (!values.formName) {
            errors.formName = c.NOT_EMPTY;
          }

          if (updateFormBase && values.documents.length === 0) {
            errors.documents = c.NO_FORM_BASE_UPLOADED;
          }
          return errors;
        }}
      >
        {
          ({
            handleChange, values, errors, setErrors, setFieldValue,
          }) => (
            <div className={classes.dialog}>
              <FormControl fullWidth className={classes.formNameInput}>
                <TextField
                  id="form-name"
                  label="Form Name"
                  name="formName"
                  onChange={(e) => { this.resetNetworkError(); handleChange(e); }}
                  margin="normal"
                  error={Boolean(errors.formName || get(networkError, 'validations.formName'))}
                  value={values.formName}
                  fullWidth
                />
                <FormHelperText id="component-error-text" error>{errors.formName || get(networkError, 'validations.formName')}</FormHelperText>
              </FormControl>
              <Select
                value={values.formGroupId}
                onChange={(e) => { this.resetNetworkError(); handleChange(e); }}
                name="formGroupId"
                className={classes.formGroupSelect}
                input={(
                  <OutlinedInput
                    labelWidth={50}
                    fullWidth
                    name="formGroupId"
                    id="formGroupId"
                  />
                )}
              >
                {formGroups.map(fg => <MenuItem key={fg.id} value={fg.id}>{fg.formGroupName}</MenuItem>)}
              </Select>
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={updateFormBase}
                    onChange={this.handleUpdateFormBaseToggle}
                    value="updateFormBase"
                    name="updateFormBase"
                  />
                )}
                label="Update form base"
              />
              {updateFormBase
                && (
                  <FormControl fullWidth>
                    <UploadForm
                      acceptTypes={[PDF]}
                      acceptMultiple={false}
                      maxUploadSize={MAX_UPLOAD_SIZE}
                      uploadLabel={c.UPLOAD_LABEL}
                      setURLs={(response) => { this.resetNetworkError(); setFieldValue('documents', response); }}
                      setUploadError={err => setErrors('documents', err)}
                      onDrop={() => {
                        if (setErrors) {
                          setErrors({
                            ...errors,
                            urls: '',
                          });
                        }
                      }}
                    />
                    <FormHelperText id="upload-error" error>{errors.documents}</FormHelperText>
                  </FormControl>
                )
              }
              <RadioGroup
                aria-label="formStatus"
                name="formStatus"
                className={classes.group}
                value={values.formStatus}
                onChange={(e) => { this.resetNetworkError(); handleChange(e); }}
              >
                <FormControlLabel value="ACTIVE" control={<Radio />} label="Active" />
                <FormControlLabel value="INACTIVE" control={<Radio />} label="Inactive" />
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
  withDuplicateForm,
  withFormGroups,
  withStyles(styles),
  withDialog,
  withRouter,
)(FormDuplicateDialogC);
