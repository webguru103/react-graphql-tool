import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { withAppUser } from '../shared/authorization/userConsumer';
import type { AppUser } from '../shared/authorization';

type Props = {
  user: AppUser,
}

const Dashboard = ({ user }: Props) => {
  if (user.isCpAdmin) {
    return <Redirect to="/cp-user" />;
  }
  if (user.isAdmin) {
    return <Redirect to="/admin" />;
  }
  if (user.isAgent) {
    return <Redirect to="/agent/sessions" />;
  }

  return <Redirect to="/login" />;

};

export default withAppUser(Dashboard);
