import * as React from 'react';
import { Mutation, ApolloConsumer, graphql } from 'react-apollo';
import activateUserMutation from './activateUser.mutation.graphql';
import checkEmailQuery from './checkEmail.query.graphql';
import checkIdentityQuery from './checkIdentity.query.graphql';
import updateUserMutation from './updateUser.mutation.graphql';
import invitedUserQuery from './invitedUser.query.graphql';
import invitedUserMutation from './invitedUser.mutation.graphql';
import login from './login.query.graphql';
import sendVerificationEmail from './sendVerificationEmail.mutation.graphql';
import createUser from './createUser.mutation.graphql';
import sendEmail from './sendEmail.mutation.graphql';
import resetPassword from './resetPassword.mutation.graphql';
import { EmailType } from '../emailTypes';
import { INVITATION_ACTION } from '../../constants';

export const withEmail = (Component: React.Element) => {

  function EmailHOC(props: any) {
    return (
      <ApolloConsumer>
        {
          client => (
            <Component
              {...props}
              checkEmail={email => client.query({
                query: checkEmailQuery,
                fetchPolicy: 'no-cache',
                variables: { email },
              })}
            />
          )
        }
      </ApolloConsumer>
    );
  }

  return EmailHOC;
};

export const withIdentity = (Component: React.Element) => {

  function IdentityHOC(props: any) {
    return (
      <ApolloConsumer>
        {
          client => (
            <Component
              {...props}
              checkIdentity={({ email, systemId }) => client.query({
                query: checkIdentityQuery,
                fetchPolicy: 'no-cache',
                variables: { email, systemId },
              })}
            />
          )
        }
      </ApolloConsumer>
    );
  }

  return IdentityHOC;
};

export const withLogin = (Component: React.Element) => {

  function PasswordCheckHOC(props: any) {

    return (
      <ApolloConsumer>
        {
          client => (
            <Component
              {...props}
              login={({ email, password }) => client.mutate({
                mutation: login,
                variables: { email, password },
              })}
            />
          )
        }
      </ApolloConsumer>
    );
  }

  return PasswordCheckHOC;
};

export const withCreateUser = (Component: React.Element) => {

  function CreateUserHOC(props: any) {
    return (
      <ApolloConsumer>
        {
          client => (
            <Component
              {...props}
              createUser={({ user }) => client.mutate({
                mutation: createUser,
                variables: {
                  user,
                },
              })}
            />
          )
        }
      </ApolloConsumer>
    );
  }

  return CreateUserHOC;
};

export const withVerificationEmail = (Component: React.Element) => {

  type PropType = {
    mutate: Function,
    loading: boolean,
    error: Object,
  };

  function EmailVerificationHOC({
    mutate, loading, error, ...rest
  }: PropType) {

    const verifyEmail = email => mutate({ variables: { email, type: EmailType.ACTIVATE_ACCOUNT } });

    return (
      <Component
        {...rest}
        verifyEmail={verifyEmail}
        loading={loading}
        error={error}
      />
    );
  }
  return (graphql(
    sendVerificationEmail,
    {
      options: ownProps => ({
        variables: {
          email: ownProps.email,
          type: ownProps.type,
        },
      }),
    },
  )(EmailVerificationHOC): React.Element);
};

export const withUserActivation = (Component: React.Element) => {

  type PropType = {
    location: {
      search: Object,
    }
  }

  function PasswordActivationHOC({ location: { search }, ...rest }: PropType) {
    const urlParams = new URLSearchParams(search);
    const token = urlParams.get('token');

    return (
      <Mutation
        mutation={activateUserMutation}
        context={{
          headers: {
            authorization: token && `JWT ${token}`,
          },
        }}
      >
        {
          activateUser => (
            <Component
              {...rest}
              activateUser={activateUser}
            />
          )
        }
      </Mutation>
    );
  }
  return PasswordActivationHOC;
};

