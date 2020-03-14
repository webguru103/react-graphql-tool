import React from 'react';
import { Field } from 'formik';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Input from '@material-ui/core/Input/Input';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';
import FormControl from '@material-ui/core/FormControl/FormControl';

type ConnectedFieldPropType = {
  name: string,
  cleanApiError: (string) => void,
  label: string,
  apiError: ?{[string]: string}
};

const ConnectedField = ({
  name, cleanApiError, label, apiError,
}: ConnectedFieldPropType) => (
  <Field name={name}>
    {
      ({
        form: {
          handleChange, errors, values, touched,
        }, field: { name: fieldName },
      }) => (
        <FormControl error={touched[name] && Boolean(errors[fieldName] || apiError)}>
          {
            label && <InputLabel htmlFor={fieldName}>{label}</InputLabel>
          }
          <Input
            id={fieldName}
            value={values[fieldName] || ''}
            name={fieldName}
            onChange={(e) => {
              if (apiError && cleanApiError) {
                cleanApiError(fieldName);
              }
              handleChange(e);
            }}
          />
          <FormHelperText
            id={`${fieldName}-helperText`}
          >
            {touched[fieldName] && (errors[fieldName] || apiError)}
          </FormHelperText>
        </FormControl>
      )
    }
  </Field>
);

export default ConnectedField;
