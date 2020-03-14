/* eslint import/no-extraneous-dependencies: 0 */

import * as React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { withContext } from '../../test-helpers/contextWrapper';
import { InviteNewAdminDialogC } from '../../../src/shared/inviteAdminToBO/inviteNewAdminDialog';
import { brokerages } from './brokerages.mock';

describe('Invite New', () => {
  afterEach(cleanup);
  const Component = withContext(InviteNewAdminDialogC);
  test('renders', () => {
    const handleSubmit = jest.fn();
    const { container } = render(<Component
      classes={{}}
      inviteNewAdmin={handleSubmit}
      brokerages={brokerages}
    />);
    expect(container).toMatchSnapshot();
  });

  test('can not submit if empty fields are not filled', async (done) => {
    const handleSubmit = jest.fn();
    const { getByTestId } = render(<Component
      classes={{}}
      inviteNewAdmin={handleSubmit}
      brokerages={brokerages}
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

  test('can not submit if one field (e.g, last name) is missing', (done) => {
    const handleSubmit = jest.fn();
    const { getByLabelText, getByTestId } = render(<Component
      classes={{}}
      inviteNewAdmin={handleSubmit}
      brokerages={brokerages}
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
    });
  });

  test('can submit if fill all fields', (done) => {
    const handleSubmit = jest.fn(() => Promise.resolve());
    const { getByLabelText, getByTestId, getByText } = render(<Component
      classes={{}}
      inviteNewAdmin={handleSubmit}
      brokerages={brokerages}
      closeDialog={() => {}}
    />);
    const emailInput = getByLabelText('Email *');
    const firstNameInput = getByLabelText('First Name *');
    const lastNameInput = getByLabelText('Last Name *');
    const brokerageSelect = getByText('To Which Brokerage Office?');
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

    fireEvent(
      brokerageSelect,
      new MouseEvent('click', { bubbles: true }),
    );

    fireEvent.keyDown(brokerageSelect, {
      keyCode: 40,
      bubbles: true,
    });

    fireEvent.keyDown(brokerageSelect, {
      keyCode: 13,
      bubbles: true,
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
