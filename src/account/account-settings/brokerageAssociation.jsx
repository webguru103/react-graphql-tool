import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { withHandleBrokerageInvitation } from './api/accountSettings.service';
import styles from './brokerageAssociation.styles';
import BrokerageConfirmationDialog from './brokerageConfirmationDialog';
import BrokerageInfo from './brokerageInfo';
import BrokerageInvitation from './brokerageInvitation';
import type { InviteType } from '../../flowTypes';
import { compose } from '../../utility';
import { withDialog } from '../../shared/dialog/withDialog';
import { withSnackbar } from '../../shared/snackbar/withSnackbar';
import { withUpdateUserState } from '../../shared/authorization/userConsumer';
import { INVITATION_ACTION } from '../../constants';

type Props = {
  brokerage: Object,
  invites: Array<InviteType>,
  createDialog: Function,
  closeDialog: Function,
  classes: Object,
  handleBrokerageInvitation: Function,
  updateInvites: Function,
};

type State = {
  action: string,
  errorMessage: string,
}
class BrokerageAssociation extends React.PureComponent<Props, State> {

  state = {
    action: '',
    errorMessage: '',
  };

  handleConfirmDialogOpen = (dialogContent: string, brokerageInvitation: string, action: string, title: string) => {
    this.setState({ action });
    this.props.createDialog({
      dialogContent: <BrokerageConfirmationDialog
        brokerageName={brokerageInvitation}
        dialogContent={dialogContent}
        actionButtonText={action}
        title={title}
        handleBrokerageResponse={this.handleBrokerageResponse}
      />,
    });
  };

  handleBrokerageResponse = async (id: string) => {
    switch (this.state.action) {
      case 'Accept':
        try {
          await this.props.handleBrokerageInvitation(id, INVITATION_ACTION.ACCEPT);
          this.props.closeDialog();
          this.props.updateInvites();
        } catch (error) {
          this.setState({ errorMessage: 'Failed to accept brokerage invitation' });
        }
        break;
      case 'Reject':
        try {
          await this.props.handleBrokerageInvitation(id, INVITATION_ACTION.REJECT);
          this.props.closeDialog();
          this.props.updateInvites();
        } catch (error) {
          this.setState({ errorMessage: 'Failed to accept brokerage invitation' });
        }
        break;
      default:
        break;
    }
  };

  renderInvitations = () => {
    const { invites } = this.props;

    const invitesDiv = invites.map(invite => (
      <BrokerageInvitation
        key={invite.id}
        invite={invite}
        handleConfirmDialogOpen={this.handleConfirmDialogOpen}
        errorMessage={this.state.errorMessage}
      />
    ));
    return invitesDiv;
  };

  render() {
    const {
      brokerage, invites, classes,
    } = this.props;

    return (
      <div className={classes.root}>
        {
          (invites.length === 0) && !brokerage
            && (
              <React.Fragment>
                <Typography>
                  <FormattedMessage
                    id="no-bo"
                    defaultMessage="You are currently not managed by any brokerage office in DealTap.
                    If your brokerage office is also using DealTap, you can ask the managers to invite you to join them."
                  />

                </Typography>
              </React.Fragment>
            )
        }
        {
          (invites.length > 0) && !brokerage
            && (
              <div>
                <Typography>
                  <FormattedMessage
                    id="bo-invites"
                    defaultMessage="You have an invite to join a brokerage office.
                    If you accept the invitation, the brokerage office will manage your account."
                  />
                </Typography>
                {this.renderInvitations()}
              </div>
            )
        }
        {
          brokerage
            && (
              <div>
                <Typography>
                  <FormattedMessage id="bo" defaultMessage="You are under the direct management of this brokerage office." />
                </Typography>
                <BrokerageInfo brokerage={brokerage} />
              </div>
            )
        }
      </div>
    );
  }

}
export default compose(
  withStyles(styles, { withTheme: true }),
  withDialog,
  withHandleBrokerageInvitation,
  withUpdateUserState,
  withSnackbar,
)(BrokerageAssociation);
