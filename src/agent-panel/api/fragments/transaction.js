import gql from 'graphql-tag';
import {
  transactionSessionBasicFragment,
  transactionSessionDocsFragment,
  transactionSessionSigneesFragment,
} from './transactionSession';
import type { TransactionSession } from './transactionSession';

export type TransactionBasic = {
  id: number,
  transactionName: ?string,
  createdBy: ?number,
  createdAt: ?Date,
};

export type Transaction = {
  ...$Exact<TransactionBasic>,

  transactionSessionsByTransactionId: {
    nodes: Array<?TransactionSession>
  },
}

export const transactionBasicFragment = gql`
  fragment transactionBasic on Transaction {
    id
    transactionName
    createdBy
    createdAt
  }
`;

export const transactionFragment = gql`
  fragment transaction on Transaction {
    ...transactionBasic
    # add user
    
    transactionSessionsByTransactionId {
      nodes {
        ...transactionSessionBasic
        ...transactionSessionDocs
        ...transactionSessionSignees
      }
    }
  }
  ${transactionBasicFragment}
  ${transactionSessionBasicFragment}
  ${transactionSessionSigneesFragment}
  ${transactionSessionDocsFragment}
`;
