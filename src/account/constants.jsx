import { FormattedMessage } from 'react-intl';
import React from 'react';

export const messages = {
  SIGN_UP: <FormattedMessage id="sign-up" defaultMessage="Sign Up" />,
  SIGN_UP_AS: <FormattedMessage id="sign-up-as" defaultMessage="Sign up as" />,
  INVITED_TO_SIGN_UP_AS: <FormattedMessage id="invited-to-sign-up" defaultMessage="You have been invited to sign up as:" />,
  ACTIVATING_ACCOUNT: <FormattedMessage id="activating-account" defaultMessage="Activating your account" />,
  ACCOUNT_ACTIVATED: <FormattedMessage id="account-activated" defaultMessage="Account activated" />,
  COULD_NOT_ACTIVATE: <FormattedMessage id="could-not-activate" defaultMessage="Could not activate account" />,
  PLEASE_WAIT: <FormattedMessage id="please-wait" defaultMessage="Please wait..." />,
  SUCCESSFULLY_ACTIVATED:
  <FormattedMessage id="successfully-activated" defaultMessage="Your account has been successfully activated. You can now log in." />,
  EMAIL_ALREADY_REGISTERED:
  <FormattedMessage id="email-already-registered" defaultMessage="You already have a DealTap account. Confirm your password to continue." />,
  EMAIL_ALREADY_TAKEN: <FormattedMessage id="email-already-taken" defaultMessage="This email is already taken. Please try another one." />,
  EMPTY_EMAIL: <FormattedMessage id="empty-email" defaultMessage="The email is empty" />,
  INVALID_EMAIL: <FormattedMessage id="invalid-email" defaultMessage="The email is invalid" />,
  NETWORK_ERROR: <FormattedMessage id="network-error" defaultMessage="Something went wrong, please try again later..." />,
  WRONG_USERNAME_PASSWORD: <FormattedMessage id="wrong-username-password" defaultMessage="Email or password is wrong" />,
  EMAIL_EMPTY: <FormattedMessage id="email-empty" defaultMessage="Please input your email address" />,
  EMAIL_DOESNT_EXIST: <FormattedMessage id="email-doesnt-exist" defaultMessage="Email address does not exist" />,
  EMAIL_RESENT: <FormattedMessage id="email-resent" defaultMessage="The email has been sent again. Please check your email" />,
  REQUEST_ERROR: <FormattedMessage id="request-error" defaultMessage="Sorry, there was an error processing your request!" />,
  REQUEST_BEING_PROCESSED: <FormattedMessage id="request-being-processed" defaultMessage="Your request is being processed." />,
  BROKERAGE_ACCEPTED: <FormattedMessage id="brokerage-accepted" defaultMessage="Invitation accepted" />,
  BROKERAGE_NOT_ACCEPTED: <FormattedMessage id="could-not-accept-brokerage" defaultMessage="Invitation not accepted" />,
  BROKERAGE_REJECTED: <FormattedMessage id="brokerage-rejected" defaultMessage="Invitation rejected" />,
  BROKERAGE_NOT_REJECTED: <FormattedMessage id="could-not-reject-brokerage" defaultMessage="Invitation not rejected" />,
  NO_INVITE_FOUND: <FormattedMessage id="could-not-find-invite" defaultMessage="No invite found." />,
  LINK_EXPIRED:
  <FormattedMessage id="link-expired" defaultMessage="It appears this link has already expired." />,
  JOINED_BROKERAGE_OFFICE: <FormattedMessage id="joined-brokerage" defaultMessage="Joined Brokerage Office" />,
  FAILED_TO_JOIN_BROKERAGE: <FormattedMessage id="failed-to-join-brokerage" defaultMessage="Failed To Join Brokerage Office" />,
  ALREADY_JOINED_A_BROKERAGE_OFFICE: <FormattedMessage id="already-joined-brokerage" defaultMessage="Already Joined a Brokerage Office" />,
  ALREADY_JOINED_A_BROKERAGE_OFFICE_MESSAGE: <FormattedMessage
    id="already-joined-brokerage-message"
    defaultMessage="It appears you have already joined a brokerage office as an agent."
  />,
  ALREADY_GRANTED_PERMISSION: <FormattedMessage id="already-granted-permission" defaultMessage="Already granted permission" />,
  ALREADY_HAVE_ACCESS: <FormattedMessage id="already-have-access" defaultMessage="Already Have Access" />,
  ALREADY_HAVE_ACCESS_MESSAGE: <FormattedMessage
    id="already-have-access-message"
    defaultMessage="It appears you already have access to Control Panel. Please log in instead."
  />,
  PERMISSION_GRANTED: <FormattedMessage id="permission-granted" defaultMessage="Permission Granted" />,
  FAILED_TO_GRANT_PERMISSION: <FormattedMessage id="failed-to-grant-permission" defaultMessage="Failed to Grant Permission" />,
  GET_AGENT_PANEL_ACCESS: <FormattedMessage id="get-agent-panel-access" defaultMessage="Get Agent Panel Access" />,
  GET_AGENT_PANEL_ACCESS_MESSAGE: <FormattedMessage
    id="get-agent-panel-access-message"
    defaultMessage="We already have your information since you have a DealTap account. Click confirm to get agent panel access."
  />,
  AGENT_IDENTITY_ADDED: <FormattedMessage id="agent-identity-added" defaultMessage="Agent Identity Added" />,
  AGENT_IDENTITY_ADDED_MESSAGE: <FormattedMessage id="agent-identity-added-message" defaultMessage="You can now access DealTap's agent panel." />,
  ACCOUNT_CREATED: <FormattedMessage id="account-created" defaultMessage="Account Created" />,
  ACCOUNT_CREATED_MESSAGE: <FormattedMessage id="account-created-message" defaultMessage="Your account has been created." />,
  FAILED_TO_RESET: <FormattedMessage id="failed-to-reject" defaultMessage="Failed to reset password" />,
  PASSWORD_RESET_SUCCESS_TITLE: <FormattedMessage id="password-reset-success-title" defaultMessage="Password has been reset" />,
  PASSWORD_RESET_SUCCESS_MESSAGE: <FormattedMessage
    id="password-reset-success-message"
    defaultMessage="Please log in to continue."
  />,
  RESET_PASSWORD: <FormattedMessage id="reset-password" defaultMessage="Reset Password" />,
};
