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
import PhoneNumberInput from '../../shared/maskedInputs/phoneNumberInput';
import { withAddBrokerage } from './api/brokerages.service';
import styles from './brokerageInput.styles';
import c from './constants';
import { compose, pro, get } from '../../utility';
import { errParser } from '../../api-error-parser';
import { brokerageAddressValidationSchema } from '../../validation/validationSchemas';
import validator from '../../validation/helpers';

type PropType = {
  name?: string,
  phone?: string,
  fax?: string,
  streetNumber?: string,
  streetName?: string,
  unit?: number,
  city?: string,
  province?: string,
  postalCode?: string,
  nextForm: Function,
  createSnackbar: Function,
  addBrokerage: Function,
  setBrokerage: Function,
  classes: Object,
  closeDialog: Function,
};

type StateType = {
  networkError: React.Node,
}
class BrokerageOfficeInputC extends React.Component<PropType, StateType> {

  static defaultProps = {
    name: '',
    phone: '',
    fax: '',
    streetNumber: '',
    streetName: '',
    unit: '',
    city: '',
    province: '',
    postalCode: '',
  };

  state = {
    networkError: '',
  };

  createBO = async ({
    name,
    phone,
    fax,
    country,
    streetNumber,
    streetName,
    unit,
    city,
    province,
    postalCode,
  }: {
      name?: string,
      phone?: string,
      fax?: string,
      country?: string, //eslint-disable-line
      streetNumber?: ?string,
      streetName?: string,
      unit?: number,
      city?: string,
      province?: string,
      postalCode?: string,
    }) => {
    const { addBrokerage } = this.props;

    this.setState({
      networkError: '',
    });

    const address = {
      unit,
      streetNumber,
      streetName,
      city,
      province,
      postalCode,
      country,
    };

    const [err, res] = await pro(addBrokerage({
      brokerageName: name,
      phone,
      fax,
      address,
    }));
    if (err) {
      const parsedErr = errParser.parse(err);
      this.setState({ networkError: get(parsedErr, 'global') });
    } else {
      const newBrokerage = res.data.createBrokerage;
      this.props.setBrokerage(newBrokerage);
      this.props.createSnackbar(c.SUCCESS_CREATE_BROKERAGE);
      this.props.nextForm();
    }

  };

  render() {
    const {
      classes,
      closeDialog,
      name,
      phone,
      fax,
      streetNumber,
      streetName,
      unit,
      city,
      province,
      postalCode,
    } = this.props;

    const {
      networkError,
    } = this.state;

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

    return (
      <Formik
        initialValues={{
          name,
          phone,
          fax,
          country: 'Canada',
          streetNumber,
          streetName,
          unit,
          city,
          province,
          postalCode,
        }}
        onSubmit={this.createBO}
        validate={(values) => {
          const validationResult = validator(values, brokerageAddressValidationSchema);
          return validationResult.errors;
        }}
        render={({
          values, touched, errors, handleSubmit, handleChange,
        }) => (
          <form onSubmit={handleSubmit} autoComplete="off">
            <DialogTitle
              classes={{
                root: classes.dialogTitle,
              }}
              disableTypography
            >
              {<span>{c.NEW_BO}</span>}
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
                error={touched.name && Boolean(errors.name)}
                fullWidth
                helperText={touched.name && (errors.name)}
                label="Brokerage Office Name"
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
                value={values.name}
                name="name"
                autoComplete="off"
              />
              <div className={classes.flexInputs}>
                <TextField
                  classes={{ root: classes.flexInput }}
                  error={touched.phone && Boolean(errors.phone)}
                  fullWidth
                  helperText={touched.phone && (errors.phone)}
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
                  value={values.phone}
                  name="phone"
                  autoComplete="off"
                />
                <TextField
                  classes={{ root: classes.flexInput }}
                  error={touched.fax && Boolean(errors.fax)}
                  fullWidth
                  helperText={touched.fax && (errors.fax)}
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
                  value={values.fax}
                  name="fax"
                  autoComplete="off"
                />
              </div>
              <TextField
                error={touched.country && Boolean(errors.country)}
                helperText={touched.country && (errors.country)}
                select
                disabled
                label="Select a Country"
                id="input"
                autoComplete="off"
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
                error={touched.streetNumber && Boolean(errors.streetNumber)}
                fullWidth
                helperText={touched.streetNumber && (errors.streetNumber)}
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
                value={values.streetNumber || ''}
                name="streetNumber"
                autoComplete="off"
              />
              <TextField
                error={touched.streetName && Boolean(errors.streetName)}
                fullWidth
                helperText={touched.streetName && (errors.streetName)}
                label="Street Name"
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
                value={values.streetName}
                name="streetName"
                autoComplete="off"
              />
              <TextField
                error={touched.unit && Boolean(errors.unit)}
                fullWidth
                helperText={touched.unit && (errors.unit)}
                label="Unit #"
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
                  required: false,
                }}
                onChange={handleChange}
                value={values.unit}
                name="unit"
                autoComplete="off"
              />
              <div className={classes.flexInputs}>
                <TextField
                  classes={{ root: classes.flexInput }}
                  error={touched.city && Boolean(errors.city)}
                  fullWidth
                  helperText={touched.city && (errors.city)}
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
                  value={values.city}
                  name="city"
                  autoComplete="off"
                />
                <TextField
                  classes={{ root: classes.flexInput }}
                  error={touched.province && Boolean(errors.province)}
                  helperText={touched.province && (errors.province)}
                  autoComplete="off"
                  select
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
                  value={values.province}
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
                error={touched.postalCode && Boolean(errors.postalCode)}
                fullWidth
                helperText={touched.postalCode && (errors.postalCode)}
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
                value={values.postalCode}
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
            </DialogContent>
            <DialogActions
              classes={{
                root: classes.dialogActions,
                action: classes.dialogAction,
              }}
            >
              <Button variant="raised" color="default" onClick={closeDialog}>Cancel</Button>
              <Button variant="raised" color="primary" type="submit">{c.CREATE_CONT}</Button>
            </DialogActions>
          </form>
        )}
      />
    );
  }

}

export default compose(
  withAddBrokerage,
  withStyles(styles, { withTheme: true }),
)(BrokerageOfficeInputC);
