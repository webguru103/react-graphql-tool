import * as React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const sendSigningEmails = gql`
  mutation sendSigningEmails($transactionSessionId: Int!, $emailTitle: String!, $emailBody: String!) {
    sendSigningEmails(transactionSessionId: $transactionSessionId, emailTitle: $emailTitle, emailBody: $emailBody)
  }
`;

const sendSigningEmailOptions = {
  props: ({ mutate }) => ({
    sendSigningEmails: input => mutate({
      variables: {
        ...input,
      },
    }),
  }),
};

export default (graphql(sendSigningEmails, sendSigningEmailOptions): React.Element);
