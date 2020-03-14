import React from 'react';
import { FormattedMessage } from 'react-intl';

export default {
  EMPTY_EMAIL: <FormattedMessage id="empty-email" defaultMessage="Please input an email" />,
  EMPTY_FIRST_NAME: <FormattedMessage id="empty-first-name" defaultMessage="Please input a first name" />,
  EMPTY_LAST_NAME: <FormattedMessage id="empty-last-name" defaultMessage="Please input a last name" />,
  INVALID_EMAIL: <FormattedMessage id="invalid-email" defaultMessage="Email is invalid" />,
  REQUEST_ERROR: <FormattedMessage id="request-error" defaultMessage="Sorry, there was an error processing your request!" />,
  EMPTY_BROKERAGE: <FormattedMessage id="empty-brokerage" defaultMessage="Please choose the brokerage from the dropdown list" />,
};
