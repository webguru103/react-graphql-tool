import { FormattedMessage } from 'react-intl';
import * as React from 'react';

export const messages = {
  SIGNING_COMPLETED: <FormattedMessage id="signing-completed" defaultMessage="Signing Completed!" />,
  WE_WILL_SEND_COPY: (
    <FormattedMessage
      id="we-will-send-copy"
      defaultMessage="We will send you a copy when all signees have signed."
    />
  ),
  VIEW_DOCUMENT: (
    <FormattedMessage
      id="view-document"
      defaultMessage="View Document"
    />
  ),
  CLOSE_WINDOW: (
    <FormattedMessage
      id="close-window"
      defaultMessage="Close Window"
    />
  ),
};
