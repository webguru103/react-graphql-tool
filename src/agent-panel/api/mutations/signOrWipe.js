import * as React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export type StampType = 'SIGNATURE' | 'INITIAL';

export type SignOrWipeFieldResponse = {
  data: {
    signOrWipeField: ?string,
  },
}

const signOrWipeField = gql`
  mutation signOrWipeField($fieldId: Int!, $dataReference: Int!, $docId: Int!, $stampType: StampType!, $wipeField: Boolean!) {
    signOrWipeField(fieldId: $fieldId, dataReference: $dataReference, docId: $docId, stampType: $stampType, wipeField: $wipeField)
  }
`;

const signOrWipeFieldOptions = {
  props: ({ mutate }) => ({
    signOrWipeField: input => mutate({
      variables: {
        ...input,
      },
    }),
  }),
};

export default (graphql(signOrWipeField, signOrWipeFieldOptions): React.Element);
