import * as React from 'react';
import Cookies from 'js-cookie';
import { withUserQuery, withLogoutUser } from './api/userProvider.service';
import type { UserType } from '../../flowTypes';
import { get, compose } from '../../utility';
import { ROLE_CATEGORY } from '../../constants';

export const UserContext = (React.createContext({
  user: {},
  setUser: () => {},
  clearUser: () => {},
  isUserLoading: false,
  refetchUser: () => {},
}): React.Element);

type StateType = {
  user: ?UserType,
}

type PropType = {
  children: React.Element,
  user: UserType, // eslint-disable-line
  loading: boolean,
  refetch: Function,
  logoutUser: () => {},
}

const deriveUserRoles = (user) => {
  const isAgent = get(user, 'systemAclsByUserId.nodes', []).findIndex(acl => acl.roleCategory === ROLE_CATEGORY.AGENT) !== -1;
  const isAdmin = get(user, 'systemAclsByUserId.nodes', []).findIndex(acl => acl.roleCategory === ROLE_CATEGORY.ADMIN) !== -1;
  const isCpAdmin = get(user, 'systemAclsByUserId.nodes', []).findIndex(acl => acl.roleCategory === ROLE_CATEGORY.CP_ADMIN) !== -1;
  return { isAgent, isAdmin, isCpAdmin };
};

class UserProvider extends React.Component<PropType, StateType> {

  static getDerivedStateFromProps(nextProps: PropType, prevState: any) {
    if (nextProps.user && nextProps.user !== prevState.user && Cookies.get('jwt')) {
      return ({
        user: {
          ...nextProps.user,
          ...deriveUserRoles(nextProps.user),
        },
      });
    }
    return null;
  }

  state = {
    user: null,
  };

  setUser = (user) => {
    this.setState({
      user: {
        ...user, ...deriveUserRoles(user),
      },
    });
  };

  clearUser = async () => {
    await this.props.logoutUser();
    this.setState({ user: null });
    Cookies.remove('jwt');
  };

  render() {
    const { children, refetch } = this.props;
    const { user } = this.state;
    return (
      <UserContext.Provider value={{
        user,
        isUserLoading: this.props.loading,
        setUser: this.setUser,
        clearUser: this.clearUser,
        refetchUser: refetch,
      }}
      >
        {children}
      </UserContext.Provider>
    );
  }

}

export default compose(
  withUserQuery,
  withLogoutUser,
)(UserProvider);
