import * as React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const completeSigning = gql`
  mutation completeSigning {
    completeSigning 
  }
`;

const completeSigningOptions = {
  props: ({ mutate }) => ({
    completeSigning: input => mutate({
      variables: {
        ...input,
      },
    }),
  }),
};

export default (graphql(completeSigning, completeSigningOptions): React.Element);
