import * as React from 'react';
import classNames from 'classnames';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import styles from './brokerageInput.styles';
import PhoneNumberInput from '../../../shared/maskedInputs/phoneNumberInput';
import { noop } from '../../../utility';

type Props = {
  classes: Object,
  networkError: ?React.Node,
  values?: Object,
  touched?: Object,
  errors?: Object,
  handleChange?: Function,
};

const countries = [
  {
    value: 'Canada',
    label: 'Canada',
  },
];

const provinces = [
  {
    value: 'Ontario',
    label: 'Ontario',
  },
  {
    value: 'British Columbia',
    label: 'British Columbia',
  },
];

const BrokerageOfficeInputC = ({
  classes,
  networkError,
  values,
  touched,
  errors,
  handleChange,
}: Props) => (
  <div className={classes.wrapperDiv}>
    <TextField
      error={touched && touched.name && errors && Boolean(errors.name)}
      fullWidth
      helperText={touched && touched.name && errors && (errors.name)}
      label="Brokerage Office Name"
      id="input"
      autoComplete="off"
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
      value={values && values.name}
      name="name"
    />
    <div className={classes.flexInputs}>
      <TextField
        classes={{ root: classes.flexInput }}
        error={touched && touched.phone && errors && Boolean(errors.phone)}
        fullWidth
        helperText={touched && touched.phone && errors && (errors.phone)}
        label="Phone Number"
        id="input"
        InputProps={{
          inputComponent: PhoneNumberInput,
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
        value={values && values.phone}
        name="phone"
        autoComplete="off"
      />
      <TextField
        classes={{ root: classes.flexInput }}
        error={touched && touched.fax && errors && Boolean(errors.fax)}
        fullWidth
        helperText={touched && touched.fax && errors && (errors.fax)}
        label="Fax Number"
        id="input"
        InputProps={{
          inputComponent: PhoneNumberInput,
          classes: {
            root: classes.textFieldInputWrapper,
            input: classes.textFieldInput,
            error: classes.textFieldInputError,
          },
          disableUnderline: true,
        }}
        InputLabelProps={{
          classes: { root: `${classNames(classes.textFieldLabel, classes.label)}` },
          required: false,
        }}
        onChange={handleChange}
        value={values && values.fax}
        name="fax"
        autoComplete="off"
      />
    </div>
    <TextField
      error={touched && touched.country && errors && Boolean(errors.country)}
      select
      disabled
      label="Select a Country"
      id="input"
      InputProps={{
        classes: {
          root: classes.textFieldInputWrapper,
          input: classes.textFieldInput,
          error: classes.textFieldInputError,
          disabled: classes.textFieldInputDisabled,
        },
        disableUnderline: true,
      }}
      InputLabelProps={{
        classes: {
          root: `${classNames(classes.textFieldLabel, classes.label)}`,
        },
        required: true,
      }}
      className={classNames(classes.margin, classes.textField, classes.select)}
      onChange={handleChange}
      value="Canada"
      name="country"
      autoComplete="off"
      SelectProps={{
        MenuProps: {
          className: classes.menu,
        },
      }}
    >
      {countries.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
    <TextField
      error={touched && touched.streetNumber && errors && Boolean(errors.streetNumber)}
      fullWidth
      autoComplete="off"
      helperText={touched && touched.streetNumber && errors && (errors.streetNumber)}
      label="Street #"
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
      value={values && values.streetNumber}
      name="streetNumber"
    />
    <TextField
      error={touched && touched.streetName && errors && Boolean(errors.streetName)}
      fullWidth
      helperText={touched && touched.streetName && errors && (errors.streetName)}
      label="Street Name"
      id="input"
      autoComplete="off"
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
      value={values && values.streetName}
      name="streetName"
    />
    <TextField
      error={touched && touched.unit && errors && Boolean(errors.unit)}
      fullWidth
      helperText={touched && touched.unit && errors && (errors.unit)}
      label="Unit #"
      id="input"
      autoComplete="off"
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
        required: false,
      }}
      onChange={handleChange}
      value={values && values.unit}
      name="unit"
    />
    <div className={classes.flexInputs}>
      <TextField
        classes={{ root: classes.flexInput }}
        error={touched && touched.city && errors && Boolean(errors.city)}
        fullWidth
        autoComplete="off"
        helperText={touched && touched.city && errors && (errors.city)}
        label="City"
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
        value={values && values.city}
        name="city"
      />
      <TextField
        classes={{ root: classes.flexInput }}
        error={touched && touched.province && errors && Boolean(errors.province)}
        select
        autoComplete="off"
        label="Select a province"
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
        value={values && values.province}
        name="province"
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
      >
        {provinces.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
    <TextField
      error={touched && touched.postalCode && errors && Boolean(errors.postalCode)}
      fullWidth
      helperText={touched && touched.postalCode && errors && (errors.postalCode)}
      label="Postal Code"
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
      value={values && values.postalCode}
      name="postalCode"
      autoComplete="off"
    />
    <FormControl
      error={Boolean(networkError)}
    >
      <FormHelperText>
        {networkError}
      </FormHelperText>
    </FormControl>
  </div>
);

BrokerageOfficeInputC.defaultProps = {
  values: {},
  touched: {},
  errors: {},
  handleChange: noop,
};

export default withStyles(styles, { withTheme: true })(BrokerageOfficeInputC);
