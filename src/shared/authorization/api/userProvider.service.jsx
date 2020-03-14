import * as React from 'react';
import { Query, Mutation } from 'react-apollo';
import Cookies from 'js-cookie';
import getUserQuery from './currentUser.query.graphql';
import logoutUserMutation from './logoutUser.mutation.graphql';
import { get } from '../../../utility';
import { STATUS, ROLE_CATEGORY } from '../../../constants';

export const withUserQuery = (Component: React.Element) => {
  function UserHOC(props: any) {
    const jwt = Cookies.get('jwt');
    return (
      <Query
        query={getUserQuery}
        variables={{
          condition: { temporaryToken: jwt },
          inviteCondition: {
            inviteStatus: STATUS.PENDING,
            roleCategory: ROLE_CATEGORY.AGENT,
          },
        }}
        fetchPolicy="no-cache"
        skip={!jwt}
      >
        {
          data => (
            <Component
              {...props}
              user={get(data, 'data.user.nodes.0')}
              loading={jwt && data.loading}
              error={data.error}
              refetch={data.refetch}
            />
          )
        }
      </Query>
    );
  }

  return UserHOC;
};

export const withLogoutUser = (Component: React.Element) => {

  function LogOutUserHOC(props: any) {
    return (
      <Mutation
        mutation={logoutUserMutation}
      >
        {
          logoutUser => (
            <Component
              {...props}
              logoutUser={logoutUser}
            />
          )
        }
      </Mutation>
    );
  }

  return LogOutUserHOC;
};
