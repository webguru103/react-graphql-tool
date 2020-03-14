/* eslint import/no-extraneous-dependencies: 0 */

import * as React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { withContext } from '../../test-helpers/contextWrapper';
import { InviteNewCpUserDialogC } from '../../../src/control-panel/cp-user-management/inviteNewCpUserDialog';

describe('Invite New CP User', () => {
  afterEach(cleanup);
  const Component = withContext(InviteNewCpUserDialogC);
  test('renders', () => {
    const { container } = render(<Component classes={{}} />);
    expect(container).toMatchSnapshot();
  });

  test('can not submit if no fields have been filled', (done) => {
    expect.assertions = 3;
    const handleSubmit = jest.fn();
    const { getByTestId } = render(<Component
      classes={{}}
      inviteNewCpUser={handleSubmit}
    />);
    const inviteButton = getByTestId('submit-button');

    expect(inviteButton).not.toBeDisabled();

    fireEvent(
      inviteButton,
      new MouseEvent('click', { bubbles: true, cancelable: true }),
    );

    setTimeout(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(0);
      expect(inviteButton).toBeDisabled();
      done();
    });
  });

  test('can not submit if one field (e.g last name) is missing', (done) => {
    expect.assertions = 3;
    const handleSubmit = jest.fn();
    const { getByLabelText, getByTestId } = render(<Component
      classes={{}}
      inviteNewCpUser={handleSubmit}
    />);
    const emailInput = getByLabelText('Email *');
    const firstNameInput = getByLabelText('First Name *');
    const inviteButton = getByTestId('submit-button');

    fireEvent.change(emailInput, {
      target: { value: 'liang@dealtap.ca' },
    });

    fireEvent.change(firstNameInput, {
      target: { value: 'Liang' },
    });

    expect(inviteButton).not.toBeDisabled();

    fireEvent(
      inviteButton,
      new MouseEvent('click', { bubbles: true, cancelable: true }),
    );
    setTimeout(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(0);
      expect(inviteButton).toBeDisabled();
      done();
    }, 0);
  });

  test('can submit if fill all fields', (done) => {
    const handleSubmit = jest.fn(() => done());
    const { getByLabelText, getByTestId } = render(<Component
      classes={{}}
      inviteNewCpUser={handleSubmit}
    />);
    const emailInput = getByLabelText('Email *');
    const firstNameInput = getByLabelText('First Name *');
    const lastNameInput = getByLabelText('Last Name *');
    const inviteButton = getByTestId('submit-button');

    fireEvent.change(emailInput, {
      target: { value: 'liang@dealtap.ca' },
    });

    fireEvent.change(firstNameInput, {
      target: { value: 'Liang' },
    });

    fireEvent.change(lastNameInput, {
      target: { value: 'Cui' },
    });

    expect(inviteButton).not.toBeDisabled();

    fireEvent(
      inviteButton,
      new MouseEvent('click', { bubbles: true, cancelable: true }),
    );

    setTimeout(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
