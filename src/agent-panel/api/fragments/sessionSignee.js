import gql from 'graphql-tag';
import userFragment from './user';
import type { User } from './user';

export type SessionSignee = {
  id: number,
  userId?: number,
  transactionSessionId?: number,
  sessionSigneeName?: string,
  viewedAt?: number,
  signedAt?: number,

  userByUserId: ?User

  // transactionSessionByTransactionSessionId crossreference issue
}

export const sessionSigneeFragment = gql`
  fragment sessionSignee on SessionSignee {
    id
    userId
    transactionSessionId
    sessionSigneeName
    viewedAt
    signedAt

    userByUserId {
      ...user
    }
  }
  ${userFragment}
`;
