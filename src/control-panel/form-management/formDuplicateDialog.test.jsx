import React from 'react';
import {
  render, fireEvent, cleanup, waitForElement,
} from 'react-testing-library';
import { withContext } from '../../../tests/test-helpers/contextWrapper';
import { FormDuplicateDialogC } from './formDuplicateDialog';

describe('Form Settings Dialog', () => {
  afterEach(cleanup);
  const Component = withContext(FormDuplicateDialogC);
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
  const duplicateFormFail = jest.fn(() => Promise.reject({ networkError: 'some' })); //eslint-disable-line
  const updateFormFailGlobal = jest.fn(() => Promise.reject({graphQLErrors: [{ message: 'some', extensions: { model: 'some' } }]})); //eslint-disable-line
  test('renders', () => {
    const { container } = render(<Component classes={{}} form={mockForm} formGroups={[mockFormGroup]} />);
    expect(container).toMatchSnapshot();
  });

  test('Can submit if click on update', (done) => {
    const duplicateForm = jest.fn(() => Promise.resolve());
    const { getByText } = render(
      <Component
        classes={{}}
        form={mockForm}
        formGroups={[mockFormGroup]}
        duplicateForm={duplicateForm}
        history={{
          push: () => {},
        }}
        closeDialog={() => {}}
      />,
    );
    fireEvent.click(getByText('Start Editing'));
    setTimeout(() => {
      expect(duplicateForm).toHaveBeenCalledTimes(1);
      done();
    }, 0);
  });

  test('Should set network error if error is returned by BE', async () => {
    const { getByText } = render(
      <Component
        classes={{}}
        form={mockForm}
        formGroups={[mockFormGroup]}
        duplicateForm={duplicateFormFail}
        closeDialog={() => {}}
      />,
    );
    await fireEvent.click(getByText('Start Editing'));
    const errorText = await waitForElement(() => getByText('Some network error occurred, try again later.'));
    expect(errorText).toBeDefined();
  });

  test('Cannot submit if the formName is empty', () => {
    const duplicateForm = jest.fn(() => Promise.resolve());
    const { getByText, getByLabelText } = render(
      <Component
        classes={{}}
        form={mockForm}
        formGroups={[mockFormGroup]}
        duplicateForm={duplicateForm}
        closeDialog={() => {}}
        createSnackbar={() => {}}
      />,
    );
    fireEvent.change(getByLabelText('Form Name'), {
      target: { value: '' },
    });
    fireEvent.click(getByText('Start Editing'));
    expect(duplicateForm).toHaveBeenCalledTimes(0);
  });

  test('Reset the network error on radio group switch', async (done) => {
    const { getByText, getByLabelText, queryByText } = render(
      <Component
        classes={{}}
        form={mockForm}
        formGroups={[mockFormGroup]}
        duplicateForm={duplicateFormFail}
        closeDialog={() => {}}
      />,
    );
    await fireEvent.click(getByText('Start Editing'));
    await waitForElement(() => getByText('Some network error occurred, try again later.'));
    expect(getByText('Some network error occurred, try again later.')).toBeDefined();
    await fireEvent.click(getByLabelText('Inactive'));
    setTimeout(() => {
      expect(queryByText('Some network error occurred, try again later.')).toBeNull();
      done();
    }, 0);
  });
});
