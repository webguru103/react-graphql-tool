import * as React from 'react';
import { UserContext } from './userProvider';

export function withAppUser(Component: React.Element) {
  return function UserInjector(props: any) {
    return (
      <UserContext.Consumer>
        {({ user, isUserLoading }) => <Component {...props} user={user} isUserLoading={isUserLoading} />}
      </UserContext.Consumer>
    );
  };
}

export function withUpdateUserState(Component: React.Element) {
  return function UserUpdateInjector(props: any) {
    return (
      <UserContext.Consumer>
        {({
          setUser,
          clearUser,
          refetchUser,
        }) => <Component {...props} setUser={setUser} clearUser={clearUser} refetchUser={refetchUser} />}
      </UserContext.Consumer>
    );
  };
}
