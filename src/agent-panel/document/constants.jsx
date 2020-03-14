import React from 'react';
import { FormattedMessage } from 'react-intl';

// TODO: create utility function to create FormattedMessages on demand, so all these are not stored in memory
// eg. to call translated text, just call function with id: trans('id', 'd'efaultMessage'), and will return:
// <FormattedMessage id="id" defaultMessage="defaultMessage" />

const DEFAULT_PAGE_SIZE = 15;

export default {
  DEFAULT_PAGE_SIZE,
  ERROR_DELETING_DOCUMENT: <FormattedMessage id="error-deleting-document" defaultMessage="Sorry, error deleting document!" />,
  TABLE_HEAD_NAME: <FormattedMessage id="table-head-name" defaultMessage="Name" />,
  TABLE_HEAD_OWNER: <FormattedMessage id="table-head-owner" defaultMessage="Owner" />,
  TABLE_HEAD_LAST_MODIFIED: <FormattedMessage id="table-head-last-modified" defaultMessage="Last Modified" />,
  MENU_COPY: <FormattedMessage id="menu-copy" defaultMessage="Copy" />,
  MENU_DELETE: <FormattedMessage id="menu-delete" defaultMessage="Delete" />,
  NO_FORM_SELECTED: <FormattedMessage id="no-form-selected" defaultMessage="Select at least one form" />,
};
