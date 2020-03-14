import * as React from 'react';
import { Query } from 'react-apollo';
import userStampByHashQuery from './userStampByHash.query.graphql';

export const withUserStampByHash = (Component: React.Element) => {

  type PropType = {
    match: {
      params: {
        id: string,
      }
    },
    stampHash: string,
    handleCertificateError: (stamp: string) => void
  }

  function UserStampByHashHOC({ stampHash, handleCertificateError, ...rest }: PropType) {
    return (
      <Query query={userStampByHashQuery} variables={{ stampHash }}>
        {({
          loading,
          error,
          data,
          ...others
        }) => {
          const stamp = {
            handleCertificateError,
            loading,
            error,
            data,
            ...others,
            ...rest,
          };
          return (
            <Component
              {...stamp}
            />
          );
        }}
      </Query>
    );
  }

  return UserStampByHashHOC;
};
