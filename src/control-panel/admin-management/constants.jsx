import React from 'react';
import { FormattedMessage } from 'react-intl';

const DEFAULT_PAGE_SIZE = 10;

export default {
  DEFAULT_PAGE_SIZE,
  INVALID_EMAIL: <FormattedMessage id="invalid-email" defaultMessage="Please check the email format" />,
  EMPTY_EMAIL: <FormattedMessage id="empty-email" defaultMessage="Please input an email" />,
  EMPTY_FIRST_NAME: <FormattedMessage id="empty-first-name" defaultMessage="Please input a first name" />,
  EMPTY_LAST_NAME: <FormattedMessage id="empty-last-name" defaultMessage="Please input a last name" />,
  REQUEST_ERROR: <FormattedMessage id="request-error" defaultMessage="Sorry, there was an error processing your request!" />,
  SUCCESSFULLY_INVITED: <FormattedMessage id="successfully-invited" defaultMessage="The invite has been sent" />,
};
