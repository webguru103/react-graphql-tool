import React from 'react';
import { withAppUser } from '../../shared/authorization/userConsumer';

const DashboardBreadCrumbC = ({ user, location }: { user: { firstName: string }, location: Object }) => {
  if (location.pathname === '/cp-user') {
    return <span>{`Welcome, ${user.firstName}`}</span>;
  }
  return null;
};

export default withAppUser(DashboardBreadCrumbC);
