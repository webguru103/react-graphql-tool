import * as React from 'react';
import { ApolloConsumer, Query, Mutation } from 'react-apollo';
import { withRouter } from 'react-router';
import { get } from '../../../utility';
import getAgents from './agents.query.graphql';
import getBrokerages from './getBrokerages.query.graphql';
import updateUserMutation from './updateUser.mutation.graphql';
import getUserQuery from './getUser.query.graphql';
import inviteNewAgentMutation from './inviteNewAgent.mutation.graphql';
import { RESOURCE_CATEGORY, ROLE_ID, ROLE_CATEGORY } from '../../../constants';

export const withGetAllBrokerages = (Component: React.Element) => {

  function GetAllBrokeragesHOC(props: any) {
    return (
      <Query query={getBrokerages} fetchPolicy="network-only">
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
                    roleId: ROLE_ID.AGENT,
                    roleCategory: ROLE_CATEGORY.AGENT,
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

export const withAgents = (Component: React.Element) => {

  function AgentsHOC(props: any) {
    return (
      <ApolloConsumer>
        {
          client => (
            <Component
              {...props}
              onRefetch={({ fetchPolicy }) => client.query({
                query: getAgents,
                fetchPolicy,
                variables: {
                  systemAclCondition: {
                    resourceCategory: RESOURCE_CATEGORY.SYSTEM,
                    roleCategory: ROLE_CATEGORY.AGENT,
                  },
                  brokerageAclCondition: {
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

  return AgentsHOC;
};

export const withRemoveAgentFromBO = (Component: React.Element) => {
  function RemoveAgentFromBOHOC(props: any) {
    return (
      <Mutation mutation={updateUserMutation}>
        {
          ((mutation) => {
            const removeFromBO = ({ id, brokerageAclId }) => mutation({
              variables: {
                id,
                user: {
                  removeBrokerageAcls: [brokerageAclId],
                },
              },
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
