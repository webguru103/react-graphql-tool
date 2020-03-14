import React from 'react';
import DialogButtonBottom from '../../../shared/dialogButtonBottom/dialogButtonBottom';
import { withDeleteTransaction } from '../api/transaction.service';
import { compose, pro } from '../../../utility';
import c from '../constants';
import type { TransactionType } from '../flowTypes';
import { withDialog } from '../../../shared/dialog/withDialog';

type Props = {
  transaction: TransactionType,
  deleteTransaction: Function,
  closeDialog: Function
}

export class DeleteTransactionDialogC extends React.Component<Props, *> {

  state = {
    networkError: '',
  };

  delete = async () => {
    const { transaction, closeDialog, deleteTransaction } = this.props;
    const [err] = await pro(deleteTransaction({ id: transaction.id }));

    if (err) {
      this.setState({
        networkError: c.ERROR_DELETING_TRANSACTION,
      });
    } else {
      closeDialog();
    }
  };

  render() {
    const { transaction } = this.props;
    return (
      <DialogButtonBottom
        title="Delete Item"
        content={
         (
           <div>
             <div>{`Are you sure you want to delete ${transaction.name} and its subitems?`}</div>
             {this.state.networkError && <div style={{ marginTop: '10px', color: '#f44336' }}>{this.state.networkError}</div>}
           </div>
        )}
        actionButtonText="Continue"
        onSubmit={this.delete}
      />
    );
  }

}

export default compose(
  withDeleteTransaction,
  withDialog,
)(DeleteTransactionDialogC);
