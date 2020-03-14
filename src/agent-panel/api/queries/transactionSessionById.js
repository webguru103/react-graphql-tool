import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { transactionSessionFragment } from '../fragments/transactionSession';
import type { TransactionSession } from '../fragments/transactionSession';

export type TransactionSessionByIdResponse = {
  transactionSessionById: ?{
    ...$Exact<TransactionSession>,
  },
  loading: boolean,
}

const transactionSessionByIdQuery = gql`
  query transactionSessionById($transactionSessionId: Int) {
    transactionSessionById(transactionSessionId: $transactionSessionId) {
      ...transactionSession
    }
  }
  ${transactionSessionFragment}
`;

const transactionSessionByIdOptions = {
  options: ({ match: { params: { transactionSessionId } } }) => ({
    variables: {
      transactionSessionId,
    },
    fetchPolicy: 'no-cache',
  }),
};

export const transactionSessionById = (graphql(transactionSessionByIdQuery, transactionSessionByIdOptions): React.Element);
