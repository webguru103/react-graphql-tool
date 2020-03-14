import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { withAppUser } from './userConsumer';
import type { AppUser } from './flowTypes';

type PropType = {
  isUserLoading: boolean,
  user: AppUser,
  rest: any,
}

const userHaveRole = (user, roles) => {

  if (roles.includes('agent') && user.isAgent) {
    return true;
  }

  if (roles.includes('admin') && user.isAdmin) {
    return true;
  }

  if (roles.includes('cp_admin') && user.isCpAdmin) {
    return true;
  }

  return false;
};

const withAuthorization = (requiredRoles: ?Array<'agent' | 'admin' | 'cp_admin'>) => (Component: React.Element) => {
  function AuthorizationHOC({ isUserLoading, user, ...rest }: PropType) {
    if (isUserLoading) {
      return null;
    }

    if (user) {
      if (requiredRoles) {
        return userHaveRole(user, requiredRoles) ? <Component {...rest} /> : <Redirect to="/login" />;
      }
      return <Component {...rest} />;
    }

    return <Redirect to="/login" />;
  }

  return withAppUser(AuthorizationHOC);
};

export default withAuthorization;
