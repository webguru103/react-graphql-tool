import { FormattedMessage } from 'react-intl';
import * as React from 'react';

export const SIGNEE_NAME_MAX_LENGTH = 80;
export const EMAIL_MAX_LENGTH = 40;

export const messages = {
  FULL_NAME_REQUIRED: <FormattedMessage id="full-name-required" defaultMessage="Please enter full name" />,
  EMAIL_IS_REQUIRED: <FormattedMessage id="email-required" defaultMessage="Please enter email" />,
  EMAIL_IS_WRONG: <FormattedMessage id="email-wrong" defaultMessage="Email is not valid" />,
  AT_LEAST_ONE_SIGNEE: <FormattedMessage id="at-least-one-signee" defaultMessage="Please add at least one signee" />,
  FULL_NAME_NOT_VALID: <FormattedMessage id="full-name-not-valid" defaultMessage="Full name must consist of two or more words" />,
  SOMETHING_WENT_WRONG: <FormattedMessage id="something-went-wrong" defaultMessage="Something went wrong, try again later" />,
  NAMES_NOT_UNIQUE: <FormattedMessage id="names-not-unique" defaultMessage="Names should be unique" />,
  EMAIL_NOT_UNIQUE: <FormattedMessage id="emails-not-unique" defaultMessage="Emails should be unique" />,
  EMAIL_TITLE_EMPTY: <FormattedMessage id="email-title-empty" defaultMessage="Please enter an email title" />,
  DOCUMENTS_SENT_FOR_SIGNING: (
    <FormattedMessage
      id="documents-sent-for-signing"
      defaultMessage="Your documents were sent for signing. We will email you when the documents are viewed or signed."
    />),
  DOCUMENTS_COMPLETED_NOTICE: (
    <FormattedMessage
      id="documents-completed-notice"
      defaultMessage="Your documents were completed. You can view them in the signing sessions list."
    />),
  VIEW_SIGNING_SESSIONS: <FormattedMessage id="view-signing-sessions" defaultMessage="View Signing Sessions" />,
  DOCUMENTS_COMPLETED: <FormattedMessage id="documents-completed" defaultMessage="Documents were completed!" />,
  DOCUMENTS_SENT: <FormattedMessage id="documents-sent" defaultMessage="Documents were successfully sent!" />,
  CONFIRMATION: <FormattedMessage id="confirmation" defaultMessage="Confirmation" />,
  SIGNEE_NAME_TOO_LONG: <FormattedMessage id="name-too-long" defaultMessage="Name is too long" />,
  EMAIL_TOO_LONG: <FormattedMessage id="email-too-long" defaultMessage="Email is too long" />,
};
