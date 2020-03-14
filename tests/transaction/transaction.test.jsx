import React from 'react';
import { TransactionC } from '../../src/agent-panel/transaction/transaction';
import { shallowWrap, mountWrap } from '../test-helpers/contextWrapper';
import transactionMockData from '../test-helpers/transactionMockData';

describe('TransactionC', () => {
  let props;
  let component;
  const wrappedShallow = (lang = 'en') => {
    component = shallowWrap(<TransactionC {...props} />, lang);
    return component;
  };

  const wrappedMount = (lang = 'en') => {
    component = mountWrap(<TransactionC {...props} />, lang);
    return component;
  };

  beforeEach(() => {
    props = {
      classes: {},
      fetchMore: jest.fn(),
      transactions: transactionMockData,
      history: {
        push: jest.fn(),
      },
      match: {
        path: '/agent/transactions',
      },
      onFilter: jest.fn(),
      createDialog: jest.fn(),
    };
    if (component) component.unmount();
  });

  test('should render', () => {
    const wrapper = wrappedShallow();
    expect(wrapper).toMatchSnapshot();
  });

  test('should pass in correct props', () => {
    const wrapper = wrappedMount();
    expect(wrapper.find('TransactionC').props().transactions).toBe(transactionMockData);
  });

  test('should find row name on page for each row passed in', () => {
    const wrapper = wrappedMount();
    transactionMockData.forEach((item) => {
      expect(wrapper.contains(item.name)).toBe(true);
    });
  });

});
