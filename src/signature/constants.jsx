import { FormattedMessage } from 'react-intl';
import React from 'react';

export const messages = {
  WRONG_SIGNATURE_VALIDATION: <FormattedMessage id="wrong-username-password" defaultMessage="Wrong Signature ID" />,
  WRONG_CERTIFICATE_ERROR: <FormattedMessage id="wrong-detail" defaultMessage="Can't get the certificate details! Try to input the Signature ID" />,
};

export const CERTIFICATE_ERROR_MESSAGE = 'Wrong Signature ID or signature hasn\'t been published yet.';

export const labels = {
  signature: 'Signature',
  title: 'Document Name',
  page: 'Page',
  signedEmail: 'Signed email',
  signedAs: 'Signed as',
  time: 'Time',
  uID: 'Unique ID',
  ip: 'IP Address',
  browser: 'Browser',
  os: 'OS',
};
