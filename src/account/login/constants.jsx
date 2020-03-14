import { FormattedMessage } from 'react-intl';
import React from 'react';

export const messages = {
  ACCOUNT_NOT_VERIFIED:
  <FormattedMessage
    id="account-not-verified"
    defaultMessage="We noticed you still haven't verified your email address. We have sent another verification email. Please check your inbox."
  />,
  USER_NOT_EXISTS: <FormattedMessage id="user-not-exists" defaultMessage="Sorry, we couldn’t recognize this email" />,
  EMAIL_NOT_VALID: <FormattedMessage id="email-not-valid" defaultMessage="Please input a valid email address." />,
  EMAIL_EMPTY: <FormattedMessage id="email-empty" defaultMessage="Please input your email address" />,
  VERIFY_EMAIL: <FormattedMessage id="verify-email" defaultMessage="Verify your email" />,
  NETWORK_ERROR: <FormattedMessage id="network-message" defaultMessage="Some error occurred, try again later" />,
};
