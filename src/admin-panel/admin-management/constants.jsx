import React from 'react';
import { FormattedMessage } from 'react-intl';

const DEFAULT_PAGE_SIZE = 10;

export default {
  DEFAULT_PAGE_SIZE,
  REQUEST_ERROR: <FormattedMessage id="request-error" defaultMessage="Sorry, there was an error processing your request!" />,
  SUCCESS_INVITE: <FormattedMessage id="success-invite" defaultMessage="The admin has been successfully invited" />,
};
