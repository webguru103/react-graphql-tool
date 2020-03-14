import React from 'react';
import { withStyles } from '@material-ui/core';
import DialogButtonBottom from '../../shared/dialogButtonBottom/dialogButtonBottom';
import { compose } from '../../utility';
import { withDialog } from '../../shared/dialog/withDialog';
import type { TransactionSession } from '../api/fragments/transactionSession';
import styles from './emailContentDialog.styles';

type Props = {
  session: TransactionSession,
  closeDialog: () => void,
  classes: Object,
}

const EmailContentDialogC = ({
  classes, session, closeDialog,
}: Props) => (
  <DialogButtonBottom
    title="Email Content"
    content={
      (
        <div className={classes.dialogContainer}>
          <div>
            <div className={classes.label}>Email Title</div>
            <div className={classes.content}>{session.emailTitle || ''}</div>
          </div>
          <div className={classes.mainContent}>
            <div className={classes.label}>Email Content</div>
            <div className={classes.content}>{session.emailBody || 'Empty'}</div>
          </div>
        </div>
      )}
    actionButtonText="Close"
    isButtonCancel={false}
    isCloseIcon={false}
    onSubmit={closeDialog}
  />
);

export default compose(
  withDialog,
  withStyles(styles),
)(EmailContentDialogC);
