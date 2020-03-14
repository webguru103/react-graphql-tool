import React from 'react';
import { FormattedMessage } from 'react-intl';

export default {
  NETWORK_ERROR: <FormattedMessage id="network-error" defaultMessage="Something went wrong, try again later" />,
  NO_EMAILS: <FormattedMessage id="no-emails" defaultMessage="Please input an email" />,
  NO_BROKERAGE: <FormattedMessage id="no-brokerage" defaultMessage="Please select brokerage" />,
  INVALID_EMAILS: <FormattedMessage id="invalid-emails" defaultMessage="Please input valid emails separated with comma or return" />,
  REQUEST_ERROR: <FormattedMessage id="request-error" defaultMessage="Sorry, there was an error processing your request!" />,
  SUCCESSFULY_SENT:
    (amount: number) => (
      <FormattedMessage
        id="successfuly-sent-invites"
        defaultMessage="Successfuly sent {amount} invite(s)"
        values={{ amount }}
      />
    ),
  COULD_NOT_SEND: <FormattedMessage id="couldnot-send-invite" defaultMessage="Could not send invite to the following agents: " />,
};
