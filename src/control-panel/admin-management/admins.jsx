import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InviteNewAdminDialog from '../../shared/inviteAdminToBO/inviteNewAdminDialog';
import ViewAdmins from './viewAdmins';
import { withGetAllBrokerages, withInviteNewAdmin } from './api/admins.service';
import styles from './admins.styles';
import type { BrokerageType } from './flowTypes';
import { compose } from '../../utility';
import { withDialog } from '../../shared/dialog/withDialog';
import c from './constants';
import { withSnackbar } from '../../shared/snackbar/withSnackbar';

type Props = {
  classes: Object,
  createDialog: Function,
  brokerages: Array<BrokerageType>,
  closeDialog: () => {},
  inviteNewAdmin: ({ email: string, firstName: string, lastName: string, brokerageId: number}) => Promise<Object>,
  createSnackbar: (React.Element) => void,
};

const AdminsC = ({
  classes, createDialog, brokerages, closeDialog, inviteNewAdmin, createSnackbar,
}: Props) => (
  <div>
    <div className={classes.nav}>
      {
        brokerages
        && (
        <Button
          variant="raised"
          color="primary"
          onClick={() => createDialog({
            dialogContent:
              (<InviteNewAdminDialog
                brokerages={brokerages}
                closeDialog={closeDialog}
                inviteNewAdmin={inviteNewAdmin}
                onSuccessInvite={() => createSnackbar(c.SUCCESSFULLY_INVITED)}
              />),
            disableClickOutside: true,
          })}
        >
          Invite New
        </Button>
        )
      }
    </div>
    <ViewAdmins />
  </div>
);

export default compose(
  withInviteNewAdmin,
  withGetAllBrokerages,
  withStyles(styles, { withTheme: true }),
  withDialog,
  withSnackbar,
)(AdminsC);
