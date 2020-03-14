import * as React from 'react';
import { Query, ApolloConsumer, graphql } from 'react-apollo';
import getAllBrokerages from './getBrokerages.query.graphql';
import checkIdentityQuery from './checkIdentity.query.graphql';
import usersQuery from './users.query.graphql';
import getAgentCountQuery from './agentCount.query.graphql';
import getAdminCountQuery from './adminCount.query.graphql';
import addBrokerageMutation from './addBrokerage.mutation.graphql';
import inviteUserMutation from './invite.mutation.graphql';
import updateBrokerageMutation from './updateBrokerage.mutation.graphql';
import inviteNewAdminMutation from './inviteNewAdmin.mutation.graphql';
import updateUserMutation from './updateUser.mutation.graphql';
import { get } from '../../../utility';
import {
  ROLE_ID,
  RESOURCE_CATEGORY,
  ROLE_CATEGORY,
  SYSTEM_ID,
} from '../../../constants';

export const withAddBrokerage = (Component: React.Element) => {

  type PropType = {
    addBrokerageApollo: (Object) => void,
  };

  function AddBrokerageHOC({ addBrokerageApollo, ...rest }: PropType) {

    const addBrokerage = ({
      brokerageName,
      phone,
      fax,
      address,
    }) => addBrokerageApollo({
      variables: {
        brokerage: {
          brokerageName,
          phone,
          fax,
          ...address,
        },
      },
      // TODO optimistic UI update
    });

    return (
      <Component
        addBrokerage={addBrokerage}
        {...rest}
      />
    );
  }

  AddBrokerageHOC.displayName = Component.displayName;

  return (graphql(addBrokerageMutation, { name: 'addBrokerageApollo' })(AddBrokerageHOC): React.Element);
};

export const withInviteUser = (Component: React.Element) => {

  type PropType = {
    inviteUserApollo: (Object) => void,
  };

  function inviteUserHOC({ inviteUserApollo, ...rest }: PropType) {

    const inviteUser = ({
      invite,
    }) => inviteUserApollo({
      variables: {
        invite,
      },
      // TODO optimistic UI update
    });

    return (
      <Component
        inviteUser={inviteUser}
        {...rest}
      />
    );
  }

  inviteUserHOC.displayName = Component.displayName;

  return (graphql(inviteUserMutation, { name: 'inviteUserApollo' })(inviteUserHOC): React.Element);
};

// user update
export const withUpdateUser = (Component: React.Element) => {

  type PropType = {
    updateUserApollo: (Object) => void,
  };

  function UpdateUserHOC({ updateUserApollo, ...rest }: PropType) {

    const updateUser = ({
      id,
      user,
    }) => updateUserApollo({
      variables: {
        id,
        user,
      },
    });
    return (
      <Component
        updateUser={updateUser}
        {...rest}
      />
    );
  }

  UpdateUserHOC.displayName = Component.displayName;

  return (graphql(updateUserMutation, { name: 'updateUserApollo' })(UpdateUserHOC): React.Element);
};

export const withUpdateBrokerage = (Component: React.Element) => {

  type PropType = {
    updateBrokerageApollo: (Object) => void,
  };

  function UpdateBrokerageHOC({ updateBrokerageApollo, ...rest }: PropType) {

    const updateBrokerage = ({
      id,
      name,
      phone,
      fax,
      address,
    }) => updateBrokerageApollo({
      variables: {
        id,
        brokerage: {
          name,
          phone,
          fax,
          address,
        },
      },
    });

    return (
      <Component
        updateBrokerage={updateBrokerage}
        {...rest}
      />
    );
  }

  UpdateBrokerageHOC.displayName = Component.displayName;

  return (graphql(updateBrokerageMutation, { name: 'updateBrokerageApollo' })(UpdateBrokerageHOC): React.Element);
};

