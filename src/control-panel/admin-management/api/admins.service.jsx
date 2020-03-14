import * as React from 'react';
import { ApolloConsumer, Query, Mutation } from 'react-apollo';
import { withRouter } from 'react-router';
import { get } from '../../../utility';
import getAllBrokerages from './getAllBrokerages.query.graphql';
import getUserBrokerages from './getUserBrokerages.query.graphql';
import getAdmins from './admins.query.graphql';
import inviteUser from './inviteUser.mutation.graphql';
import getUserQuery from './getUser.query.graphql';
import getUserRolesInBrokerages from './getUserRoleInBrokerages.query.graphql';
import updateUserMutation from './updateUser.mutation.graphql';
import { RESOURCE_CATEGORY, ROLE_CATEGORY, ROLE_ID } from '../../../constants';

export const withGetAllBrokerages = (Component: React.Element) => {

  function GetAllBrokeragesHOC(props: any) {
    return (
      <Query query={getAllBrokerages} fetchPolicy="network-only">
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return 'Error!';

          return (
            <Component
              {...props}
              brokerages={get(data, 'brokerages.nodes', [])}
            />
          );
        }}
      </Query>
    );
  }

  return GetAllBrokeragesHOC;
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
                email, firstName, lastName, brokerageId,
              }) => client.mutate({
                mutation: inviteUser,
                variables: {
                  invite: {
                    email,
                    firstName,
                    lastName,
                    resourceId: brokerageId,
                    roleId: ROLE_ID.SUPER_ADMIN,
                    resourceCategory: RESOURCE_CATEGORY.BROKERAGE,
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

export const withAdmins = (Component: React.Element) => {

  function AdminsHOC(props: any) {
    return (
      <ApolloConsumer>
        {
          client => (
            <Component
              {...props}
              onRefetch={() => client.query({
                query: getAdmins,
                fetchPolicy: 'network-only',
                variables: {
                  systemAclCondition: {
                    resourceCategory: RESOURCE_CATEGORY.SYSTEM,
                    roleCategory: ROLE_CATEGORY.ADMIN,
                  },
                  brokerageAclCondition: {
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

  return AdminsHOC;
};

export const withGetUser = (Component: React.Element) => {
  function GetUserHOC(props) {
    return (
      <Query
        query={getUserQuery}
        variables={{
          condition: {
            id: Number(get(props, 'match.params.id')),
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

export const withGetBrokeragesForAddAccess = (Component: React.Element) => {
  function GetBrokeragesHOC(props: any) {
    return (
      <ApolloConsumer>
        { (client) => {
          const getBrokeragesMethod = async () => {
            const { data: appUserData } = await client.query({
              query: getUserRolesInBrokerages,
              variables: {
                id: '2', // TODO: get(props, 'user.id')
                pagination: {
                  page: 0,
                  size: 20,
                  filters: [
                    {
                      field: 'roleType',
                      value: 'admin_default_role',
                    },
                  ],
                },
              },
              fetchPolicy: 'no-cache',
            });

            const { data: targetAdminData } = await client.query({
              query: getUserRolesInBrokerages,
              variables: {
                id: Number(get(props, 'match.params.id')),
                pagination: {
                  page: 0,
                  size: 20,
                  filters: [
                    {
                      field: 'roleType',
                      value: 'admin_default_role',
                    },
                  ],
                },
              },
              fetchPolicy: 'no-cache',
            });

            const brokeragesToShow = [];
            if (
              appUserData && targetAdminData
              && get(appUserData, 'user.userRoles.list')
              && get(targetAdminData, 'user.userRoles.list')
            ) {
              for (let i = 0; i < appUserData.user.userRoles.list.length; i += 1) {
                let brokerageToAdd = appUserData.user.userRoles.list[i].brokerage;

                for (let j = 0; j < targetAdminData.user.userRoles.list.length; j += 1) {
                  if (brokerageToAdd.id === targetAdminData.user.userRoles.list[j].brokerage.id) {
                    brokerageToAdd = null;
                    break;
                  }
                }

                if (brokerageToAdd) {
                  brokeragesToShow.push(brokerageToAdd);
                }
              }
            }

            return brokeragesToShow;

          };
          return (
            <Component
              {...props}
              getBrokerages={getBrokeragesMethod}
            />
          );
        }
        }
      </ApolloConsumer>
    );
  }

  return GetBrokeragesHOC;
};

export const withGetUserBrokerages = (Component: React.Element) => {

  function GetUserBrokeragesHOC(props: any) {
    return (
      <Query
        query={getUserBrokerages}
        variables={{
          condition: {
            userId: Number(get(props, 'match.params.id')),
            roleCategory: ROLE_CATEGORY.ADMIN,
          },
        }}
      >
        {({
          loading, error, data, refetch,
        }) => {
          if (error) return 'Error!';

          return (
            <Component
              {...props}
              refetch={refetch}
              loading={loading}
              userBrokerageAcls={get(data, 'userBrokerages.nodes', [])}
              totalCount={get(data, 'userBrokerages.totalCount', 0)}
            />
          );
        }}
      </Query>
    );
  }

  return GetUserBrokeragesHOC;
};

export const withGrantAdminAccess = (Component: React.Element) => {
  function GrantAdminAccessHOC(props) {
    return (
      <Mutation
        mutation={updateUserMutation}
      >
        {
          (updateUser) => {
            const grantAdminAccess = ({ brokerageId }) => updateUser({
              variables: {
                id: Number(get(props, 'match.params.id')),
                user: {
                  brokerageAcls: [
                    {
                      brokerageId,
                      roleId: ROLE_ID.SUPER_ADMIN,
                      roleCategory: ROLE_CATEGORY.ADMIN,
                      resourceCategory: RESOURCE_CATEGORY.BROKERAGE,
                    },
                  ],
                },
              },
            });
            return (
              <Component
                {...props}
                grantAdminAccess={grantAdminAccess}
              />
            );
          }
        }
      </Mutation>
    );
  }

  return (withRouter(GrantAdminAccessHOC): React.Element);
};

export const withRemoveAdminAccess = (Component: React.Element) => {
  function RemoveAdminAccessHOC(props) {
    return (
      <Mutation
        mutation={updateUserMutation}
      >
        {
          ((mutation) => {
            const removeAdminAccess = ({ brokerageAclId }) => mutation({
              variables: {
                id: Number(get(props, 'match.params.id')),
                user: {
                  removeBrokerageAcls: [brokerageAclId],
                },
              },
            });

            return (
              <Component
                {...props}
                removeAdminAccess={removeAdminAccess}
              />

            );
          })
        }
      </Mutation>
    );
  }

  return (withRouter(RemoveAdminAccessHOC): React.Element);
};
