import * as React from 'react';
import type { Location } from 'react-router';
import { TransactionBreadcrumb } from '../../agent-panel';
import UsernameBreadCrumb from '../../admin-panel/userNameBreadCrumb';
import BrokerageNameBreadCrumb from '../../admin-panel/brokerage-management/brokerageNameBreadCrumb';
import { FormGroupNameBreadCrumb } from '../../control-panel';

const DashboardBreadcrumb = ({ location }: { location: Location }) => (location.pathname === '/' ? <span>Dashboard</span> : null);

export default [
  { path: '/', breadcrumb: DashboardBreadcrumb },
  { path: '/agent', breadcrumb: null },
  { path: '/agent/transactions/:transactionId', breadcrumb: TransactionBreadcrumb },
  { path: '/account-settings', breadcrumb: 'Account Settings' },
  { path: '/admin', breadcrumb: null },
  { path: '/admin/agent-management', breadcrumb: 'Agents' },
  { path: '/admin/admin-management', breadcrumb: 'Admins' },
  { path: '/admin/admin-management/:id', breadcrumb: UsernameBreadCrumb },
  { path: '/admin/agent-management/:id', breadcrumb: UsernameBreadCrumb },
  { path: '/admin/brokerage-management', breadcrumb: 'Brokerage Offices' },
  { path: '/admin/brokerage-management/:brokerageId', breadcrumb: BrokerageNameBreadCrumb },
  { path: '/cp-user', breadcrumb: null },
  { path: '/cp-user/agent-management', breadcrumb: 'Agents' },
  { path: '/cp-user/admin-management', breadcrumb: 'Admins' },
  { path: '/cp-user/admin-management/:id', breadcrumb: UsernameBreadCrumb },
  { path: '/cp-user/agent-management/:id', breadcrumb: UsernameBreadCrumb },
  { path: '/cp-user/brokerage-management', breadcrumb: 'Brokerage Offices' },
  { path: '/cp-user/brokerage-management/:brokerageId', breadcrumb: BrokerageNameBreadCrumb },
  { path: '/cp-user/form-manager', breadcrumb: 'Form Manager' },
  { path: '/cp-user/form-manager/:id', breadcrumb: FormGroupNameBreadCrumb },
  { path: '/cp-user/cp-user-management', breadcrumb: 'Control Panel Admins' },
  { path: '/cp-user/cp-user-management/:id', breadcrumb: UsernameBreadCrumb },

  { path: '/*/under-construction', breadcrumb: null },
];
