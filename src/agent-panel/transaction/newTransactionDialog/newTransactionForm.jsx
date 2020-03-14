import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DocumentPicker from '../../../shared/documentPicker/documentPicker';
import styles from './newTransactionForm.styles';
import { noop } from '../../../utility';

type PropType = {
  classes: Object,
  values?: {
    transactionName: string,
  },
  errors?: {
    transactionName: string,
  },
  handleChange?: Function,
}

const NewTransactionFormC = ({
  classes, values, errors, handleChange,
}: PropType) => (
  <React.Fragment>
    <Paper className={classes.nameInput} elevation={0}>
      <TextField
        label="Transaction Name"
        className={classes.nameInputField}
        value={values && values.transactionName}
        onChange={handleChange}
        margin="normal"
        name="transactionName"
        error={Boolean(errors && errors.transactionName)}
        helperText={errors && errors.transactionName}
      />
    </Paper>
    <DocumentPicker values={values || {}} errors={errors || {}} handleChange={handleChange} />
  </React.Fragment>
);

NewTransactionFormC.defaultProps = {
  values: {
    transactionName: '',
  },
  errors: {
    transactionName: '',
  },
  handleChange: noop,
};

export default withStyles(styles)(NewTransactionFormC);
