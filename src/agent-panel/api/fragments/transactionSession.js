import gql from 'graphql-tag';
import { sessionSigneeFragment } from './sessionSignee';
import { docFragment } from './doc';
import userFragment from './user';
import type { SessionSignee } from './sessionSignee';
import type { Doc } from './doc';
import type { User } from './user';

export type TransactionSessionBasic = {
  id: number,
  transactionSessionName?: string,
  transactionId?: number,
  createdBy?: number,
  emailTitle?: string,
  emailBody?: string,
  prepComplete?: boolean,
  createdAt?: number,
}

export type TransactionSession = {
  ...$Exact<TransactionSessionBasic>,

  sessionSigneesByTransactionSessionId: {
    nodes: Array<?SessionSignee>,
    totalCount: number,
  },

  docsByTransactionSessionId: {
    nodes: Array<?Doc>,
    totalCount: number,
  },

  userByCreatedBy: {
    ...User
  }
}

export const transactionSessionBasicFragment = gql`
  fragment transactionSessionBasic on TransactionSession {
    id
    transactionSessionName
    transactionId
    createdBy
    emailTitle
    emailBody
    prepComplete
    createdAt
  }
`;

export const transactionSessionSigneesFragment = gql`
  fragment transactionSessionSignees on TransactionSession {
    sessionSigneesByTransactionSessionId {
      nodes {
        ...sessionSignee
      }
      totalCount
    }
  }
  ${sessionSigneeFragment}
`;

export const transactionSessionDocsFragment = gql`
  fragment transactionSessionDocs on TransactionSession {
    docsByTransactionSessionId {
      nodes {
        ...doc
      }
      totalCount
    }
  }
  ${docFragment}
`;

export const transactionSessionUserFragment = gql`
  fragment transactionSessionUser on TransactionSession {
    userByCreatedBy {
      ...user
    }
  }
  ${userFragment}
`;

export const transactionSessionFragment = gql`
  fragment transactionSession on TransactionSession {
    ...transactionSessionBasic
    ...transactionSessionSignees
    ...transactionSessionDocs
    ...transactionSessionUser
  }
  ${transactionSessionBasicFragment}
  ${transactionSessionDocsFragment}
  ${transactionSessionSigneesFragment}
  ${transactionSessionUserFragment}
`;
