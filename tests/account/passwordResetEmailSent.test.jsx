/* eslint import/no-extraneous-dependencies: 0 */

import * as React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { withContext } from '../test-helpers/contextWrapper';
import PasswordResetEmailSent from '../../src/account/forgotPassword/passwordResetEmailSent';

describe('Password Reset Email Sent', () => {
  afterEach(cleanup);
  const Component = withContext(PasswordResetEmailSent);
  test('renders', () => {
    const { container } = render(<Component email="test@dealtap.ca" />);
    expect(container).toMatchSnapshot();
  });

  test('request is made on click resend button', () => {
    const handleResendEmail = jest.fn();
    const { getByTestId } = render(<Component
      email="test@dealtap.ca"
      sendResetPasswordEmail={handleResendEmail}
    />);
    const resendButton = getByTestId('submit-button');

    fireEvent(
      resendButton,
      new MouseEvent('click', { bubbles: true, cancelable: true }),
    );

    expect(handleResendEmail).toHaveBeenCalledTimes(1);
  });
});
