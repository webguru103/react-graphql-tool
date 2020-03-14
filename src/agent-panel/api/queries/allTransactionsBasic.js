import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { transactionBasicFragment } from '../fragments/transaction';
import { transactionSessionBasicFragment } from '../fragments/transactionSession';
import { docBasicFragment } from '../fragments/doc';
import type { TransactionBasic } from '../fragments/transaction';
import type { TransactionSessionBasic } from '../fragments/transactionSession';
import type { DocBasic } from '../fragments/doc';
import { sessionSigneeFragment } from '../fragments/sessionSignee';
import type { SessionSignee } from '../fragments/sessionSignee';

export type AllTransactionsBasicResponse = {
  allTransactions: {
    nodes: Array<{
      ...$Exact<TransactionBasic>,
      transactionSessionsByTransactionId: {
        nodes: {
          ...$Exact<TransactionSessionBasic>,

          docsByTransactionSessionId: {
            nodes: Array<?DocBasic>,
            totalCount: number,
          },

          sessionSigneesByTransactionSessionId: {
            nodes: Array<?SessionSignee>,
            totalCount: number,
          },
        }
      }
    }>
  },
  loading: boolean,
}

const allTransactionsBasic = gql`
  query allTransactions($first: Int, $last: Int, $offset: Int, $condition: TransactionCondition, $orderBy: [TransactionsOrderBy!]) {
    allTransactions(first: $first, last: $last, offset: $offset, condition: $condition, orderBy: $orderBy) {
      nodes {
        ...transactionBasic

        transactionSessionsByTransactionId {
          nodes {
            ...transactionSessionBasic

            docsByTransactionSessionId {
              nodes {
                ...docBasic
              }
              totalCount
            }

            sessionSigneesByTransactionSessionId {
              nodes {
                ...sessionSignee
              }
              totalCount
            }
          }
        }
      }
      totalCount
    }
  }
  ${transactionBasicFragment}
  ${transactionSessionBasicFragment}
  ${docBasicFragment}
  ${sessionSigneeFragment}
`;

const getAllTransactionsBasicOptions = {
  options: () => ({
    variables: {
      orderBy: ['CREATED_AT_DESC'],
    },
    fetchPolicy: 'no-cache',
  }),
};

export const getAllTransactionsBasic = (graphql(allTransactionsBasic, getAllTransactionsBasicOptions): React.Element);
