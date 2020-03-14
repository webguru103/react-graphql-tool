import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormattedMessage } from 'react-intl';
import Button from '../../shared/button/button';
import { compose } from '../../utility';
import { withDialog } from '../../shared/dialog/withDialog';
import c from '../constants';
import styles from './confirmMultiDeleteDialog.styles';

type Props = {
  classes: Object,
  closeDialog: Function,
  onSubmit: Function,
  numFields: number,
};

class ConfirmMultiDeleteDialogC extends React.PureComponent<Props, null> {

  onHandleSubmit = () => {
    const {
      closeDialog,
      onSubmit,
    } = this.props;

    onSubmit();
    closeDialog();
  };

  render() {
    const {
      classes, closeDialog, numFields,
    } = this.props;

    return (
      <div className="fieldOutClick">
        <DialogTitle classes={{ root: classes.dialogTitle }} disableTypography>{c.DELETE_FIELDS}</DialogTitle>
        <DialogContent classes={{ root: classes.dialogContent }}>
          {
            <FormattedMessage
              id="remove-fields-confirmation"
              defaultMessage={'Are you sure you want to delete {numFields} fields at once?'}
              values={{ numFields }}
            />
          }
        </DialogContent>
        <DialogActions classes={{ root: classes.dialogActions, action: classes.dialogAction }}>
          <Button
            secondary
            classes={{
              button: classes.actionButtons,
            }}
            onClick={closeDialog}
          >
            {c.CANCEL}
          </Button>
          <Button
            classes={{
              button: classes.actionButtons,
            }}
            autoFocus
            primary
            onClick={this.onHandleSubmit}
            type="submit"
            data-testid="confirm-fields-delete"
          >
            {c.CONFIRM}
          </Button>
        </DialogActions>
      </div>
    );
  }

}

export default compose(
  withStyles(styles, { withTheme: true }),
  withDialog,
)(ConfirmMultiDeleteDialogC);
