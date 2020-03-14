import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DocumentPicker from '../../../shared/documentPicker/documentPicker';
import { withAddDocument } from '../api/document.service';
import DialogButtonTop from '../../../shared/dialogButtonTop/dialogButtonTop';
import styles from '../../../shared/documentPicker/documentPicker.styles';
import c from '../constants';
import { compose } from '../../../utility';
import { withDialog } from '../../../shared/dialog/withDialog';

type Props = {
  closeDialog: Function,
  addDocument: Function,
  transactionId: string,
}

const DialogTransactionC = ({ addDocument, closeDialog, transactionId }: Props) => {
  const addDocuments = async (documents) => {
    documents.map(async (document) => {
      const err = await addDocument({ transactionId, document });
      if (err) {
        // TODO - display network error
      }
    });
  };

  const handleAdd = ({ formPick }) => {
    addDocuments(formPick).then(() => closeDialog());
  };

  return (
    <DialogButtonTop
      title="Add Forms"
      actionButtonText="Add"
      onSubmit={handleAdd}
      validate={(values) => {
        const errors = {};

        if (values.formPick.length === 0) {
          errors.formPick = c.NO_FORM_SELECTED;
        }
        return errors;
      }}
      initialValues={{ formPick: [] }}
      content={<DocumentPicker />}
    />
  );

};

export default compose(
  withAddDocument,
  withDialog,
  withStyles(styles, { withTheme: true }),
)(DialogTransactionC);
