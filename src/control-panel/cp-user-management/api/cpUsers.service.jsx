import * as React from 'react';
import { ApolloConsumer, Mutation, Query } from 'react-apollo';
import { withRouter } from 'react-router';
import getCpUsers from './cpUsers.query.graphql';
import getUserQuery from './getUser.query.graphql';
import inviteUserMutation from './inviteUser.mutation.graphql';
import updateUserMutation from './updateUser.mutation.graphql';
import { get } from '../../../utility';
import {
  SYSTEM_ID, RESOURCE_CATEGORY, STATUS, ROLE_CATEGORY, ROLE_ID,
} from '../../../constants';

export const withInviteNewCpUser = (Component: React.Element) => {

  function InviteNewCpUserHOC(props: any) {
    return (
      <ApolloConsumer>
        {
          client => (
            <Component
              {...props}
              inviteNewCpUser={({
                email, firstName, lastName,
              }) => client.mutate({
                mutation: inviteUserMutation,
                variables: {
                  invite: {
                    roleCategory: ROLE_CATEGORY.CP_ADMIN,
                    resourceCategory: RESOURCE_CATEGORY.SYSTEM,
                    roleId: ROLE_ID.CP_ADMIN,
                    resourceId: SYSTEM_ID.CONTROL_PANEL,
                    email,
                    firstName,
                    lastName,
                  },
                },
              })}
            />
          )
        }
      </ApolloConsumer>
    );
  }

  return InviteNewCpUserHOC;
};

export const withCpUsers = (Component: React.Element) => {

  function CpUsersHOC(props: any) {
    return (
      <ApolloConsumer>
        {
          client => (
            <Component
              {...props}
              onRefetch={() => client.query({
                query: getCpUsers,
                fetchPolicy: 'network-only',
                variables: {
                  systemAclCondition: {
                    systemId: SYSTEM_ID.CONTROL_PANEL,
                  },
                  inviteCondition: {
                    resourceCategory: RESOURCE_CATEGORY.SYSTEM,
                    inviteStatus: STATUS.ACCEPTED,
                  },
                  invitesOrderBy: ['CREATED_AT_DESC'],
                },
              })
              }
            />
          )
        }
      </ApolloConsumer>
    );
  }

  return CpUsersHOC;
};

export const withGetUser = (Component: React.Element) => {
  function GetUserHOC(props) {
    return (
      <Query
        query={getUserQuery}
        variables={{
          userCondition: {
            id: Number(get(props, 'match.params.id')),
          },
          inviteCondition: {
            inviteStatus: STATUS.ACCEPTED,
          },
          invitesOrderBy: ['CREATED_AT_DESC'],
          systemAclCondition: {
            systemId: SYSTEM_ID.CONTROL_PANEL,
            resourceCategory: RESOURCE_CATEGORY.SYSTEM,
          },
        }}
      >
        {
          ({ data }: {data: ?Object}) => (
            <Component
              {...props}
              user={data && get(data, 'user.nodes.0', null)}
            />
          )
        }
      </Query>
    );
  }

  GetUserHOC.displayName = Component.displayName;

  return (withRouter(GetUserHOC): React.Element);
};

export const withRemoveCpUser = (Component: React.Element) => {
  function RemoveCpUserAccessHOC(props) {
    return (
      <Mutation
        mutation={updateUserMutation}
      >
        {
          ((mutation) => {
            const removeCpUserAccess = (userId, systemAclId) => mutation({
              variables: {
                id: userId,
                user: {
                  removeSystemAcls: [
                    systemAclId,
                  ],
                },
              },
            });

            return (
              <Component
                {...props}
                removeCpUserAccess={removeCpUserAccess}
              />

            );
          })
        }
      </Mutation>
    );
  }

  return (withRouter(RemoveCpUserAccessHOC): React.Element);
};
