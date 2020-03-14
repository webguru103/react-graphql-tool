import React from 'react';
import { FormattedMessage } from 'react-intl';

const DEFAULT_PAGE_SIZE = 10;

export default {
  DEFAULT_PAGE_SIZE,
  INVALID_EMAIL: <FormattedMessage id="invalid-email" defaultMessage="Please check the email format" />,
  EMPTY_EMAIL: <FormattedMessage id="empty-email" defaultMessage="Please input an email" />,
  EMPTY_FIRST_NAME: <FormattedMessage id="empty-first-name" defaultMessage="Please input a first name" />,
  EMPTY_LAST_NAME: <FormattedMessage id="empty-last-name" defaultMessage="Please input a last name" />,
  EMAIL_ALREADY_EXISTS: <FormattedMessage id="email-already-exists" defaultMessage="Email already exists as a CP User" />,
  REQUEST_ERROR: <FormattedMessage id="request-error" defaultMessage="Sorry, there was an error processing your request!" />,
  INVITE_SENT: <FormattedMessage id="invite-sent" defaultMessage="Invitation Sent!" />,
  USER_WILL_BE_REMOVED: <FormattedMessage id="user-will-be-removed" defaultMessage="This user will no longer have access to Control Panel" />,
  CP_USER_REMOVED: <FormattedMessage id="cp-user-removed" defaultMessage="CP User Removed" />,
  REMOVE_CP_USER: <FormattedMessage id="remove-cp-user" defaultMessage="Remove" />,
};
