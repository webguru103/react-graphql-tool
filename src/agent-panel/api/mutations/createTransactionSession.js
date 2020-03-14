import * as React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {
  transactionSessionBasicFragment,
  transactionSessionDocsFragment,
  transactionSessionSigneesFragment,
} from '../fragments/transactionSession';
import type { TransactionSession } from '../fragments/transactionSession';

export type TransactionSessionInput = {
  transactionSessionName: string,
};

export type DocPageInput = {
  docId?: number,
  pageNumber: number,
  width: number,
  height: number,
}

export type DocInput = {
  docName: string,
  sourceURL: string,
  docPages: Array<DocPageInput>,
}

export type SessionSigneeInput = {
  email: string,
  sessionSigneeName: string,
}

export type CreateTransactionSessionResponse = {
  data: {
    createTransactionSession: TransactionSession,
  }
}

const createTransactionSession = gql`
  mutation createTransactionSession($transactionSession: TransactionSessionInput!, $docs: [DocInput!]!, $sessionSignees: [SessionSigneeInput!]!) {
    createTransactionSession(transactionSession: $transactionSession, docs: $docs, sessionSignees: $sessionSignees) {
      ...transactionSessionBasic
      ...transactionSessionSignees
      ...transactionSessionDocs
    }
  }
  ${transactionSessionBasicFragment}
  ${transactionSessionSigneesFragment}
  ${transactionSessionDocsFragment}
`;

const createTransactionSessionOptions = {
  props: ({ mutate }) => ({
    createTransactionSession: input => mutate({
      variables: {
        ...input,
      },
    }),
  }),
};

export default (graphql(createTransactionSession, createTransactionSessionOptions): React.Element);
