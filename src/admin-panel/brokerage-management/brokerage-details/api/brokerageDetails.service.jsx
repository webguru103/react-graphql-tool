import * as React from 'react';
import { ApolloConsumer, Mutation } from 'react-apollo';
import { withRouter } from 'react-router';
import getBrokerageQuery from './getBrokerage.query.graphql';
import getBrokerageAdminCountQuery from './getBrokerageAdminCount.query.graphql';
import getBrokerageAgentCountQuery from './getBrokerageAgentCount.query.graphql';
import updateBrokerageMutation from './updateBrokerage.mutation.graphql';
import { get } from '../../../../utility';
import { ROLE_CATEGORY } from '../../../../constants';

export const withGetBrokerage = (Component: React.Element) => {
  function GetBrokerageHOC(props) {
    return (
      <ApolloConsumer>
        {
          client => (
            <Component
              {...props}
              getBrokerage={() => client.query({
                query: getBrokerageQuery,
                variables: {
                  condition: {
                    id: Number(get(props, 'match.params.brokerageId')),
                  },
                },
              })}
            />
          )
        }
      </ApolloConsumer>
    );
  }

  GetBrokerageHOC.displayName = Component.displayName;

  return (withRouter(GetBrokerageHOC): React.Element);
};

export const withGetBrokerageCounts = (Component: React.Element) => {
  function GetBrokerageCountsHOC(props) {
    return (
      <ApolloConsumer>
        {
          (client) => {
            const getBrokerageCounts = async () => {

              const { data: adminCount } = await (client.query({
                query: getBrokerageAdminCountQuery,
                variables: {
                  brokerageCondition: {
                    id: Number(get(props, 'match.params.brokerageId')),
                  },
                  adminAclCondition: {
                    roleCategory: ROLE_CATEGORY.ADMIN,
                  },
                },
              }));

              const { data: agentCount } = await (client.query({
                query: getBrokerageAgentCountQuery,
                variables: {
                  brokerageCondition: {
                    id: Number(get(props, 'match.params.brokerageId')),
                  },
                  agentAclCondition: {
                    roleCategory: ROLE_CATEGORY.AGENT,
                  },
                },
              }));

              return {
                brokerageAdmins: adminCount,
                brokerageAgents: agentCount,
              };
            };

            return (
              <Component
                {...props}
                getBrokerageCounts={getBrokerageCounts}
              />
            );
          }
        }
      </ApolloConsumer>
    );
  }

  GetBrokerageCountsHOC.displayName = Component.displayName;

  return (withRouter(GetBrokerageCountsHOC): React.Element);
};

export const withUpdateBrokerage = (Component: React.Element) => {
  function UpdateBrokerageHOC(props: Object) {
    return (
      <Mutation
        mutation={updateBrokerageMutation}
      >
        {
          ((mutation) => {
            const updateBrokerage = ({
              id,
              brokerageName,
              phone,
              fax,
              country,
              streetNumber,
              streetName,
              unit,
              city,
              province,
              postalCode,
            }) => mutation({
              variables: {
                id,
                brokerage: {
                  brokerageName,
                  phone,
                  fax,
                  country,
                  streetNumber,
                  streetName,
                  unit,
                  city,
                  province,
                  postalCode,
                },
              },
            });

            return (
              <Component
                {...props}
                updateBrokerage={updateBrokerage}
              />
            );
          })
        }
      </Mutation>
    );
  }

  return (withRouter(UpdateBrokerageHOC): React.Element);
};
