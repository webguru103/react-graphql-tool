import * as React from 'react';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { compose } from '../../utility';
import { withDialog } from '../../shared/dialog/withDialog';
import { withSnackbar } from '../../shared/snackbar/withSnackbar';
import messages from '../../editor/constants';
import styles from './confirmPublishDialog.styles';
import { withPublishDraftOnForm } from './api/editor.service';
import { errParser } from '../../api-error-parser';

type Props = {
  classes: Object,
  closeDialog: Function,
  createSnackbar: (React.Element) => void,
  formName: string,
  formId: number,
  history: { push: Function },
  publishForm: Function,
};

class ConfirmPublishDialogC extends React.PureComponent<Props, null> {

  onHandleSubmit = async () => {
    const {
      closeDialog, createSnackbar, publishForm, formName, formId, history,
    } = this.props;

    try {
      await publishForm({
        id: formId,
      });
      createSnackbar(
        <FormattedMessage
          id="draft-successfully-published"
          defaultMessage="Draft Published - {formName}"
          values={{
            formName,
          }}
        />,
      );
    } catch (err) {
      const parsedErr = errParser.parse(err);
      createSnackbar(parsedErr);
    }
    closeDialog();
    history.push(`/cp-user/editor/view?formId=${formId}`);
  };

  render() {
    const { classes, closeDialog } = this.props;

    return (
      <React.Fragment>
        <DialogTitle classes={{ root: classes.dialogTitle }} disableTypography>{messages.CONFIRM_PUBLISH}</DialogTitle>
        <DialogContent classes={{ root: classes.dialogContent }}>
          {messages.CONFIRM_PUBLISH_MESSAGE}
        </DialogContent>
        <DialogActions classes={{ root: classes.dialogActions, action: classes.dialogAction }}>
          <Button variant="raised" color="default" onClick={closeDialog}>{messages.CANCEL}</Button>
          <Button
            variant="raised"
            color="primary"
            onClick={this.onHandleSubmit}
            type="submit"
            data-testid="publish-button"
          >
            {messages.PUBLISH}
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }

}

export default compose(
  withStyles(styles, { withTheme: true }),
  withRouter,
  withDialog,
  withSnackbar,
  withPublishDraftOnForm,
)(ConfirmPublishDialogC);
