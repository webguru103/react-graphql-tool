import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InviteNewAgentDialog from '../../shared/inviteAgentToBO/inviteNewAgentDialog';
import ViewAgents from './viewAgents';
import { withGetAllBrokerages, withInviteNewAgent } from './api/agents.service';
import styles from './agents.styles';
import type { BrokerageType } from '../../flowTypes';
import { compose } from '../../utility';
import { withDialog } from '../../shared/dialog/withDialog';
import { withSnackbar } from '../../shared/snackbar/withSnackbar';
import c from './constants';

type Props = {
  classes: Object,
  createDialog: Function,
  brokerages: Array<BrokerageType>,
  closeDialog: () => {},
  inviteNewAgent: ({ email: string, resourceId: number}) => Promise<Object>,
  createSnackbar: (React.Element) => void,
};

const AgentsC = ({
  classes, createDialog, brokerages, closeDialog, inviteNewAgent, createSnackbar,
}: Props) => (
  <React.Fragment>
    <div className={classes.nav}>
      <Button
        variant="raised"
        color="primary"
        onClick={() => createDialog({
          dialogContent:
            (
              <InviteNewAgentDialog
                brokerages={brokerages}
                closeDialog={closeDialog}
                inviteNewAgent={inviteNewAgent}
                onSuccessInvite={successInvites => createSnackbar(c.INVITES_SUCCESSFULY_SENT(successInvites))}
              />
            ),
          disableClickOutside: true,
        })}
      >
        Invite New
      </Button>
    </div>
    <ViewAgents />
  </React.Fragment>
);

export default compose(
  withGetAllBrokerages,
  withInviteNewAgent,
  withStyles(styles, { withTheme: true }),
  withDialog,
  withSnackbar,
)(AgentsC);
