import * as React from 'react';
import { Query, graphql } from 'react-apollo';
import invitedUserMutation from './invitedUser.mutation.graphql';
import UpdateBrokerage from './updateBrokerage.mutation.graphql';
import UpdateUser from './updateUser.mutation.graphql';
import getBrokerageById from './getBrokerageById.query.graphql';
import { get } from '../../../utility';

export const withUpdateUser = (Component: React.Element) => {

  type Props = {
    updateUser: Function,
  }

  function UpdateUserHOC({ updateUser, ...rest }: Props) {

    const updateUserMethod = (id, user) => updateUser({
      variables: {
        id,
        user,
      },
    });

    return (
      <Component
        {...rest}
        updateUser={updateUserMethod}
      />
    );
  }

  return (graphql(UpdateUser, { name: 'updateUser' })(UpdateUserHOC): React.Element);
};

export const withUpdateBrokerage = (Component: React.Element) => {

  type Props = {
    updateBrokerage: Function,
  }

  function UpdateBrokerageHOC({ updateBrokerage, ...rest }: Props) {

    const updateBrokerageInfo = (id, brokerage) => updateBrokerage({
      variables: {
        id,
        brokerage,
      },
    });

    return (
      <Component
        {...rest}
        updateBrokerage={updateBrokerageInfo}
      />
    );
  }

  return (graphql(UpdateBrokerage, { name: 'updateBrokerage' })(UpdateBrokerageHOC): React.Element);
};

export const withHandleBrokerageInvitation = (Component: React.Element) => {

  type Props = {
    invitedUser: Function,
  }

  function HandleBrokerageInvitationHOC({ invitedUser, ...rest }: Props) {

    const handleInvite = (id, action) => invitedUser({
      variables: {
        id,
        action,
      },
    });

    return (
      <Component
        {...rest}
        handleBrokerageInvitation={handleInvite}
      />
    );
  }

  return (graphql(invitedUserMutation, { name: 'invitedUser' })(HandleBrokerageInvitationHOC): React.Element);
};

export const withGetBrokerage = (Component: React.Element) => {
  function GetBrokerageHOC(props: any) {
    return (
      <Query
        query={getBrokerageById}
        variables={{
          condition: {
            id: get(props, 'invite.resourceId'),
          },
        }}
      >
        {
          ({ data, loading, error }) => (
            <Component
              {...props}
              loading={loading}
              error={error}
              brokerage={get(data, 'brokerage.nodes.0', {})}
            />
          )
        }
      </Query>
    );
  }
  return GetBrokerageHOC;
};
