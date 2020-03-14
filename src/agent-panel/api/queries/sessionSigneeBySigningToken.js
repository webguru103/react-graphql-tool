import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { sessionSigneeFragment } from '../fragments/sessionSignee';
import { transactionSessionFragment } from '../fragments/transactionSession';
import type { SessionSignee } from '../fragments/sessionSignee';
import type { TransactionSession } from '../fragments/transactionSession';

export type SessionSigneeBySigningTokenResponse = {
  sessionSigneeBySigningToken: ?{
    ...$Exact<SessionSignee>,
    transactionSessionByTransactionSessionId: ?{
      ...$Exact<TransactionSession>
    },
  },
  loading: boolean,
}

const sessionSigneeBySigningTokenQuery = gql`
  query sessionSigneeBySigningToken {
    sessionSigneeBySigningToken {
      ...sessionSignee
      transactionSessionByTransactionSessionId {
        ...transactionSession
      }
    }
  }
  ${sessionSigneeFragment}
  ${transactionSessionFragment}
`;

const sessionSigneeBySigningTokenOptions = {
  options: () => ({
    fetchPolicy: 'no-cache',
  }),
};

export const sessionSigneeBySigningToken = (graphql(sessionSigneeBySigningTokenQuery, sessionSigneeBySigningTokenOptions): React.Element);
