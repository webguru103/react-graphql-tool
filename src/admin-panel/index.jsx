import * as React from 'react';
import Loadable from 'react-loadable';
import CircularProgress from '@material-ui/core/CircularProgress';
import Landing from './landing/landing';
import AgentDetails from './agent-management/agentDetails';
import AdminDetails from './admin-management/admin-details/adminDetails';
import AdminDashboard from './dashboard/dashboard';
import UnderConstruction from '../shared/underConstruction';

const AdminManagement = Loadable({
  loader: () => import('./admin-management/admins'),
  loading: () => <CircularProgress />,
});
const AgentManagement = Loadable({
  loader: () => import('./agent-management/agents'),
  loading: () => <CircularProgress />,
});
const BrokerageList = Loadable({
  loader: () => import('./brokerage-management/brokerages'),
  loading: () => <CircularProgress />,
});
const BrokerageDetails = Loadable({
  loader: () => import('./brokerage-management/brokerage-details/brokerageDetails'),
  loading: () => <CircularProgress />,
});
const AccountSettings = Loadable({
  loader: () => import('../account/account-settings/accountSettings'),
  loading: () => <CircularProgress />,
});

const withLayout = (Component: React.Element) => function LayoutWrapper(props: any) {
  return (
    <Landing>
      <Component {...props} />
    </Landing>
  );
};

export { default as UsernameBreadCrumb } from './userNameBreadCrumb';
export { default as BrokerageNameBreadCrumb } from './brokerage-management/brokerageNameBreadCrumb';

export default {
  Index: withLayout(AdminDashboard),
  AgentManagement: withLayout(AgentManagement),
  AdminManagement: withLayout(AdminManagement),
  BrokerageDetails: withLayout(BrokerageDetails),
  BrokerageList: withLayout(BrokerageList),
  AccountSettings: withLayout(AccountSettings),
  AgentManagementDetails: withLayout(AgentDetails),
  AdminManagementDetails: withLayout(AdminDetails),
  UnderConstruction: withLayout(UnderConstruction.Admin),
};
