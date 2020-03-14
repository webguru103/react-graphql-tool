import React from 'react';
import { FormattedMessage } from 'react-intl';

// TODO: create utility function to create FormattedMessages on demand, so all these are not stored in memory
// eg. to call translated text, just call function with id: trans('id', 'd'efaultMessage'), and will return:
// <FormattedMessage id="id" defaultMessage="defaultMessage" />

const DEFAULT_PAGE_SIZE = 15;

export default {
  DEFAULT_PAGE_SIZE,
  ERROR_RENAMING_TRANSACTION: <FormattedMessage id="error-renaming-transaction" defaultMessage="Sorry, error renaming transaction!" />,
  ERROR_DELETING_TRANSACTION: <FormattedMessage id="error-deleting-transaction" defaultMessage="Sorry, error deleting transaction!" />,
  ADD_NEW_NAME: <FormattedMessage id="add-new-name" defaultMessage="Please add a new name" />,
  RENAME_DIALOG_SUBMIT: <FormattedMessage id="rename-dialog-submit" defaultMessage="Done" />,
  RENAME_ITEM_DIALOG_HEADER: <FormattedMessage id="rename-item-dialog-header" defaultMessage="Rename Item:" />,
  TABLE_HEAD_NAME: <FormattedMessage id="table-head-name" defaultMessage="Name" />,
  TABLE_HEAD_OWNER: <FormattedMessage id="table-head-owner" defaultMessage="Owner" />,
  TABLE_HEAD_LAST_MODIFIED: <FormattedMessage id="table-head-last-modified" defaultMessage="Last Modified" />,
  MENU_RENAME: <FormattedMessage id="menu-rename" defaultMessage="Rename" />,
  MENU_COPY: <FormattedMessage id="menu-copy" defaultMessage="Copy" />,
  MENU_DELETE: <FormattedMessage id="menu-delete" defaultMessage="Delete" />,
  ENTER_TRANSACTION_NAME: <FormattedMessage id="empty-transaction-name" defaultMessage="Enter transaction name" />,
  NO_FORM_SELECTED: <FormattedMessage id="no-form-selected" defaultMessage="Select at least one form" />,
};
