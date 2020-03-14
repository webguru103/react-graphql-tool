import React from 'react';
import { FormattedMessage } from 'react-intl';

const DEFAULT_PAGE_SIZE = 10;

export default {
  DEFAULT_PAGE_SIZE,
  INVITES_SUCCESSFULY_SENT:
    (amount: number) => (amount === 1
      ? <FormattedMessage id="successfuly-sent-invite" defaultMessage="Invite has been sent" />
      : <FormattedMessage id="successfuly-sent-invites" defaultMessage="Successfuly sent {amount} invites" values={{ amount }} />),
  NO_EMAILS: <FormattedMessage id="no-emails" defaultMessage="Please input an email" />,
  INVALID_EMAILS: <FormattedMessage id="invalid-emails" defaultMessage="Please input valid emails separated with comma or return" />,
  REQUEST_ERROR: <FormattedMessage id="request-error" defaultMessage="Sorry, there was an error processing your request!" />,
  COULD_NOT_SEND: <FormattedMessage id="couldnot-send-invite" defaultMessage="Could not send invite to the following agents: " />,
};
