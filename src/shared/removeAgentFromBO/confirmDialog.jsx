import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import { compose } from '../../utility';
import { withDialog } from '../dialog/withDialog';
import c from './constants';
import styles from './confirmDialog.styles';

type Props = {
  classes: Object,
  closeDialog: Function,
  agentName: string,
  brokerageName: string,
  onSubmit: Function,
};

class ConfirmDialogC extends React.PureComponent<Props, *> {

  onHandleSubmit = () => {
    const { closeDialog, onSubmit } = this.props;

    onSubmit();
    closeDialog();
  };

  render() {
    const {
      classes, closeDialog, agentName, brokerageName,
    } = this.props;

    return (
      <React.Fragment>
        <DialogTitle classes={{ root: classes.dialogTitle }} disableTypography>{c.REMOVE_AGENT}</DialogTitle>
        <DialogContent classes={{ root: classes.dialogContent }}>
          {
            <FormattedMessage
              id="remove-agent-confirmation"
              defaultMessage={'Are you sure you want to remove {agentName} from {brokerageName}?'}
              values={{ agentName, brokerageName }}
            />
          }
        </DialogContent>
        <DialogActions classes={{ root: classes.dialogActions, action: classes.dialogAction }}>
          <Button variant="raised" color="default" onClick={closeDialog} testId="cancel-button">{c.CANCEL}</Button>
          <Button variant="raised" color="primary" onClick={this.onHandleSubmit} testId="submit-button" type="submit">{c.CONFIRM}</Button>
        </DialogActions>
      </React.Fragment>
    );
  }

}

export default compose(
  withStyles(styles, { withTheme: true }),
  withDialog,
)(ConfirmDialogC);
