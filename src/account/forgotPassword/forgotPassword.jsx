import React from 'react';
import { withRouter } from 'react-router';
import type { RouterHistory } from 'react-router';
import * as yup from 'yup';
import PasswordResetEmailSent from './passwordResetEmailSent';
import { withSendResetPasswordEmail, withEmail } from '../api/accountService';
import { get, compose, pro } from '../../utility';
import { messages } from '../constants';
import ForgotPassword from '../../shared/forgotPassword/forgotPassword';
import validator from '../../validation/helpers';

type Props = {
  history: RouterHistory,
  sendResetPasswordEmail: Function,
  checkEmail: Function,
};

class ForgotPasswordC extends React.PureComponent<Props, *> {

  state = {
    step: '1',
    email: '',
    errors: {},
  };

  handleSendResetPasswordEmail = async ({ email }: { email: string } = {}) => {
    const { sendResetPasswordEmail } = this.props;
    const [err] = await pro(sendResetPasswordEmail({
      email: email.trim(),
    }));

    if (err) {
      this.setState({
        errors: {
          network: messages.REQUEST_ERROR,
        },
      });
    } else {
      this.setState({
        step: '2',
        email: email.trim(),
      });
    }
  };

  handleBack = () => this.props.history.goBack();

  handleNext = async (email: string) => {
    const validationResult = validator({ email }, {
      email: yup.string().email(messages.INVALID_EMAIL).required(messages.EMPTY_EMAIL),
    });

    const [err, res] = await pro(this.props.checkEmail(email));

    if (err) {
      this.setState({ errors: messages.NETWORK_ERROR });
    }

    if (Object.keys(validationResult.errors).length) {
      this.setState({
        errors: validationResult.errors,
      });
    } else if (!get(res, 'data.checkIdentity.foundUser')) {
      this.setState({
        errors: { email: messages.EMAIL_DOESNT_EXIST },
      });
    } else {
      this.handleSendResetPasswordEmail({ email });
    }
  };

  resetErrors = () => {
    this.setState({
      errors: {},
    });
  };

  render() {
    const { step, email, errors } = this.state;

    return (
      <React.Fragment>
        {
          step === '1'
          && (
            <div>
              <ForgotPassword
                onHandleBack={this.handleBack}
                onHandleNext={this.handleNext}
                errors={errors}
                resetErrors={this.resetErrors}
              />
            </div>
          )
        }
        {step === '2' && <PasswordResetEmailSent email={email} />}
      </React.Fragment>
    );
  }

}

export default compose(
  withRouter,
  withSendResetPasswordEmail,
  withEmail,
)(ForgotPasswordC);
