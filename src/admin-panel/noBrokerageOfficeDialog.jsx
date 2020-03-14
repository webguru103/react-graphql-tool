import * as React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from './noBrokerageOfficeDialog.styles';
import { compose } from '../utility';
import { withDialog } from '../shared/dialog/withDialog';

type Props = {
  classes: Object,
  closeDialog: Function,
};

const NoBrokerageOfficeDialogC = ({ classes, closeDialog }: Props) => (
  <React.Fragment>
    <DialogContent classes={{ root: classes.dialogContent }}>
      <Typography variant="body2" align="center" paragraph>You do not have any Brokerage Office yet.</Typography>
      <Typography>Please contact DealTap or other brokerage office to invite you first.</Typography>
    </DialogContent>
    <DialogActions
      classes={{
        root: classes.dialogActions,
        action: classes.dialogAction,
      }}
    >
      <Button variant="raised" color="primary" onClick={closeDialog}>OK</Button>
    </DialogActions>
  </React.Fragment>
);

export default compose(
  withStyles(styles, { withTheme: true }),
  withDialog,
)(NoBrokerageOfficeDialogC);
