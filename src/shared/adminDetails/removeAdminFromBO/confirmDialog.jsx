import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import { compose } from '../../../utility';
import { withDialog } from '../../dialog/withDialog';
import c from '../constants';
import styles from './confirmDialog.styles';

type Props = {
  classes: Object,
  closeDialog: Function,
  adminName: string,
  onSubmit: Function,
};

class ConfirmDialogC extends React.PureComponent<Props, null> {

  onHandleSubmit = () => {
    const { closeDialog, onSubmit } = this.props;

    onSubmit();
    closeDialog();
  };

  render() {
    const {
      classes, closeDialog, adminName,
    } = this.props;

    return (
      <React.Fragment>
        <DialogTitle classes={{ root: classes.dialogTitle }} disableTypography>{c.REMOVE_ADMIN}</DialogTitle>
        <DialogContent classes={{ root: classes.dialogContent }}>
          {
            <FormattedMessage
              id="remove-admin-confirmation"
              defaultMessage={'Are you sure you want to remove {adminName} from this brokerage? '
              + 'They will no longer have admin access to this brokerage office.'}
              values={{ adminName }}
            />
          }
        </DialogContent>
        <DialogActions classes={{ root: classes.dialogActions, action: classes.dialogAction }}>
          <Button variant="raised" color="default" onClick={closeDialog}>{c.CANCEL}</Button>
          <Button variant="raised" color="primary" onClick={this.onHandleSubmit} type="submit">{c.CONFIRM}</Button>
        </DialogActions>
      </React.Fragment>
    );
  }

}

export default compose(
  withStyles(styles, { withTheme: true }),
  withDialog,
)(ConfirmDialogC);
