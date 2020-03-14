import * as React from 'react';
import LoginLayout from './loginLayout/loginLayout';
import AgentSignup from './agentSignUp/agentSignUp';
import InvitedToSignUpNew from './invitedToSignUp/invitedToSignUpNew';
import InvitedToSignUpExisting from './invitedToSignUp/invitedToSignUpExisting';
import UserActivation from './userActivation';
import ResetPassword from './resetPassword/resetPassword';
import ForgotPassword from './forgotPassword/forgotPassword';
import AcceptInvitation from './acceptInvitation';
import RejectBrokerage from './rejectBrokerage';
import Login from './login/login';

const withLayout = (Component: React.Element) => function LayoutWrapper(props: any) {
  return (
    <LoginLayout>
      <Component {...props} />
    </LoginLayout>
  );
};

export default {
  AgentSignup: withLayout(AgentSignup),
  InvitedToSignUpNew: withLayout(InvitedToSignUpNew),
  InvitedToSignUpExisting: withLayout(InvitedToSignUpExisting),
  UserActivation: withLayout(UserActivation),
  ResetPassword: withLayout(ResetPassword),
  ForgotPassword: withLayout(ForgotPassword),
  AcceptInvitation: withLayout(AcceptInvitation),
  RejectBrokerage: withLayout(RejectBrokerage),
  Login: withLayout(Login),
};

export { default as AccountSettings } from './account-settings';
export { default as Logout } from './logout';
