import * as React from 'react';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router';
import type { RouterHistory, Location } from 'react-router';
import { compose, pro, get } from '../utility';
import { withAcceptInvitation, withInvitedUser } from './api/accountService';
import ExpiredInvitationLink from '../shared/linkExpired/linkExpired';
import AlreadyJoinedABrokerage from './invitedToSignUp/alreadyJoinedABrokerage';
import AlreadyGrantedPermission from './invitedToSignUp/alreadyGrantedPermission';
import PermissionGranted from './invitedToSignUp/permissionGranted';
import FailedToGrantPermission from './invitedToSignUp/failedToGrantPermission';
import JoinedBrokerage from './invitedToSignUp/joinedBrokerage';
import FailedToJoinBrokerage from './invitedToSignUp/failedToJoinBrokerage';
import AlreadyHaveAccess from './invitedToSignUp/alreadyHaveAccess';
import { messages } from './constants';
import styles from './acceptInvitation.styles';
import { INVITATION_ACTION, ROLE_CATEGORY, SYSTEM_ID } from '../constants';
import { errParser } from '../api-error-parser';

type PropType = {
  history: RouterHistory,
  location: Location,
  invitedUser: Function,
  acceptInvitation: Function,
  classes: Object,
}

type StateType = {
  processing: boolean,
  noInviteFound: boolean,
  expired: boolean,
  alreadyHasCPIdentity: boolean,
  alreadyHasAdminIdentity: boolean,
  alreadyHasAgentIdentity: boolean,
  alreadyHasAccessToBO: boolean,
  alreadyJoinedABrokerage: boolean,
  brokeragePermissionGranted: boolean,
  brokerageJoined: boolean,
  brokerageName: string,
  roleName: string,
  error: React.Node,
  errorRetrievingInvite: boolean,
}

class AcceptInvitationC extends React.PureComponent<PropType, StateType> {

  state = {
    processing: true,
    noInviteFound: false,
    expired: false,
    alreadyHasCPIdentity: false,
    alreadyHasAdminIdentity: false,
    alreadyHasAgentIdentity: false,
    alreadyHasAccessToBO: false,
    alreadyJoinedABrokerage: false,
    brokeragePermissionGranted: false,
    brokerageJoined: false,
    brokerageName: '',
    roleName: '',
    error: '',
    errorRetrievingInvite: false,
  };

  componentDidMount() {
    this.acceptInvitation();
  }

