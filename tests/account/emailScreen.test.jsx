import * as React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { withContext } from '../test-helpers/contextWrapper';
import EmailScreen from '../../src/account/agentSignUp/emailScreen';

describe('Email screen', () => {
  afterEach(cleanup);
  const El = withContext(EmailScreen);
  it('renders', () => {

    const { container } = render(<El />);
    expect(container).toMatchSnapshot();
  });

  it('can not click on Next button if email field is empty', () => {
    const proceed = jest.fn();
    const { getByText } = render(<El proceed={proceed} />);
    const nextButton = getByText('Next');
    fireEvent(
      nextButton,
      new MouseEvent('click', { bubbles: true, cancelable: true }),
    );
    expect(proceed).toHaveBeenCalledTimes(0);
  });

  it('can click Next if enter correct Email', () => {
    const { getByLabelText, getByTestId } = render(<El />);
    const emailInput = getByLabelText('Email');
    const nextButton = getByTestId('button-next');
    fireEvent.change(emailInput, { target: { value: 'correct@email.com' } });
    expect(nextButton).not.toBeDisabled();
  });

  it('can not click Next if enter malformated Email', () => {
    const { getByLabelText, getByTestId } = render(<El />);
    const emailInput = getByLabelText('Email');
    const nextButton = getByTestId('button-next');
    fireEvent.change(emailInput, { target: { value: 'crap@email' } });
    expect(nextButton).toBeDisabled();
  });
});
