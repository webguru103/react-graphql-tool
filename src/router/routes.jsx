import * as React from 'react';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { Dashboard } from '../dashboard';
import LandingAgent from '../agent-panel';
import LandingAdmin from '../admin-panel';
import Account, { AccountSettings, Logout } from '../account';
import Editor from '../editor';
import LandingCpAdmin, { ControlPanelEditor } from '../control-panel';
import Signature from '../signature';
import { withAuthorization } from '../shared/authorization';
import { ENVIRONMENTS } from '../constants';
import { ENVIRONMENT } from '../configurations';
import ShowCase from '../shared/showcase/showcase';
import PageNotFound from '../shared/pageNotFound';
import LinkExpired from '../shared/linkExpired/linkExpired';

const Routes = () => (
  <Switch>
    <Route
      exact
      path="/signup/new/:step"
      component={Account.InvitedToSignUpNew}
    />
    <Route
      exact
      path="/signup/existing/:step"
      component={Account.InvitedToSignUpExisting}
    />
    {/* TODO: Reimplement signup with payment */}
    {/* <Route
      exact
      path="/signup/agent/:step"
      component={Account.AgentSignup}
    /> */}
    <Route
      path="/user-activation"
      component={Account.UserActivation}
    />
    <Route
      path="/forgot-password"
      component={Account.ForgotPassword}
    />
    <Route
      exact
      path="/reset-password"
      component={Account.ResetPassword}
    />
    <Route
      path="/accept"
      component={Account.AcceptInvitation}
    />
    <Route
      path="/reject"
      component={Account.RejectBrokerage}
    />
    <Route
      path="/link-expired"
      component={LinkExpired}
    />
    <Route
      exact
      path="/login"
      component={Account.Login}
    />
    {/* authorized users' routes */}
    <Route
      exact
      path="/"
      component={withAuthorization()(Dashboard)}
    />
    <Route
      exact
      path="/account-settings"
      component={withAuthorization(['admin', 'cp_admin'])(AccountSettings)} // TODO: Re-enable for agents that are not datz users
    />
    <Route
      exact
      path="/logout"
      component={withAuthorization(['admin', 'cp_admin'])(Logout)} // TODO: Re-enable for agents that are not datz users
    />
    {/* cp-admin-specific routes */}
    <Route
      exact
      path="/cp-user/editor"
      component={withAuthorization(['cp_admin'])(ControlPanelEditor.TemplateViewMode)}
    />
    <Route
      exact
      path="/cp-user/editor/view"
      component={withAuthorization(['cp_admin'])(ControlPanelEditor.TemplateViewMode)}
    />
    <Route
      exact
      path="/cp-user/editor/edit"
      component={withAuthorization(['cp_admin'])(ControlPanelEditor.TemplateDraftMode)}
    />
    <Route
      exact
      path="/cp-user"
      component={withAuthorization(['cp_admin'])(LandingCpAdmin.Index)}
    />
    <Route
      exact
      path="/cp-user/admin-management"
      component={withAuthorization(['cp_admin'])(LandingCpAdmin.AdminList)}
    />
    <Route
      exact
      path="/cp-user/agent-management"
      component={withAuthorization(['cp_admin'])(LandingCpAdmin.AgentList)}
    />
    <Route
      exact
      path="/cp-user/cp-user-management"
      component={withAuthorization(['cp_admin'])(LandingCpAdmin.CpUsers)}
    />
    <Route
      exact
      path="/cp-user/brokerage-management/"
      component={withAuthorization(['cp_admin'])(LandingCpAdmin.BrokerageList)}
    />
    <Route
      exact
      path="/cp-user/agent-management/:id"
      component={withAuthorization(['cp_admin'])(LandingCpAdmin.AgentDetails)}
    />
    <Route
      exact
      path="/cp-user/admin-management/:id"
      component={withAuthorization(['cp_admin'])(LandingCpAdmin.AdminDetails)}
    />
    <Route
      exact
      path="/cp-user/cp-user-management/:id"
      component={withAuthorization(['cp_admin'])(LandingCpAdmin.CpUsersDetails)}
    />
    <Route
      exact
      path="/cp-user/brokerage-management/:brokerageId"
      component={withAuthorization(['cp_admin'])(LandingCpAdmin.BrokerageDetail)}
    />
    <Route
      exact
      path="/cp-user/form-manager"
      component={withAuthorization(['cp_admin'])(LandingCpAdmin.FormManagement)}
    />
    <Route
      exact
      path="/cp-user/form-manager/:id"
      component={withAuthorization(['cp_admin'])(LandingCpAdmin.FormList)}
    />
    <Route
      exact
      path="/cp-user/under-construction"
      component={withAuthorization(['cp_admin'])(LandingCpAdmin.UnderConstruction)}
    />

    {/* admin-specific routes */}
    <Route
      exact
      path="/admin"
      component={withAuthorization(['admin'])(LandingAdmin.Index)}
    />
    <Route
      exact
      path="/admin/admin-management"
      component={withAuthorization(['admin'])(LandingAdmin.AdminManagement)}
    />
    <Route
      exact
      path="/admin/agent-management"
      component={withAuthorization(['admin'])(LandingAdmin.AgentManagement)}
    />
    <Route
      exact
      path="/admin/agent-management/:id"
      component={withAuthorization(['admin'])(LandingAdmin.AgentManagementDetails)}
    />
    <Route
      exact
      path="/admin/admin-management/:id"
      component={withAuthorization(['admin'])(LandingAdmin.AdminManagementDetails)}
    />
    <Route
      exact
      path="/admin/brokerage-management"
      component={withAuthorization(['admin'])(LandingAdmin.BrokerageList)}
    />
    <Route
      exact
      path="/admin/brokerage-management/:brokerageId"
      component={withAuthorization(['admin'])(LandingAdmin.BrokerageDetails)}
    />
    <Route
      exact
      path="/admin/under-construction"
      component={withAuthorization(['admin'])(LandingAdmin.UnderConstruction)}
    />

    {/* agent-specific routes */}
    <Route
      exact
      path="/agent/editor"
      component={withAuthorization(['agent'])(Editor.InstanceViewMode)}
    />
    <Route
      exact
      path="/agent/editor/view"
      component={withAuthorization(['agent'])(Editor.InstanceViewMode)}
    />
    <Route
      exact
      path="/agent/editor/edit"
      component={withAuthorization(['agent'])(Editor.InstancePrepareMode)}
    />
    <Route
      exact
      path="/agent/editor/sign"
      component={withAuthorization(['agent'])(Editor.SignMode)}
    />
    {/* <Route
      exact
      path="/agent/transactions"
      component={withAuthorization(['agent'])(LandingAgent.Transactions)}
    /> */}
    <Route
      exact
      path="/agent/clients"
      component={withAuthorization(['agent'])(LandingAgent.Clients)}
    />
    {/* Datz users' routes */}
    <Route
      exact
      path="/agent/sessions"
      component={withAuthorization(['agent'])(LandingAgent.Sessions)}
    />
    <Route
      exact
      path="/agent/sessions/new"
      component={withAuthorization(['agent'])(LandingAgent.InitiateSession)}
    />
    <Route
      exact
      path="/agent/sessions/new/placeholder"
      component={withAuthorization(['agent'])(LandingAgent.Feedback)}
    />
    <Route
      exact
      path="/sign"
      component={LandingAgent.SigningSession}
    />
    <Route
      exact
      path="/view"
      component={LandingAgent.ViewDocuments}
    />
    <Route
      exact
      path="/view/:transactionSessionId"
      component={LandingAgent.ViewDocuments}
    />
    <Route
      exact
      path="/view/:transactionSessionId/:documentId"
      component={LandingAgent.ViewDocuments}
    />

    {/* Signature Validation */}

    <Route
      exact
      path="/s/:sId?"
      component={Signature.SignatureValidation}
    />

    {/* misc */}
    {
      ENVIRONMENT !== ENVIRONMENTS.PROD
      && (
        <Route
          exact
          path="/showcase"
          component={ShowCase}
        />
      )
    }
    {
      ENVIRONMENT !== ENVIRONMENTS.PROD
      && (
        <Route
          exact
          path="/showcase/:component"
          component={ShowCase}
        />
      )
    }

    {/* 404 Page, must be last. */}
    <Route
      component={PageNotFound}
    />

  </Switch>
);

export default (withRouter(Routes): React.Element);
