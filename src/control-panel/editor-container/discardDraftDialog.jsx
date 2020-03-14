import * as React from 'react';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { compose, pro } from '../../utility';
import { withDialog } from '../../shared/dialog/withDialog';
import { withSnackbar } from '../../shared/snackbar/withSnackbar';
import messages from '../../editor/constants';
import styles from './discardDraftDialog.styles';
import { withDiscardDraft } from './api/editor.service';
import { errParser } from '../../api-error-parser';

type Props = {
  classes: Object,
  closeDialog: Function,
  createSnackbar: (React.Element) => void,
  formName: string,
  formId: number,
  discardDraft: Function,
  refreshForm: () => void,
};

class DiscardDraftDialogC extends React.PureComponent<Props, null> {

  onHandleSubmit = async () => {
    const {
      closeDialog, createSnackbar, discardDraft, formName, formId, refreshForm,
    } = this.props;

    const [err, returnedData] = await pro(discardDraft({
      id: formId,
    }));

    if (err) {
      const parsedErr = errParser.parse(err);
      createSnackbar(parsedErr);
    }

    if (returnedData) {
      createSnackbar(messages.DRAFT_DISCARDED_SUCCESSFULLY(formName));
      closeDialog();
      refreshForm();
    }
  };

  render() {
    const { classes, closeDialog } = this.props;

    return (
      <React.Fragment>
        <DialogTitle classes={{ root: classes.dialogTitle }} disableTypography>{messages.CONFIRM_DISCARD}</DialogTitle>
        <DialogContent classes={{ root: classes.dialogContent }}>
          {messages.CONFIRM_DISCARD_MESSAGE}
        </DialogContent>
        <DialogActions classes={{ root: classes.dialogActions, action: classes.dialogAction }}>
          <Button variant="raised" color="default" onClick={closeDialog}>{messages.CANCEL}</Button>
          <Button
            variant="raised"
            color="primary"
            onClick={this.onHandleSubmit}
            type="submit"
            data-testid="discard-button"
          >
            {messages.DISCARD}
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }

}

export default compose(
  withRouter,
  withStyles(styles, { withTheme: true }),
  withDialog,
  withSnackbar,
  withDiscardDraft,
)(DiscardDraftDialogC);
