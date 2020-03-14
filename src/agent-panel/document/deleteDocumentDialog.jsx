import React from 'react';
import DialogButtonBottom from '../../shared/dialogButtonBottom/dialogButtonBottom';
import { withDeleteDocument } from './api/document.service';
import { compose, pro } from '../../utility';
import c from './constants';
import type { DocumentType } from './flowTypes';
import { withDialog } from '../../shared/dialog/withDialog';

type Props = {
  document: DocumentType,
  deleteDocument: Function,
  closeDialog: Function,
  transactionId: String,
}

export class DeleteDocumentDialogC extends React.Component<Props, *> {

  state = {
    networkError: '',
  };

  delete = async () => {
    const {
      document,
      deleteDocument,
      closeDialog,
      transactionId,
    } = this.props;

    const [err] = await pro(deleteDocument({ id: document.id, transactionId }));

    if (err) {
      this.setState({
        networkError: c.ERROR_DELETING_DOCUMENT,
      });
    } else {
      closeDialog();
    }
  };

  render() {
    return (
      <DialogButtonBottom
        title="Delete Item"
        content={(
          <div>
            <div>Are you sure you want to delete this document?</div>
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
  withDeleteDocument,
  withDialog,
)(DeleteDocumentDialogC);
