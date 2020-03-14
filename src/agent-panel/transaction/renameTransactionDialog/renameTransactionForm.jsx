import * as React from 'react';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import styles from './renameTransactionForm.styles';
import { noop } from '../../../utility';

type Props = {
  classes: Object,
  values?: Object,
  errors?: {name: string},
  handleChange?: Function,
  networkError: React.Node
}

const RenameTransactionC = ({
  classes, values, errors, handleChange, networkError,
}: Props) => (
  <TextField
    error={Boolean((errors && errors.name) || networkError)}
    fullWidth
    helperText={(errors && errors.name) || networkError}
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
    }}
    onChange={handleChange}
    value={values && values.name}
    name="name"
  />
);

RenameTransactionC.defaultProps = {
  errors: {
    name: '',
  },
  values: {
    name: '',
  },
  handleChange: noop,
};

export default withStyles(styles, { withTheme: true })(RenameTransactionC);