export const withUpdateUser = (Component: React.Element) => {
  function UpdateUserHOC({ updateUserApollo, ...rest }: { updateUserApollo: Function, rest: any }) {

    const updateUser = ({
      id,
      user,
    }) => updateUserApollo({
      variables: {
        id,
        user,
      },
    });
    return (
      <Component
        updateUser={updateUser}
        {...rest}
      />
    );
  }

  UpdateUserHOC.displayName = Component.displayName;

  return (graphql(updateUserMutation, { name: 'updateUserApollo' })(UpdateUserHOC): React.Element);
};

export const withInvitedUser = (Component: React.Element) => {

  function InvitedUserHOC(props: any) {
    return (
      <ApolloConsumer>
        {
          client => (
            <Component
              {...props}
              invitedUser={(inviteId, token) => client.query({
                query: invitedUserQuery,
                fetchPolicy: 'no-cache',
                errorPolicy: 'all',
                context: {
                  headers: {
                    authorization: `JWT ${token}`,
                  },
                },
                variables: {
                  condition: {
                    id: inviteId,
                  },
                },
              })}
            />
          )
        }
      </ApolloConsumer>
    );
  }

  return InvitedUserHOC;
};

export const withSendOREAGuid = (Component: React.Element) => {
  function UpdateUserHOC({ updateUserApollo, ...rest }) {

    const sendOreaGuidMethod = ({ id, guid }) => updateUserApollo({
      variables: {
        id,
        user: {
          oreaGuid: guid,
        },
      },
    });

    return (
      <Component
        {...rest}
        sendOreaGuid={sendOreaGuidMethod}
      />
    );
  }

  UpdateUserHOC.displayName = Component.displayName;

  return (graphql(updateUserMutation, { name: 'updateUserApollo' })(UpdateUserHOC): React.Element);
};

export const withSendResetPasswordEmail = (Component: React.Element) => {

  type PropType = {
    sendResetPasswordEmailApollo: Function,
  }

  function SendResetPasswordEmailHOC({ sendResetPasswordEmailApollo, ...rest }: PropType) {
    const sendResetPasswordEmailMethod = async ({ email }) => {
      await sendResetPasswordEmailApollo({
        variables: {
          email,
          type: EmailType.FORGOT_PASSWORD,
        },
      });
    };

    return (
      <Component
        sendResetPasswordEmail={sendResetPasswordEmailMethod}
        {...rest}
      />
    );
  }

  return (graphql(sendEmail, { name: 'sendResetPasswordEmailApollo' })(SendResetPasswordEmailHOC): React.Element);
};

export const withRejectBOInvitation = (Component: React.Element) => {

  type PropType = {
    location: {
      search: Object,
    }
  }

  function RejectInvitationHOC({ location: { search }, ...rest }: PropType) {
    const urlParams = new URLSearchParams(search);
    const inviteId = urlParams.get('inviteId');
    const token = urlParams.get('token');
    return (
      <Mutation
        mutation={invitedUserMutation}
        variables={{
          id: inviteId,
          action: INVITATION_ACTION.REJECT,
        }}
        context={{
          headers: {
            authorization: token && `JWT ${token}`,
          },
        }}
      >
        {
          rejectInvitation => (
            <Component
              {...rest}
              rejectBrokerageInvitation={rejectInvitation}
            />
          )
        }
      </Mutation>
    );
  }

  return RejectInvitationHOC;
};

export const withAcceptInvitation = (Component: React.Element) => {

  function AcceptInvitationHOC(props: any) {
    return (
      <ApolloConsumer>
        {
          client => (
            <Component
              {...props}
              acceptInvitation={(variables, token) => client.mutate({
                mutation: invitedUserMutation,
                context: {
                  headers: {
                    authorization: `JWT ${token}`,
                  },
                },
                variables,
              })}
            />
          )
        }
      </ApolloConsumer>
    );
  }

  return AcceptInvitationHOC;
};

export const withResetPassword = (Component: React.Element) => {

  function ResetPasswordHOC(props: any) {
    return (
      <ApolloConsumer>
        {
          client => (
            <Component
              {...props}
              resetPassword={(password, tokenId) => client.mutate({
                mutation: resetPassword,
                context: {
                  headers: {
                    authorization: `JWT ${tokenId}`,
                  },
                },
                variables: { password },
              })}
            />
          )
        }
      </ApolloConsumer>
    );
  }

  return ResetPasswordHOC;
};
