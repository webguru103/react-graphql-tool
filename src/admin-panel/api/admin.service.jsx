import * as React from 'react';
import { ApolloConsumer, Mutation, Query } from 'react-apollo';
import { withRouter } from 'react-router';
import { get, pro } from '../../utility';
import getUserAdminBrokerages from './getUserAdminBrokerages.query.graphql';
import inviteNewAgentMutation from './inviteNewAgent.mutation.graphql';
import inviteNewAdminMutation from './inviteNewAdmin.mutation.graphql';
import getAgentQuery from './getAgent.query.graphql';
import getUserQuery from './getUser.query.graphql';
import updateUserMutation from './updateUser.mutation.graphql';
import { RESOURCE_CATEGORY, ROLE_ID, ROLE_CATEGORY } from '../../constants';
import getAdminBrokeragesAndUserRole from './getAdminBrokeragesAndUserRole.query.graphql';
import getBrokeragesAdminCount from './getBrokeragesAdminCountForAdmin.query.graphql';
import getBrokeragesAgentCount from './getBrokeragesAgentCountForAdmin.query.graphql';
import getAgentsForAdmin from './getAgentsForAdmin.query.graphql';
import getAdminUserBrokerages from './getAdminUserBrokerages.query.graphql';
import { logger } from '../../logger';
import getAdminsForAdmin from './getAdminsForAdmin.query.graphql';
import getUserName from './getUserName.query.graphql';
import getBrokerageName from './getBrokerageName.query.graphql';

export const withGetUserAdminBrokerages = (Component: React.Element) => {

  type PropType = {
    user: {
      id: string,
    }
  }

  function GetUserAdminBrokeragesHOC({ user: { id }, ...rest }: PropType) {
    return (
      <Query query={getUserAdminBrokerages} variables={{ condition: { userId: id, roleCategory: ROLE_CATEGORY.ADMIN } }}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return 'Error!';

          const massageData = dt => get(dt, 'brokerages.nodes', []).reduce((acc, node) => [...acc, node.brokerageByBrokerageId], []);
          return (
            <Component
              {...rest}
              brokerages={massageData(data)}
            />
          );
        }}
      </Query>
    );
  }

  return GetUserAdminBrokeragesHOC;
};

export const withInviteNewAgent = (Component: React.Element) => {
  function InviteNewAgentHOC(props: any) {
    return (
      <ApolloConsumer>
        {
          client => (
            <Component
              {...props}
              inviteNewAgent={({
                email, resourceId,
              }) => client.mutate({
                mutation: inviteNewAgentMutation,
                variables: {
                  invite: {
                    email,
                    resourceId,
                    resourceCategory: RESOURCE_CATEGORY.BROKERAGE,
                    roleCategory: ROLE_CATEGORY.AGENT,
                    roleId: ROLE_ID.AGENT,
                  },
                },
              })}
            />
          )
        }
      </ApolloConsumer>
    );
  }

  return InviteNewAgentHOC;
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
                mutation: inviteNewAdminMutation,
                variables: {
                  invite: {
                    email,
                    resourceId: brokerageId,
                    resourceCategory: RESOURCE_CATEGORY.BROKERAGE,
                    roleId: ROLE_ID.ADMIN,
                    roleCategory: ROLE_CATEGORY.ADMIN,
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

  return InviteNewAdminHOC;
};

export const withGetAgent = (Component: React.Element) => {
  function GetUserHOC(props) {
    return (
      <Query
        query={getAgentQuery}
        variables={{
          userCondition: { id: Number(get(props, 'match.params.id')) },
          agentCondition: { roleCategory: ROLE_CATEGORY.AGENT },
        }}
      >
        {
          ({ data }) => (
            <Component
              {...props}
              agent={get(data, 'user.nodes.0', {})}
            />
          )
        }
      </Query>
    );
  }

  GetUserHOC.displayName = Component.displayName;

  return (withRouter(GetUserHOC): React.Element);
};

export const withGetAdmin = (Component: React.Element) => {
  // TODO update me
  function GetUserHOC(props) {
    return (
      <Query
        query={getAgentQuery}
        variables={{
          userCondition: { id: Number(get(props, 'match.params.id')) },
          agentCondition: { roleCategory: ROLE_CATEGORY.AGENT },
        }}
      >
        {
          ({ data }) => (
            <Component
              {...props}
              agent={get(data, 'user.nodes.0')}
            />
          )
        }
      </Query>
    );
  }

  GetUserHOC.displayName = Component.displayName;

  return (withRouter(GetUserHOC): React.Element);
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
              targetUser={data && get(data, 'user.nodes.0', null)}
            />
          )
        }
      </Query>
    );
  }

  GetUserHOC.displayName = Component.displayName;

  return (withRouter(GetUserHOC): React.Element);
};

