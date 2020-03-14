import React from 'react';
import { FormattedMessage } from 'react-intl';

const DEFAULT_PAGE_SIZE = 10;

export default {
  DEFAULT_PAGE_SIZE,
  INVITES_SUCCESSFULY_SENT:
    (amount: number) => (amount === 1
      ? <FormattedMessage id="successfuly-sent-invite" defaultMessage="Invite has been sent" />
      : <FormattedMessage id="successfuly-sent-invites" defaultMessage="Successfuly sent {amount} invites" values={{ amount }} />),
};
