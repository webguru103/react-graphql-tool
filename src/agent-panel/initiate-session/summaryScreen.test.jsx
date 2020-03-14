import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import SummaryScreen from './summaryScreen';
import { withContext } from '../../../tests/test-helpers/contextWrapper';

describe('[CreateSession]: PeopleScreen', () => {
  afterEach(cleanup);
  const Component = withContext(SummaryScreen);
  const props = {
    classes: {},
    stepForward: () => { },
    stepBack: () => {},
    emailTitle: 'Please Sign These Documents',
    emailBody: '',
    transactionSessionId: 1,
    setTitle: () => { },
    setBody: () => { },
    documents: [
      {
        id: 1,
        docName: 'Doc 1',
      },
      {
        id: 2,
        docName: 'Doc 1 but better',
      },
    ],
    signees: [
      {
        id: 1,
        sessionSigneeName: 'Session Signee 1',
        viewedAt: '2019-03-29T14:13:04Z',
        email: 'test@dealtap.ca',
        transactionSessionByTransactionSessionId: {
          transactionSessionName: 'Transaction Session 1',
        },
      },
      {
        id: 2,
        sessionSigneeName: 'Session Signee 2',
        viewedAt: '2019-03-29T14:13:04Z',
        signedAt: '2019-03-29T14:13:04Z',
        email: 'aminur@dealtap.ca',
        transactionSessionByTransactionSessionId: {
          transactionSessionName: 'Transaction Session 1',
        },
      },
    ],
    sendSigningEmails: () => {},
  };
  const emptyTitleProps = {
    classes: {},
    stepForward: () => { },
    stepBack: () => { },
    emailTitle: '',
    emailBody: '',
    transactionSessionId: 1,
    setTitle: () => { },
    setBody: () => { },
    documents: [
      {
        id: 1,
        docName: 'Doc 1',
      },
      {
        id: 2,
        docName: 'Doc 1 but better',
      },
    ],
    signees: [
      {
        id: 1,
        sessionSigneeName: 'Session Signee 1',
        viewedAt: '2019-03-29T14:13:04Z',
        email: 'test@dealtap.ca',
        transactionSessionByTransactionSessionId: {
          transactionSessionName: 'Transaction Session 1',
        },
      },
      {
        id: 2,
        sessionSigneeName: 'Session Signee 2',
        viewedAt: '2019-03-29T14:13:04Z',
        signedAt: '2019-03-29T14:13:04Z',
        email: 'aminur@dealtap.ca',
        transactionSessionByTransactionSessionId: {
          transactionSessionName: 'Transaction Session 1',
        },
      },
    ],
    sendSigningEmails: () => { },
  };
  it('renders', () => {
    const { container } = render(<Component {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('can not submit if email title is empty', async (done) => {
    const { getByText } = render(<Component {...emptyTitleProps} />);
    const send = getByText('Send');
    await fireEvent.click(send);
    setTimeout(() => {
      expect(getByText('Please enter an email title')).toBeDefined();
      done();
    }, 0);
  });
});
