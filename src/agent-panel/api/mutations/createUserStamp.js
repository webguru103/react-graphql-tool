import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import * as React from 'react';
import { userStampsFragment } from '../fragments/userStamps';
import type { UserStamps } from '../fragments/userStamps';

export type UserStampInput = {
  stamp: string,
}

export type CreateUserStampResponse = {
  UserStamps: UserStamps,
};

const createUserStamp = gql`
  mutation createUserStamp($userSignature: UserStampInput! $userInitial: UserStampInput!) {
    createUserStamp(userSignature: $userSignature, userInitial: $userInitial) {
      ...userStamps
    }
  }
  ${userStampsFragment}
`;

const createUserStampOptions = {
  props: ({ mutate }) => ({
    createUserStamp: input => mutate({
      variables: {
        ...input,
      },
    }),
  }),
};

export default (graphql(createUserStamp, createUserStampOptions): React.Element);
