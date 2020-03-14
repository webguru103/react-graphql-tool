import React, { Component, Fragment } from 'react';
import DialogButtonBottom from '../../../shared/dialogButtonBottom/dialogButtonBottom';
import { withRenameTransaction } from '../api/transaction.service';
import RenameForm from './renameTransactionForm';
import { compose, pro } from '../../../utility';
import c from '../constants';
import type { TransactionType } from '../flowTypes';
import { withDialog } from '../../../shared/dialog/withDialog';

type Props = {
  transaction?: TransactionType,
  renameTransaction: Function,
  closeDialog: Function,
}

export class RenameTransactionDialogC extends Component<Props, *> {

  static defaultProps = {
    transaction: {
      id: '',
      name: '',
    },
  };

  state = {
    networkError: '',
  };

  rename = async ({ name }: { name: string } = {}) => {
    const { transaction, closeDialog, renameTransaction } = this.props;

    const [err] = await pro(renameTransaction({ newName: name, id: transaction ? transaction.id : '' }));

    if (err) {
      this.setState({
        networkError: c.ERROR_RENAMING_TRANSACTION,
      });
      return;
    }

    this.setState({
      networkError: '',
    });

    closeDialog();
  };

  render() {
    const { transaction } = this.props;
    return (
      <DialogButtonBottom
        title={(
          <Fragment>
            {c.RENAME_ITEM_DIALOG_HEADER}
            {` ${transaction ? transaction.name : ''}`}
          </Fragment>
        )}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = c.ADD_NEW_NAME;
          }

          return errors;
        }}
        initialValues={{ name: (transaction && transaction.name) || '' }}
        content={<RenameForm networkError={this.state.networkError} />}
        actionButtonText={c.RENAME_DIALOG_SUBMIT}
        onSubmit={this.rename}
      />
    );
  }

}

export default compose(
  withRenameTransaction,
  withDialog,
)(RenameTransactionDialogC);
