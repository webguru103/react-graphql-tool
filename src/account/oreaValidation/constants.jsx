import React from 'react';
import { FormattedMessage } from 'react-intl';

const DEFAULT_PAGE_SIZE = 10;

const ENVIRONMENTS = {
  DEV: 'DEV',
  SIT: 'SIT',
  QA: 'QA',
  PROD: 'PROD',
};

export default {
  DEFAULT_PAGE_SIZE,
  ENVIRONMENTS,
  CANNOT_REACH_TITLE: <FormattedMessage id="cannot-reach-title" defaultMessage="We couldn&#39;t reach OREA" />,
  MAKE_REQUEST_MSG: <FormattedMessage
    id="make-request-msg"
    defaultMessage="In order to continue,
    we need to verify your identity with OREA.
    Please click the button below to verify
    your identity."
  />,
  FIRST_LOGIN_MSG_ACCENT: <FormattedMessage
    id="first-login-msg-accent"
    defaultMessage="In order to use OREA forms, "
  />,
  FIRST_LOGIN_MSG: <FormattedMessage
    id="first-login-msg"
    defaultMessage="you need to verify your identity with OREA.
    Please click the button below to verify
    your identity."
  />,
  MAKE_REQUEST_TITLE: <FormattedMessage id="make-request-title" defaultMessage="Identity verification" />,
  CANNOT_REACH_MSG: <FormattedMessage
    id="cannot-reach-msg"
    defaultMessage="Sorry, but we were not able to reach
    OREA at this moment. You can go back and
    try again, or verify later in your account settings."
  />,
  DO_IT_LATER: <FormattedMessage id="do-it-later" defaultMessage="Do It Later" />,
  TRY_AGAIN: <FormattedMessage id="try-again" defaultMessage="Try Again" />,
  DO_IT_LATER_MSG: <FormattedMessage id="do-it-later-msg" defaultMessage="You can validate with OREA anytime in the Account Settings page." />,
  OK: <FormattedMessage id="ok-button" defaultMessage="OK" />,
  CANCEL: <FormattedMessage id="cancel-button" defaultMessage="Cancel" />,
  ILL_DO_IT_LATER: <FormattedMessage id="do-it-later-button" defaultMessage="I'll do it later." />,
  GO_TO_OREA: <FormattedMessage id="go-to-orea" defaultMessage="Go to OREA validation page" />,
  VER_FAILURE_MSG: <FormattedMessage
    id="ver-failure-msg"
    defaultMessage="Sorry, but we were not able to verify your identity with OREA. Please check your information and try again."
  />,
  VER_FAILURE_TITLE: <FormattedMessage id="ver-failure-title" defaultMessage="Verification failed" />,
  VER_SUCCESS_MSG: <FormattedMessage id="ver-sucess-msg" defaultMessage="Your identity has been successfully verified through OREA." />,
  VER_SUCCESS_TITLE: <FormattedMessage id="ver-sucess-title" defaultMessage="OREA verificiation successful" />,
  DONE: <FormattedMessage id="done-button" defaultMessage="Done" />,
};
