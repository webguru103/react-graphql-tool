import React from 'react';
import { FormattedMessage } from 'react-intl';

export const FORM_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
};

export const MAX_UPLOAD_SIZE = 25 * 1024 * 1024;
export const PDF = 'application/pdf';

export default {
  NEW_FORM: <FormattedMessage id="new-form" defaultMessage="New Form" />,
  UPLOAD_LABEL: <FormattedMessage id="upload-label" defaultMessage="Upload PDF" />,
  FORM_NAME: <FormattedMessage id="form-name" defaultMessage="Form Name" />,
  NO_FORM_BASE_UPLOADED: <FormattedMessage id="no-pdf-uploaded" defaultMessage="Please upload the form base" />,
  START_EDITING: <FormattedMessage id="start-editing" defaultMessage="Start Editing" />,
  EMPTY_FORM_NAME: <FormattedMessage id="empty-form-name" defaultMessage="Please input the form name" />,
  FORM_NAME_LENGTH: 64,
  FORM_NAME_TOO_LONG: <FormattedMessage id="form-name-too-long" defaultMessage="Sorry, name must be less than 64 characters" />,
  FORM_UPDATED: <FormattedMessage id="form-updated" defaultMessage="Form updated" />,
  NETWORK_ERROR: <FormattedMessage id="network-error" defaultMessage="Some network error occurred, try again later." />,
  NOT_EMPTY: <FormattedMessage id="form-name-empty" defaultMessage="Should not be empty" />,
  ACTIVE: <FormattedMessage id="active" defaultMessage="Active" />,
  INACTIVE: <FormattedMessage id="inactive" defaultMessage="Inactive" />,
};
