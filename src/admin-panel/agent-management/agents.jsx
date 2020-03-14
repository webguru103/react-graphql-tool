import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { withAppUser } from '../../shared/authorization/userConsumer';
import InviteNewAgentDialog from '../../shared/inviteAgentToBO/inviteNewAgentDialog';
import NoBrokerageOfficeDialog from '../noBrokerageOfficeDialog';
import { withGetUserAdminBrokerages, withInviteNewAgent } from '../api/admin.service';
import styles from './agents.styles';
import type { BrokerageType } from '../../flowTypes';
import { compose } from '../../utility';
import { withDialog } from '../../shared/dialog/withDialog';
import { withSnackbar } from '../../shared/snackbar/withSnackbar';
import c from './constants';
import ViewAgents from './viewAgents';

type Props = {
  classes: Object,
  createDialog: Function,
  inviteNewAgent: ({ email: string, resourceId: string }) => Promise<Object>,
  closeDialog: () => void,
  createSnackbar: (string | React.Element) => void,
};

class AgentsC extends React.PureComponent<Props, { brokerages: Array<BrokerageType> }> {

  static getDerivedStateFromProps(props) {
    // TODO Stepan: spot weird issue with brokerages being empty when viewAgens
    // query is called, need to investigate
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
      classes, createDialog, inviteNewAgent, closeDialog, createSnackbar,
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
                  <InviteNewAgentDialog
                    brokerages={brokerages}
                    inviteNewAgent={inviteNewAgent}
                    closeDialog={closeDialog}
                    onSuccessInvite={successInvites => createSnackbar(c.INVITES_SUCCESSFULY_SENT(successInvites))}
                  />
                ) : <NoBrokerageOfficeDialog />,
              disableClickOutside: true,
            })}
          >
            Invite New
          </Button>
        </div>
        <ViewAgents />
      </div>
    );
  }

}

export default compose(
  withSnackbar,
  withInviteNewAgent,
  withAppUser,
  withGetUserAdminBrokerages,
  withStyles(styles, { withTheme: true }),
  withDialog,
)(AgentsC);
