import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import * as React from 'react';
import { docDataFragment } from '../fragments/docData';
import type { DocData } from '../fragments/docData';

export type UpdateDocDataInput = {
  docDataName?: string,
  valueType?: number,
  value?: string,
  affectsSignature?: boolean,
  required?: boolean,
  minLen?: number,
  maxLen?: number,
}

export type UpdateDocDataResponse = {
  data: ?DocData
};

const updateDocData = gql`
  mutation updateDocData($id: Int!, $docData: UpdateDocDataInput!) {
    updateDocData(id: $id, docData: $docData) {
      ...docData 
    }
  }
  ${docDataFragment}
`;

const updateDocDataOptions = {
  props: ({ mutate }) => ({
    updateDocData: input => mutate({
      variables: {
        ...input,
      },
    }),
  }),
};

export default (graphql(updateDocData, updateDocDataOptions): React.Element);
