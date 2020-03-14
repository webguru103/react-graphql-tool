import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { PeopleScreenC } from './peopleScreen';
import { withContext } from '../../../tests/test-helpers/contextWrapper';

describe('[CreateSession]: PeopleScreen', () => {
  afterEach(cleanup);
  const Component = withContext(PeopleScreenC);
  const props = {
    classes: {},
    stepForward: () => {},
    user: {
      firstName: 'test',
      lastName: 'user',
      email: 'test@email.com',
    },
    setSignees: () => {},
    onSubmit: () => {},
  };
  it('renders', () => {
    const { container } = render(PeopleScreenC);
    expect(container).toMatchSnapshot();
  });

  it('can add extra assignees', async () => {
    const { getByText, getAllByLabelText } = render(<Component {...props} />);
    const addButton = getByText('Add Signee');
    await fireEvent.click(addButton);

    expect(getAllByLabelText('Full Name').length).toEqual(3);
  });

  it('can not submit if some values are not provided', async (done) => {
    const { getByText } = render(<Component {...props} />);
    const submitButton = getByText('Continue');
    await fireEvent.click(submitButton);
    setTimeout(() => {
      expect(getByText('Please enter full name')).toBeDefined();
      done();
    }, 0);
  });

  it('can not submit if invalid signee name is provided', async (done) => {
    const { getByText, getByLabelText } = render(<Component {...props} />);
    const fullNameInput = getByLabelText('Full Name');
    fireEvent.change(fullNameInput, { target: { value: 'invalidValue' } });
    const submitButton = getByText('Continue');
    await fireEvent.click(submitButton);
    setTimeout(() => {
      expect(getByText('Full name must consist of two or more words')).toBeDefined();
      done();
    }, 0);
  });

  it('can not submit if invalid email is provided', async (done) => {
    const { getByText, getByLabelText } = render(<Component {...props} />);
    const emailInput = getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'invalidValue' } });
    const submitButton = getByText('Continue');
    await fireEvent.click(submitButton);
    setTimeout(() => {
      expect(getByText('Email is not valid')).toBeDefined();
      done();
    }, 0);
  });

  it('can remove the signees', async () => {
    const { getByText, getAllByLabelText, getByTestId } = render(<Component {...props} />);

    const addButton = getByText('Add Signee');
    await fireEvent.click(addButton);

    expect(getAllByLabelText('Full Name').length).toEqual(3);

    const removeButton = getByTestId('clear-button');
    await fireEvent.click(removeButton);
    expect(getAllByLabelText('Full Name').length).toEqual(2);
  });

  it('removes the last signee, if only one signee remains in the list', async () => {
    const { getByLabelText, getByTestId, queryByDisplayValue } = render(<Component {...props} />);
    const fullNameInput = getByLabelText('Full Name');
    const emailInput = getByLabelText('Email');

    fireEvent.change(fullNameInput, { target: { value: 'Some User' } });
    fireEvent.change(emailInput, { target: { value: 'some@user.ca' } });

    expect(queryByDisplayValue('Some User')).toBeDefined();

    const removeButton = getByTestId('clear-button');
    await fireEvent.click(removeButton);

    expect(queryByDisplayValue('Some User')).toBeNull();
  });

  it('can submit if all requirement are met', async (done) => {
    const createTransactionSession = jest.fn(() => Promise.resolve({ data: { createTransactionSession: { transactionId: 1 } } }));
    const { getByText, getAllByLabelText } = render(
      <Component
        {...props}
        createTransactionSession={createTransactionSession}
      />,
    );
    const fullNameInput = getAllByLabelText('Full Name')[1]; // get the second input
    const emailInput = getAllByLabelText('Email')[1];

    fireEvent.change(fullNameInput, { target: { value: 'Some User' } });
    fireEvent.change(emailInput, { target: { value: 'some@user.ca' } });

    const submitButton = getByText('Continue');
    await fireEvent.click(submitButton);
    setTimeout(() => {
      expect(createTransactionSession).toBeCalled();
      done();
    }, 0);
  });

  it('shows snackbar if the backend returns an error', async (done) => {
    const createTransactionSession = jest.fn(() => Promise.reject(new Error('wtf')));
    const createSnackbar = jest.fn();

    const { getByText, getAllByLabelText } = render(
      <Component {...props} createTransactionSession={createTransactionSession} createSnackbar={createSnackbar} />,
    );
    const fullNameInput = getAllByLabelText('Full Name')[1];
    const emailInput = getAllByLabelText('Email')[1];

    fireEvent.change(fullNameInput, { target: { value: 'Some User' } });
    fireEvent.change(emailInput, { target: { value: 'some@user.ca' } });

    const submitButton = getByText('Continue');
    await fireEvent.click(submitButton);
    setTimeout(() => {
      expect(createSnackbar).toBeCalled();
      done();
    }, 0);
  });

  it('can not submit, if the same name is inserted twice', async (done) => {
    const { getByText, getAllByLabelText } = render(
      <Component {...props} />,
    );
    const fullNameInput = getAllByLabelText('Full Name');
    const emailInput = getAllByLabelText('Email');

    fireEvent.change(fullNameInput[0], { target: { value: 'Some User' } });
    fireEvent.change(emailInput[0], { target: { value: 'some@user.ca' } });

    fireEvent.change(fullNameInput[1], { target: { value: 'Some User' } });
    fireEvent.change(emailInput[1], { target: { value: 'some@user.ca' } });

    const submitButton = getByText('Continue');
    await fireEvent.click(submitButton);

    setTimeout(() => {
      expect(getByText('Names should be unique')).toBeDefined();
      done();
    }, 0);
  });

  it('can not submit, if the same email is inserted twice', async (done) => {
    const { getByText, getAllByLabelText } = render(
      <Component {...props} />,
    );
    const fullNameInput = getAllByLabelText('Full Name');
    const emailInput = getAllByLabelText('Email');

    fireEvent.change(fullNameInput[0], { target: { value: 'Some User' } });
    fireEvent.change(emailInput[0], { target: { value: 'some@user.ca' } });

    fireEvent.change(fullNameInput[1], { target: { value: 'Some User' } });
    fireEvent.change(emailInput[1], { target: { value: 'some@user.ca' } });

    const submitButton = getByText('Continue');
    await fireEvent.click(submitButton);

    setTimeout(() => {
      expect(getByText('Emails should be unique')).toBeDefined();
      done();
    }, 0);
  });

  it('if the last value is removed, should show an empty values in fields', async () => {
    const { getAllByLabelText, getAllByTestId } = render(<Component {...props} />);

    expect(getAllByLabelText('Full Name').length).toEqual(2);

    const removeButtons = getAllByTestId('clear-button');
    await fireEvent.click(removeButtons[1]);
    await fireEvent.click(removeButtons[0]);

    expect(getAllByLabelText('Full Name').length).toEqual(1);
    expect(getAllByLabelText('Full Name')[0].value).toEqual('');
    expect(getAllByLabelText('Full Name')[0].value).toEqual('');
  });

  it('removes the leading and trailing spaces if passed', async (done) => {
    const createTransactionSession = jest.fn(() => Promise.resolve({ data: { createTransactionSession: { transactionId: 1 } } }));
    const { getByText, getAllByLabelText } = render(
      <Component
        {...props}
        createTransactionSession={createTransactionSession}
      />,
    );
    const fullNameInput = getAllByLabelText('Full Name')[1]; // get the second input
    const emailInput = getAllByLabelText('Email')[1];

    fireEvent.change(fullNameInput, { target: { value: 'White space    ' } });
    fireEvent.change(emailInput, { target: { value: '   some@user.ca   ' } });

    const submitButton = getByText('Continue');
    await fireEvent.click(submitButton);
    setTimeout(() => {
      expect(createTransactionSession).toBeCalledWith({
        transactionSession: {
          transactionSessionName: '',
        },
        docs: undefined,
        sessionSignees: [
          {
            email: 'test@email.com',
            sessionSigneeName: 'test user',
          },
          {
            sessionSigneeName: 'White space',
            email: 'some@user.ca',
          },
        ],
      });
      done();
    }, 0);
  });
});
