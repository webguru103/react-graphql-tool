import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import * as React from 'react';
import { docDataFragment } from '../fragments/docData';
import type { DocData } from '../fragments/docData';

export type CreateDocDataInput = {
  docDataName?: string,
  docId: number,
  valueType?: number,
  value?: string,
  affectsSignature: boolean,
  required: boolean,
  minLen?: number,
  maxLen?: number,
  assignee: string,
}

export type CreateDocDataResponse = {
  data: {
    createDocData: ?DocData,
  },
};

const createDocData = gql`
  mutation createDocData($docData: DocDataInput!) {
    createDocData(docData: $docData) {
      ...docData
    }
  }
  ${docDataFragment}
`;

const createDocDataOptions = {
  props: ({ mutate }) => ({
    createDocData: input => mutate({
      variables: {
        ...input,
      },
    }),
  }),
};

export default (graphql(createDocData, createDocDataOptions): React.Element);
