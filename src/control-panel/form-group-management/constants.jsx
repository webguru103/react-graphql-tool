import React from 'react';
import { FormattedMessage } from 'react-intl';

export const FORM_GROUP_VISIBILITY = {
  EVERYONE: 'EVERYONE',
  OREA: 'OREA',
  TREB: 'TREB',
  LSTAR: 'LSTAR',
  NO_ONE: 'NO_ONE',
};

export default {
  EMPTY_GROUP_NAME: <FormattedMessage id="empty-group-name" defaultMessage="Please input a group name" />,
  EMPTY_VISIBILITY: <FormattedMessage id="empty-visibility" defaultMessage="Please input a visibility selection" />,
  GROUP_NAME_NOT_UNIQUE: <FormattedMessage id="group-name-not-unique" defaultMessage="Group Name is not unique" />,
  GROUP_CREATED_SUCCESSFULLY: <FormattedMessage id="group-created-successfully" defaultMessage="Form group created successfully" />,
  REQUEST_ERROR: <FormattedMessage id="request-error" defaultMessage="Sorry, there was an error processing your request!" />,
  CANCEL: <FormattedMessage id="cancel" defaultMessage="Cancel" />,
  CONFIRM: <FormattedMessage id="confirm" defaultMessage="Confirm" />,
  SETTINGS: <FormattedMessage id="settings" defaultMessage="Settings" />,
  FORM_GROUP_UPDATED: <FormattedMessage id="form_group_updated" defaultMessage="Succesfully Updated Form Group" />,
};