export const withGetAdminUserBrokerages = (Component: React.Element) => {

  function GetAdminUserBrokeragesHOC(props: any) {
    return (
      <Query
        query={getAdminUserBrokerages}
        variables={{
          condition: {
            userId: Number(get(props, 'match.params.id')),
            roleCategory: ROLE_CATEGORY.ADMIN,
          },
        }}
        fetchPolicy="network-only"
      >
        {({
          loading, error, data, refetch,
        }) => {
          if (error) return 'Error!';

          return (
            <Component
              {...props}
              loading={loading}
              refetch={refetch}
              adminUserBrokerageAcls={get(data, 'adminUserBrokerages.nodes', [])}
              brokerageAclsCount={get(data, 'adminUserBrokerages.totalCount', 0)}
            />
          );
        }}
      </Query>
    );
  }

  return GetAdminUserBrokeragesHOC;
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

export const withGetAgentsForAdmin = (Component: React.Element) => {
  function GetAgentsHOC(props: any) {
    return (
      <Query
        query={getAgentsForAdmin}
        variables={{
          brokerageCondition: {
            userId: props.user.id,
            roleCategory: ROLE_CATEGORY.ADMIN,
          },
          agentCondition: {
            roleCategory: ROLE_CATEGORY.AGENT,
          },
        }}
      >
        {
          ({
            data, error, loading, refetch,
          }) => {
            if (error) {
              logger.log(error);
            }
            const massageData = (dt) => {
              const brokerageAcls = get(dt, 'agents.nodes', []);
              const agents = brokerageAcls.reduce(
                (acc, bacl) => {

                  const filteredbrokerageAcls = get(bacl, 'brokerageByBrokerageId.brokerageAclsByBrokerageId.nodes', []);

                  if (!filteredbrokerageAcls.length) {
                    return [...acc];
                  }

                  return [
                    ...acc,
                    ...filteredbrokerageAcls.reduce((filteredAcc, fbacl) => (
                      [
                        ...filteredAcc,
                        {
                          id: get(fbacl, 'userId'),
                          ...get(fbacl, 'userByUserId', []),
                          brokerageAcl: get(fbacl, 'id'),
                          brokerage: get(fbacl, 'brokerageByBrokerageId'),
                        },
                      ]
                    ), []),
                  ];
                }, [],
              );

              return agents;
            };
            return (
              <Component
                {...props}
                error={error}
                loading={loading}
                refetch={refetch}
                agents={massageData(data)}
              />
            );
          }
        }
      </Query>
    );
  }

  return GetAgentsHOC;
};

export const withRemoveAgentFromBO = (Component: React.Element) => {
  function RemoveAgentFromBOHOC(props: any) {
    return (
      <Mutation mutation={updateUserMutation}>
        {
          ((mutation) => {
            const removeFromBO = ({ id, brokerageAcl }) => mutation({
              variables: {
                id,
                user: {
                  removeBrokerageAcls: [brokerageAcl],
                },
              },
              refetchQueries: [{
                query: getAgentsForAdmin,
                variables: {
                  brokerageCondition: {
                    userId: props.user.id,
                    roleCategory: ROLE_CATEGORY.ADMIN,
                  },
                  agentCondition: {
                    roleCategory: ROLE_CATEGORY.AGENT,
                  },
                },
              }],
            });

            return (
              <Component
                {...props}
                removeFromBO={removeFromBO}
              />
            );
          })
        }
      </Mutation>
    );
  }

  return RemoveAgentFromBOHOC;
};

export const withBrokerages = (Component: React.Element) => function getBrokeragesHOC(props: any) {
  return (
    <ApolloConsumer>
      {
        (client) => {
          const getBrokeragesMethod = async () => {

            const massagedBrokerages = [];
            const { data: brokerages } = await (client.query({
              query: getAdminBrokeragesAndUserRole,
              variables: {
                brokerageAclCondition: { userId: props.user.id, roleCategory: ROLE_CATEGORY.ADMIN },
              },
            }));
            const { data: adminCount } = await (client.query({
              query: getBrokeragesAdminCount,
              variables: {
                brokerageAclCondition: { userId: props.user.id, roleCategory: ROLE_CATEGORY.ADMIN },
                adminAclCondition: { roleCategory: ROLE_CATEGORY.ADMIN },
              },
            }));
            const { data: agentCount } = await (client.query({
              query: getBrokeragesAgentCount,
              variables: {
                brokerageAclCondition: { userId: props.user.id, roleCategory: ROLE_CATEGORY.ADMIN },
                agentAclCondition: { roleCategory: ROLE_CATEGORY.AGENT },
              },
            }));

            for (let i = 0; i < get(brokerages, 'brokerages.nodes', []).length; i += 1) {
              const massagedBrokerage = { ...get(brokerages.brokerages.nodes[i], 'brokerageByBrokerageId', {}) };
              massagedBrokerage.roleCategory = get(brokerages.brokerages.nodes[i], 'roleCategory');
              if (get(agentCount, `agentCount.nodes.${i}`)) {
                massagedBrokerage.agentCount = get(
                  agentCount.agentCount.nodes[i], 'brokerageByBrokerageId.brokerageAclsByBrokerageId.totalCount', 0,
                );
              }
              if (get(adminCount, `adminCount.nodes.${i}`)) {
                massagedBrokerage.adminCount = get(
                  adminCount.adminCount.nodes[i], 'brokerageByBrokerageId.brokerageAclsByBrokerageId.totalCount', 0,
                );
              }
              massagedBrokerages.push(massagedBrokerage);
            }

            return massagedBrokerages;
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
};

export const withGetAdminsForSuperAdmin = (Component: React.Element) => {
  function AdminsForSuperAdminHOC(props: any) {
    return (
      <ApolloConsumer>
        {
          (client) => {
            const fetchData = async () => {
              const [err, data] = await pro(client.query({
                query: getAdminsForAdmin,
                variables: {
                  brokerageCondition: {
                    userId: props.user.id,
                    roleCategory: ROLE_CATEGORY.ADMIN,
                  },
                  adminCondition: {
                    roleCategory: ROLE_CATEGORY.ADMIN,
                  },
                },
              }));

              if (err) {
                logger.log(err);
                return [];
              }

              const massageData = (dt) => {
                const brokerageAcls = get(dt, 'data.admins.nodes', []);
                const admins = brokerageAcls.reduce(
                  (acc, bacl) => {

                    const filteredbrokerageAcls = get(bacl, 'brokerageByBrokerageId.brokerageAclsByBrokerageId.nodes', []);

                    if (!filteredbrokerageAcls.length) {
                      return acc;
                    }

                    return [
                      ...acc,
                      ...filteredbrokerageAcls.reduce((filteredAcc, fbacl) => (
                        [
                          ...filteredAcc,
                          {
                            id: get(fbacl, 'userId'),
                            ...get(fbacl, 'userByUserId', []),
                            brokerages: [get(fbacl, 'brokerageByBrokerageId')],
                          },
                        ]
                      ), []),
                    ];
                  }, [],
                );

                return admins.reduce((adminsAcc, admin) => {
                  const addedAdmin = adminsAcc.find(a => a.id === admin.id);

                  if (addedAdmin) {
                    addedAdmin.brokerages = [
                      ...addedAdmin.brokerages,
                      ...admin.brokerages,
                    ];

                    return adminsAcc;
                  }

                  return [
                    ...adminsAcc,
                    admin,
                  ];
                }, []);
              };

              return massageData(data);
            };

            return (
              <Component
                {...props}
                fetchData={fetchData}
              />
            );
          }
        }
      </ApolloConsumer>
    );
  }

  return AdminsForSuperAdminHOC;
};

export const withUserName = (Component: React.Element) => function AdminNameHOC(props: any) {
  return (
    <Query
      query={getUserName}
      variables={{
        condition: {
          id: props.match.params.id,
        },
      }}
    >
      {
        ({ data }) => (
          <Component
            firstName={get(data, 'users.nodes.0.firstName')}
            lastName={get(data, 'users.nodes.0.lastName')}
          />
        )
      }
    </Query>
  );
};

export const withBrokerageName = (Component: React.Element) => function BrokerageNameHOC(props: any) {
  return (
    <Query
      query={getBrokerageName}
      variables={{
        condition: {
          id: props.match.params.brokerageId,
        },
      }}
    >
      {
        ({ data }) => (
          <Component
            brokerageName={get(data, 'brokerages.nodes.0.brokerageName')}
          />
        )
      }
    </Query>
  );
};
