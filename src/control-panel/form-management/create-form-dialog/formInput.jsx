// @flow

import * as React from 'react';
import classNames from 'classnames';

import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';

import UploadForm from '../../../shared/uploadForm/uploadForm';
import styles from './formInput.styles';
import { noop } from '../../../utility';
import c, { MAX_UPLOAD_SIZE, PDF } from '../constants';

type Props = {
  classes: Object,
  networkError: ?React.Node,
  values?: Object,
  touched?: Object,
  errors?: Object,
  handleChange?: Function,
  setErrors?: Function,
  setFieldValue?: Function,
};

class FormInput extends React.Component <Props, *> {

  static defaultProps = {
    values: {},
    touched: {},
    errors: {},
    handleChange: noop,
    setErrors: noop,
    setFieldValue: noop,
  };

  state = {
    uploadError: '',
  }

  setURLField = (documents: Array<any>) => {
    if (this.props.setFieldValue) {
      this.props.setFieldValue('documents', documents);
    }
  }

  setUploadError = (uploadError) => {
    this.setState({
      uploadError,
    });
  }

  render() {

    const {
      classes,
      networkError,
      values,
      touched,
      errors,
      handleChange,
      setErrors,
    } = this.props;

    const { uploadError } = this.state;

    return (
      <div className={classes.formInput}>
        <TextField
          error={touched && touched.name && errors && Boolean(errors.name)}
          fullWidth
          helperText={touched && touched.name && errors && errors.name}
          label={c.FORM_NAME}
          id="name"
          InputProps={{
            classes: {
              root: classes.textFieldInputWrapper,
              input: classes.textFieldInput,
              error: classes.textFieldInputError,
            },
            disableUnderline: true,
            inputProps: {
              'data-testid': 'form-name-input',
            },
          }}

          InputLabelProps={{
            classes: { root: `${classNames(classes.textFieldLabel, classes.label)}` },
            required: true,
          }}
          onChange={handleChange}
          value={values && values.name}
          name="name"
        />
        <FormControl>
          <FormLabel
            classes={{ root: `${classNames(classes.textFieldLabel, classes.label, classes.singleLabel)}` }}
            required
          >
            Upload Form Base
          </FormLabel>
        </FormControl>
        <UploadForm
          acceptTypes={[PDF]}
          acceptMultiple={false}
          maxUploadSize={MAX_UPLOAD_SIZE}
          uploadLabel={c.UPLOAD_LABEL}
          setUploadError={this.setUploadError}
          setURLs={this.setURLField}
          onDrop={() => {
            // Formik hook for UploadForm - reset error for urls field
            // manually so that when upload field is touched, error is no longer present
            if (setErrors) {
              setErrors({
                ...errors,
                documents: '',
              });
            }
          }}
        />
        {Boolean(uploadError) && (
          <FormControl error>
            <FormHelperText>
              {uploadError}
            </FormHelperText>
          </FormControl>
        )}
        {touched && touched.documents && Boolean(errors && errors.documents) && (
          <FormControl error>
            <FormHelperText>
              {errors && errors.documents}
            </FormHelperText>
          </FormControl>
        )}
        <FormControl component="fieldset">
          <RadioGroup
            className={classes.statusRadioGroup}
            aria-label="status"
            name="status"
            value={values && values.status}
            onChange={handleChange}
          >
            <FormControlLabel data-testid="active-form" value="ACTIVE" control={<Radio />} label="Active" />
            <FormControlLabel data-testid="inactive-form" value="INACTIVE" control={<Radio />} label="Inactive" />
          </RadioGroup>
        </FormControl>
        {Boolean(networkError) && (
          <FormControl error>
            <FormHelperText>
              {networkError}
            </FormHelperText>
          </FormControl>
        )}
      </div>
    );
  }

}

export default withStyles(styles)(FormInput);