  acceptInvitation = async () => {
    const {
      history, location: { search }, invitedUser,
    } = this.props;
    const urlParams = new URLSearchParams(search);
    const inviteId = Number(urlParams.get('inviteId'));
    const brokerageName = urlParams.get('resource');
    const token = urlParams.get('token');

    if (brokerageName) {
      this.setState({ brokerageName });
    }

    const [err, returnedData] = await pro(invitedUser(inviteId, token));
    if (err) {
      const parsedErr = errParser.parse(err);
      if (get(parsedErr, 'global') !== errParser.INVALID_TOKEN) {
        this.setState({
          processing: false,
          errorRetrievingInvite: true,
          error: get(parsedErr, 'global'),
        });
        return;
      }
    }

    const invite = get(returnedData, 'data.invite.nodes.0', null);
    if (!invite) {
      this.setState({ processing: false, noInviteFound: true });
      return;
    }

    if (invite) {

      const expiry = get(invite, 'expiry');

      if (new Date(expiry) < new Date()) {
        this.setState({ processing: false, expired: true });
        return;
      }

      const user = get(invite, 'userByUserId', null);
      const role = get(invite, 'roleByRoleId', {});
      const resourceId = get(invite, 'resourceId');
      const resourceCategory = get(invite, 'resourceCategory');
      const firstName = get(invite, 'firstName', '');
      const lastName = get(invite, 'lastName', '');

      let alreadyHasCPIdentity;
      let alreadyHasAdminIdentity;
      let alreadyHasAgentIdentity;

      const { roleCategory } = role;
      const systems = user && get(user, 'systemAclsByUserId.nodes');

      if (systems && systems.length) {
        if (roleCategory === ROLE_CATEGORY.CP_ADMIN) {
          alreadyHasCPIdentity = Boolean(systems.filter(s => s.systemId === SYSTEM_ID.CONTROL_PANEL).length);
        }
        if (roleCategory === ROLE_CATEGORY.ADMIN) {
          alreadyHasAdminIdentity = Boolean(systems.filter(s => s.systemId === SYSTEM_ID.ADMIN_PANEL).length);
        }
        if (roleCategory === ROLE_CATEGORY.AGENT) {
          alreadyHasAgentIdentity = Boolean(systems.filter(s => s.systemId === SYSTEM_ID.AGENT_PANEL).length);
        }
      }

      if (!user) {
        history.push('/signup/new/0', {
          inviteId,
          resourceCategory,
          resourceId,
          brokerageName,
          role,
          email: get(invite, 'email'),
          firstName,
          lastName,
        });
        return;
      }

      if (alreadyHasCPIdentity) {
        this.setState({ processing: false, alreadyHasCPIdentity: true });
        return;
      }

      if (alreadyHasAdminIdentity) {

        const brokerages = get(user, 'brokerageAclsByUserId.nodes');

        const alreadyHasAccessToBO = Boolean(brokerages.filter(b => b.brokerageId === resourceId).length);

        if (alreadyHasAccessToBO) {
          this.setState({ processing: false, alreadyHasAdminIdentity: true, alreadyHasAccessToBO: true });
        } else {

          try {
            await this.props.acceptInvitation({ id: inviteId, action: INVITATION_ACTION.ACCEPT }, token);

            this.setState({
              processing: false,
              alreadyHasAdminIdentity: true,
              brokeragePermissionGranted: true,
              roleName: role.roleName,
            });
          } catch (errAdmin) {
            const parsedErr = errParser.parse(errAdmin);

            this.setState({
              processing: false,
              alreadyHasAdminIdentity: true,
              error: get(parsedErr, 'global'),
            });
          }
        }
        return;
      }

      if (alreadyHasAgentIdentity) {

        const brokerages = get(user, 'brokerageAclsByUserId.nodes');
        const alreadyJoinedABrokerage = brokerages.length && Boolean(brokerages.filter(b => b.roleCategory === ROLE_CATEGORY.AGENT).length);

        if (alreadyJoinedABrokerage) {
          this.setState({ processing: false, alreadyHasAgentIdentity: true, alreadyJoinedABrokerage: true });
        } else {

          try {

            await this.props.acceptInvitation({ id: inviteId, action: INVITATION_ACTION.ACCEPT }, token);

            this.setState({
              processing: false,
              alreadyHasAgentIdentity: true,
              brokerageJoined: true,
            });

          } catch (errAgent) {
            const parsedErr = errParser.parse(errAgent);

            this.setState({
              processing: false,
              alreadyHasAgentIdentity: true,
              error: get(parsedErr, 'global'),
            });
          }
        }
        return;

      }

      history.push('/signup/existing/0', {
        inviteId,
        resourceCategory,
        resourceId,
        brokerageName,
        role,
        user,
        token,
      });
    }
  };

  render() {
    const { classes } = this.props;
    const {
      processing,
      noInviteFound,
      expired,
      alreadyHasCPIdentity,
      alreadyHasAdminIdentity,
      alreadyHasAgentIdentity,
      alreadyHasAccessToBO,
      alreadyJoinedABrokerage,
      brokeragePermissionGranted,
      brokerageJoined,
      roleName,
      brokerageName,
      error,
      errorRetrievingInvite,
    } = this.state;
    return (
      <div className={classes.screenContainer}>
        <div className={classes.screenContent}>
          {processing && messages.PLEASE_WAIT}
          {!processing && noInviteFound && messages.NO_INVITE_FOUND}
          {!processing && expired && <ExpiredInvitationLink />}
          {!processing && alreadyHasCPIdentity && <AlreadyHaveAccess />}
          {!processing && alreadyHasAdminIdentity && alreadyHasAccessToBO && <AlreadyGrantedPermission brokerageName={brokerageName} />}
          {!processing && alreadyHasAdminIdentity && !alreadyHasAccessToBO && brokeragePermissionGranted
          && <PermissionGranted roleName={roleName} brokerageName={brokerageName} />}
          {!processing && alreadyHasAdminIdentity && !alreadyHasAccessToBO && !brokeragePermissionGranted
          && <FailedToGrantPermission error={error} />
          }
          {!processing && alreadyHasAgentIdentity && !alreadyJoinedABrokerage && brokerageJoined && <JoinedBrokerage brokerageName={brokerageName} />}
          {!processing && alreadyHasAgentIdentity && !alreadyJoinedABrokerage && !brokerageJoined
          && <FailedToJoinBrokerage error={error} />
          }
          {!processing && alreadyHasAgentIdentity && alreadyJoinedABrokerage && <AlreadyJoinedABrokerage />}
          {!processing && errorRetrievingInvite && error }
        </div>
      </div>
    );
  }

}

export default compose(
  withInvitedUser,
  withAcceptInvitation,
  withRouter,
  withStyles(styles, { withTheme: true }),
)(AcceptInvitationC);