// BO query
export const withBrokerages = (Component: React.Element) => {

  function withBrokeragesHOC(props: any) {
    return (
      <Query
        query={getAllBrokerages}
      >
        {
          ({
            data,
            error,
            loading,
            refetch,
          }) => {
            const massageData = (dt) => {
              const output = get(dt, 'brokerages.nodes');
              return output;
            };
            return (
              <Component
                {...props}
                brokerages={massageData(data)}
                onRefetch={refetch}
                error={error}
                loading={loading}
              />
            );
          }
        }
      </Query>
    );
  }

  return withBrokeragesHOC;
};
// BO query
export const withGetAllBrokerages = (Component: React.Element) => {

  function GetAllBrokeragesHOC(props: any) {
    return (
      <ApolloConsumer>
        {
          client => (
            <Component
              {...props}
              onRefetch={() => client.query({
                query: getAllBrokerages,
                fetchPolicy: 'network-only',
              })
              }
            />
          )
        }
      </ApolloConsumer>
    );
  }

  return GetAllBrokeragesHOC;
};

export const withAgentCount = (Component: React.Element) => {

  function GetAgentCountHOC(props: any) {
    return (
      <ApolloConsumer>
        {
          client => (
            <Component
              {...props}
              agentCount={() => client.query({
                query: getAgentCountQuery,
                fetchPolicy: 'network-only',
                variables: {
                  agentAclCondition: {
                    roleCategory: ROLE_CATEGORY.AGENT,
                  },
                },
              })
              }
            />
          )
        }
      </ApolloConsumer>
    );
  }

  return GetAgentCountHOC;
};

export const withAdminCount = (Component: React.Element) => {

  function GetAdminCountHOC(props: any) {
    return (
      <ApolloConsumer>
        {
          client => (
            <Component
              {...props}
              adminCount={() => client.query({
                query: getAdminCountQuery,
                fetchPolicy: 'network-only',
                variables: {
                  adminAclCondition: {
                    roleCategory: ROLE_CATEGORY.ADMIN,
                  },
                },
              })
              }
            />
          )
        }
      </ApolloConsumer>
    );
  }

  return GetAdminCountHOC;
};

// user query
export const withUserByEmail = (Component: React.Element) => {
  function UsersHOC(props: any) {
    return (
      <ApolloConsumer>
        {
          client => (
            <Component
              {...props}
              getUserByEmail={email => client.query({
                query: usersQuery,
                fetchPolicy: 'no-cache',
                variables: {
                  userCondition: {
                    email: email.userEmail,
                  },
                },
              })
              }
            />
          )
        }
      </ApolloConsumer>
    );
  }

  return UsersHOC;
};

export const withAdminIdentity = (Component: React.Element) => {

  function IdentityHOC(props: any) {
    return (
      <ApolloConsumer>
        {
          client => (
            <Component
              {...props}
              checkAdminIdentity={email => client.query({
                query: checkIdentityQuery,
                fetchPolicy: 'no-cache',
                variables: { email, systemId: SYSTEM_ID.ADMIN_PANEL },
              })}
            />
          )
        }
      </ApolloConsumer>
    );
  }

  return IdentityHOC;
};

export const withInviteNewAdmin = (Component: React.Element) => {

  function InviteNewAdminHOC(props: any) {
    return (
      <ApolloConsumer>
        {
          client => (
            <Component
              {...props}
              inviteNewAdmin={({
                email, brokerageId,
              }) => client.mutate({
                mutation: inviteNewAdminMutation,
                variables: {
                  invite: {
                    email,
                    resourceId: brokerageId,
                    resourceCategory: RESOURCE_CATEGORY.BROKERAGE,
                    roleId: ROLE_ID.SUPER_ADMIN,
                    roleCategory: ROLE_CATEGORY.ADMIN,
                  },
                },
              })}
            />
          )
        }
      </ApolloConsumer>
    );
  }

  return InviteNewAdminHOC;
};
