/* eslint import/no-extraneous-dependencies: 0 */

import * as React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { withContext } from '../../test-helpers/contextWrapper';
import settingsDialog from '../../../src/control-panel/form-group-management/settingsDialog';

describe('Form Group Settings Dialog', () => {
  afterEach(cleanup);
  const Component = withContext(settingsDialog);
  test('renders', () => {
    const { container } = render(<Component classes={{}} />);
    expect(container).toMatchSnapshot();
  });

  test('can not submit if no fields have been filled', (done) => {
    expect.assertions = 3;
    const handleSubmit = jest.fn();
    const { getByTestId } = render(<Component
      classes={{}}
    />);
    const submitButton = getByTestId('submit-button');

    expect(submitButton).not.toBeDisabled();

    fireEvent(
      submitButton,
      new MouseEvent('click', { bubbles: true, cancelable: true }),
    );

    setTimeout(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(0);
      expect(submitButton).toBeDisabled();
      done();
    }, 0);
  });

  test('can not submit if one field is missing', (done) => {
    expect.assertions = 3;
    const handleSubmit = jest.fn();
    const { getByLabelText, getByTestId } = render(<Component
      classes={{}}
    />);
    const groupNameInput = getByLabelText('Group Name *');
    const submitButton = getByTestId('submit-button');

    fireEvent.change(groupNameInput, {
      target: { value: 'OREA Group' },
    });

    expect(submitButton).not.toBeDisabled();

    fireEvent(
      submitButton,
      new MouseEvent('click', { bubbles: true, cancelable: true }),
    );
    setTimeout(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(0);
      expect(submitButton).toBeDisabled();
      done();
    }, 0);
  });

  test.skip('can submit with all fields', async () => {
    expect.assertions = 3;
    const handleSubmit = jest.fn();
    const { getByLabelText, getByTestId } = render(<Component
      classes={{}}
      onSubmit={handleSubmit}
      formGroupId={1}
      formGroupVis="EVERYONE"
      formGroupName="Test Group"
    />);
    const groupNameInput = getByLabelText('Group Name *');
    const submitButton = getByTestId('submit-button');

    fireEvent.change(groupNameInput, {
      target: { value: 'OREA Group' },
    });

    expect(submitButton).not.toBeDisabled();

    await fireEvent.click(getByLabelText('Limit To OREA'));
    await fireEvent.click(submitButton);

    expect(submitButton).not.toBeDisabled();
  });
});
