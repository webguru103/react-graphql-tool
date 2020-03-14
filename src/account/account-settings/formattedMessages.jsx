import React from 'react';
import { FormattedMessage } from 'react-intl';

export const messages = {
  NAME_REQUIRED: <FormattedMessage
    id="name-required"
    defaultMessage="Name is required"
  />,
  LAST_NAME_REQUIRED: <FormattedMessage
    id="last-name-required"
    defaultMessage="Last name is required"
  />,
  FIRST_NAME_TOO_LONG: <FormattedMessage
    id="first-name-too-long"
    defaultMessage="First name is too long, must be less than or equal to 40 characters"
  />,
  LAST_NAME_TOO_LONG: <FormattedMessage
    id="last-name-too-long"
    defaultMessage="Last name is too long, must be less than or equal to 40 characters"
  />,
  NAME_UPDATED_SUCCESSFULLY: <FormattedMessage
    id="name-updated-successfully"
    defaultMessage="Name updated successfully"
  />,
  PHONE_NUMBER_UPDATED_SUCCESSFULLY: <FormattedMessage
    id="phone-number-updated-successfully"
    defaultMessage="Phone number updated successfully"
  />,
  PASSWORD_UPDATED_SUCCESSFULLY: <FormattedMessage
    id="password-updated-successfully"
    defaultMessage="Password updated successfully"
  />,
  FAILED_TO_UPDATE_USER: <FormattedMessage
    id="failed-to-update-user"
    defaultMessage="Failed to update user"
  />,
  OLD_PASSWORD_DOES_NOT_MATCH: <FormattedMessage
    id="old-password-does-not-match"
    defaultMessage="Provided old password does not match"
  />,
  PASSWORD_NOT_CHANGED: <FormattedMessage
    id="password-not-changed"
    defaultMessage="The old and new passwords are the same."
  />,
};
