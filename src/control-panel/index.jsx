import React from 'react';
import Landing from './landing-cpadmin/landing';
import { BrokerageList } from './brokerage-management';
import { BrokerageDetail } from './brokerage-management/brokerage-details';
import { AdminList } from './admin-management';
import { AgentList } from './agent-management';
import AgentDetails from './agent-management/agentDetails';
import AdminDetails from './admin-management/adminDetails/adminDetails';
import CpUsers from './cp-user-management/cpUsers';
import CpUsersDetails from './cp-user-management/cpUsersDetails/cpUsersDetails';
import AccountSettings from '../account/account-settings/accountSettings';
import FormGroups from './form-group-management/formGroups';
import CpAdminDashboard from './dashboard-cpadmin/dashboard';
import UnderConstruction from '../shared/underConstruction';
import { FormList } from './form-management';
import EditorContainer from './editor-container/editorContainer';
import { EDITOR_MODE } from '../constants';

const withLanding = Component => function LandingWrapper(props: any) {
  return (
    <Landing>
      <Component {...props} />
    </Landing>
  );
};

export const ControlPanelEditor = {
  TemplateDraftMode: () => <EditorContainer mode={EDITOR_MODE.TEMPLATE_DRAFT} />,
  TemplateViewMode: () => <EditorContainer mode={EDITOR_MODE.TEMPLATE_PUBLISHED} />,
};

export default {
  Index: withLanding(CpAdminDashboard),
  BrokerageList: withLanding(BrokerageList),
  BrokerageDetail: withLanding(BrokerageDetail),
  AdminList: withLanding(AdminList),
  AgentList: withLanding(AgentList),
  AdminDetails: withLanding(AdminDetails),
  AgentDetails: withLanding(AgentDetails),
  CpUsers: withLanding(CpUsers),
  CpUsersDetails: withLanding(CpUsersDetails),
  AccountSettings: withLanding(AccountSettings),
  FormManagement: withLanding(FormGroups),
  FormList: withLanding(FormList),
  UnderConstruction: withLanding(UnderConstruction.Admin),
};

export { default as FormGroupNameBreadCrumb } from './form-management/formGroupNameBreadCrumb';
