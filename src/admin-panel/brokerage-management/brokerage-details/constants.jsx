import React from 'react';
import { FormattedMessage } from 'react-intl';

const DEFAULT_PAGE_SIZE = 10;

export default {
  DEFAULT_PAGE_SIZE,
  EMPTY_BO_NAME: <FormattedMessage id="empty-bo-name" defaultMessage="Please input the brokerage office name" />,
  EMPTY_FIELD: <FormattedMessage id="empty-field" defaultMessage="Field cannot be empty" />,
  INVALID_PHONE_NUMBER: <FormattedMessage id="invalid-phone-number" defaultMessage="Invalid Phone Number" />,
  BO_EXISTS: <FormattedMessage id="bo-exists" defaultMessage="Brokerage Office already exists" />,
  EMAIL_EXISTS: <FormattedMessage id="email-exists" defaultMessage="User with that email already exists" />,
  BO_NAME_TOO_LONG: <FormattedMessage id="bo-name-too-long" defaultMessage="Sorry, brokerage office name must be less than 64 characters" />,
  ERROR_ADDING_BO: <FormattedMessage id="error-adding-bo" defaultMessage="Sorry, there was an error adding your brokerage office!" />,
  ERROR_ADDING_ADMIN: <FormattedMessage id="error-adding-admin" defaultMessage="Sorry, there was an error adding your user!" />,
  ERROR_UPDATING_BO: <FormattedMessage id="error-updating-bo" defaultMessage="Sorry, there was an error updating your brokerage office!" />,
  SETTINGS: <FormattedMessage id="settings" defaultMessage="Settings" />,
  SET_SUPER: <FormattedMessage id="set-super" defaultMessage="Set Super Admin" />,
  NEW_BO: <FormattedMessage id="new-bo" defaultMessage="New Brokerage Office" />,
  UPDATE_BO: <FormattedMessage id="update-bo" defaultMessage="Edit Brokerage Office" />,
  CREATE: <FormattedMessage id="create" defaultMessage="Create" />,
  SUBMIT: <FormattedMessage id="submit" defaultMessage="Submit" />,
  NEXT: <FormattedMessage id="next" defaultMessage="Next" />,
};
