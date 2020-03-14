/* eslint import/no-extraneous-dependencies: 0 */

import * as React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { withContext } from '../../test-helpers/contextWrapper';
import { CreateFormDialogC } from '../../../src/control-panel/form-management/create-form-dialog/createFormDialog';

describe('CreateFormDialogC', () => {
  afterEach(cleanup);
  const Component = withContext(CreateFormDialogC);

  test('renders', () => {
    const { container } = render(<Component
      createForm={() => {}}
      closeDialog={() => {}}
      groupId="testgroup"
      history={{}}
    />);
    expect(container).toMatchSnapshot();
  });

  test('calls createForm', (done) => {
    const createForm = jest.fn(() => Promise.resolve());

    const { getByTestId } = render(<Component
      createForm={createForm}
      closeDialog={() => {}}
      groupId="testgroup"
      history={{ push: () => {} }}
      testMode
    />);

    const nameInput = getByTestId('form-name-input');
    fireEvent.change(nameInput, { target: { value: 'changed' } });

    const submitButton = getByTestId('action-dialog-button-bottom');
    fireEvent.click(submitButton);

    setTimeout(() => {
      expect(createForm).toHaveBeenCalledTimes(1);
      done();
    });
  });

});
