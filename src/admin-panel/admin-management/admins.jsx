import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InviteNewAdminDialog from '../../shared/inviteAdminToBO/inviteNewAdminDialog';
import NoBrokerageOfficeDialog from '../noBrokerageOfficeDialog';
import { withGetUserAdminBrokerages, withInviteNewAdmin } from '../api/admin.service';
import styles from './admins.styles';
import type { BrokerageType } from '../flowTypes';
import { withAppUser } from '../../shared/authorization/userConsumer';
import { compose } from '../../utility';
import { withDialog } from '../../shared/dialog/withDialog';
import ViewAdmins from './viewAdmins';
import { withSnackbar } from '../../shared/snackbar/withSnackbar';
import messages from './constants';

type Props = {
  classes: Object,
  createDialog: Function,
  inviteNewAdmin: ({ email: string, firstName: string, lastName: string, brokerageId: number}) => Promise<Object>,
  closeDialog: () => void,
  createSnackbar: (React.Element | string) => void,
};

class AdminsC extends React.PureComponent<Props, { brokerages: Array<BrokerageType> }> {

  static getDerivedStateFromProps(props) {
    if (props.brokerages.length) {
      return {
        brokerages: props.brokerages,
      };
    }
    return null;
  }

  state = {
    brokerages: [],
  };

  render() {
    const {
      classes, createDialog, inviteNewAdmin, closeDialog, createSnackbar,
    } = this.props;
    const { brokerages } = this.state;
    return (
      <div>
        <div className={classes.nav}>
          <Button
            variant="raised"
            color="primary"
            onClick={() => createDialog({
              dialogContent: brokerages.length
                ? (
                  <InviteNewAdminDialog
                    brokerages={brokerages}
                    inviteNewAdmin={inviteNewAdmin}
                    closeDialog={closeDialog}
                    onSuccessInvite={() => createSnackbar(messages.SUCCESS_INVITE)}
                  />
                ) : <NoBrokerageOfficeDialog />,
              disableClickOutside: true,
            })}
          >
            Invite New
          </Button>
        </div>
        <ViewAdmins />
      </div>
    );
  }

}

export default compose(
  withAppUser,
  withGetUserAdminBrokerages,
  withInviteNewAdmin,
  withStyles(styles, { withTheme: true }),
  withDialog,
  withSnackbar,
)(AdminsC);
