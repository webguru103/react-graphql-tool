import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import NewTransactionForm from './newTransactionForm';
import { withAddTransaction } from '../api/transaction.service';
import DialogButtonTop from '../../../shared/dialogButtonTop/dialogButtonTop';
import styles from '../../../shared/documentPicker/documentPicker.styles';
import c from '../constants';
import { compose } from '../../../utility';
import { withDialog } from '../../../shared/dialog/withDialog';

type Props = {
  closeDialog: Function,
  addTransaction: Function,
}

const DialogTransactionC = ({ addTransaction, closeDialog }: Props) => {

  const handleCreate = ({ transactionName, formPick }) => {
    const ids = formPick.map(form => form.id);
    addTransaction({ name: transactionName, ids });
    closeDialog();
  };

  return (
    <DialogButtonTop
      title="New Transaction"
      actionButtonText="Create"
      onSubmit={handleCreate}
      validate={(values) => {
        const errors = {};
        if (!values.transactionName) {
          errors.transactionName = c.ENTER_TRANSACTION_NAME;
        }

        if (values.formPick.length === 0) {
          errors.formPick = c.NO_FORM_SELECTED;
        }
        return errors;
      }}
      initialValues={{ transactionName: '', formPick: [] }}
      content={<NewTransactionForm />}
    />
  );

};

export default compose(
  withAddTransaction,
  withDialog,
  withStyles(styles, { withTheme: true }),
)(DialogTransactionC);
