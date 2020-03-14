import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { transactionFragment } from '../fragments/transaction';
import type { Transaction } from '../fragments/transaction';

export type AllTransactionsResponse = {
  allTransactions: {
    nodes: Array<?Transaction>
  },
  loading: boolean,
}

const allTransactionsQuery = gql`
  query allTransactions($first: Int, $last: Int, $offset: Int, $condition: TransactionCondition, $orderBy: [TransactionsOrderBy!]) {
    allTransactions(first: $first, last: $last, offset: $offset, condition: $condition, orderBy: $orderBy) {
      nodes {
        ...transaction
      }
      totalCount
    }
  }
  ${transactionFragment}
`;

const getAllTransactionsOptions = {
  options: () => ({
    variables: {
      orderBy: ['CREATED_AT_DESC'],
    },
    fetchPolicy: 'no-cache',
  }),
};

const getTransactionByIdOptions = {
  options: ({ transactionId }) => ({
    variables: {
      condition: {
        id: transactionId,
      },
    },
    fetchPolicy: 'no-cache',
  }),
};

export const getTransactionById = (graphql(allTransactionsQuery, getTransactionByIdOptions): React.Element);
export const getAllTransactions = (graphql(allTransactionsQuery, getAllTransactionsOptions): React.Element);
