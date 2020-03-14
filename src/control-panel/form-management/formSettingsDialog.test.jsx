import React from 'react';
import {
  render, fireEvent, cleanup, waitForElement,
} from 'react-testing-library';
import { withContext } from '../../../tests/test-helpers/contextWrapper';
import { FormSettingsDialogC } from './formSettingsDialog';

describe('Form Settings Dialog', () => {
  afterEach(cleanup);
  const Component = withContext(FormSettingsDialogC);
  const mockForm = {
    id: 1,
    formName: 'mockForm',
    formStatus: 'ACTIVE',
    formGroupId: 3,
  };
  const mockFormGroup = {
    id: 1,
    formGroupName: 'mockName',
  };
  const updateFormFailNetwork = jest.fn(() => Promise.reject({ networkError: 'some' })); //eslint-disable-line
  const updateFormFailGlobal = jest.fn(() => Promise.reject({graphQLErrors: [{ message: 'some', extensions: { model: 'some' } }]})); //eslint-disable-line
  test('renders', () => {
    const { container } = render(<Component classes={{}} form={mockForm} formGroups={[mockFormGroup]} />);
    expect(container).toMatchSnapshot();
  });

  test('Can submit if click on update', (done) => {
    const updateForm = jest.fn(() => Promise.resolve());
    const { getByText } = render(
      <Component
        classes={{}}
        form={mockForm}
        formGroups={[mockFormGroup]}
        updateForm={updateForm}
        closeDialog={() => {}}
        createSnackbar={() => {}}
        refetch={() => {}}
      />,
    );
    fireEvent.click(getByText('Update'));
    setTimeout(() => {
      expect(updateForm).toHaveBeenCalledTimes(1);
      done();
    }, 0);
  });

  test('Should set network error if error is returned by BE', async () => {
    const { getByText } = render(
      <Component
        classes={{}}
        form={mockForm}
        formGroups={[mockFormGroup]}
        updateForm={updateFormFailNetwork}
        closeDialog={() => {}}
        createSnackbar={() => {}}
      />,
    );
    fireEvent.click(getByText('Update'));
    const errorText = await waitForElement(() => getByText('Some network error occurred, try again later.'));
    expect(errorText).toBeDefined();
  });

  test('Cannot submit if the formName is empty', () => {
    const updateForm = jest.fn(() => Promise.resolve());
    const { getByText, getByLabelText } = render(
      <Component
        classes={{}}
        form={mockForm}
        formGroups={[mockFormGroup]}
        updateForm={updateForm}
        closeDialog={() => {}}
        createSnackbar={() => {}}
      />,
    );
    fireEvent.change(getByLabelText('Form Name'), {
      target: { value: '' },
    });
    fireEvent.click(getByText('Update'));
    expect(updateForm).toHaveBeenCalledTimes(0);
  });

  test('Should show global error if the error is returned by backend', async () => {
    const { getByText } = render(
      <Component
        classes={{}}
        form={mockForm}
        formGroups={[mockFormGroup]}
        updateForm={updateFormFailGlobal}
        closeDialog={() => {}}
        createSnackbar={() => {}}
      />,
    );
    fireEvent.click(getByText('Update'));
    const greetingTextNode = await waitForElement(() => getByText('Some'));
    expect(greetingTextNode).toBeDefined();
  });
});
