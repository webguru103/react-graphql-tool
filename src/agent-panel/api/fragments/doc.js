import gql from 'graphql-tag';
import { docPageFragment } from './docPage';
import { docDataFragment } from './docData';
import type { DocPage } from './docPage';
import type { DocData } from './docData';

export type DocBasic = {
  id: number,
  name?: string,
  transactionId?: number,
  transactionSessionId?: number,
  createdBy?: number,
  updatedBy?: number,
  sourceURL?: string,
  createdAt?: Date,
  updatedAt?: Date,
}

export type Doc = {
  ...$Exact<DocBasic>,

  pages: {
    nodes: Array<?DocPage>,
    totalCount: number,
  },

  data: {
    nodes: Array<?DocData>,
    totalCount: number
  }
}

export const docBasicFragment = gql`
  fragment docBasic on Doc {
    id
    name: docName
    transactionId
    transactionSessionId
    createdBy
    updatedBy
    sourceURL
    createdAt
    updatedAt
  }
`;

export const docFragment = gql`
  fragment doc on Doc {
    ...docBasic
    pages: docPagesByDocId {
      nodes {
        ...docPage
      }
      totalCount
    }
    
    data: docDataByDocId {
      nodes {
        ...docData
      }
      totalCount
    }
  }
  ${docBasicFragment}
  ${docPageFragment}
  ${docDataFragment}
`;
