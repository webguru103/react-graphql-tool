import * as yup from 'yup';

function getErrorsFromValidationError(validationError: Object) {
  const FIRST_ERROR = 0;
  return validationError.inner.reduce((errors, error) => ({
    ...errors,
    [error.path]: error.errors[FIRST_ERROR],
  }), {});
}

// TODO: If we discover validationError is not ever needed, remove it from object return in validator()
// validator takes in the input fields and the schema, and sends back an errors object that can be used by Formik
export default function validator(input: Object, schema: Object) {
  try {
    yup.object().shape(schema).validateSync(input, { abortEarly: false });
    return { errors: {}, validationError: null };
  } catch (error) {
    return {
      errors: getErrorsFromValidationError(error),
      validationError: error,
    };
  }
}
