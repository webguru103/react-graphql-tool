import React from 'react';
import { ContentTransactionC } from '../../src/agent-panel/transaction/contentTransaction/contentTransaction';
import { shallowWrap, mountWrap } from '../test-helpers/contextWrapper';
import transactionMockData from '../test-helpers/transactionMockData';

describe('ContentC', () => {
  let props;
  let component;
  const wrappedShallow = (lang = 'en') => {
    component = shallowWrap(<ContentTransactionC {...props} />, lang);
    return component;
  };

  const wrappedMount = (lang = 'en') => {
    component = mountWrap(<ContentTransactionC {...props} />, lang);
    component.setProps(props);
    return component;
  };

  beforeEach(() => {
    props = {
      transactions: transactionMockData,
      classes: {},
      onTransactionClick: jest.fn(),
      deleteTransaction: jest.fn(),
      copyTransaction: jest.fn(),
      renameTransaction: jest.fn(),
    };
    if (component) component.unmount();
  });

  test('should render', () => {
    const wrapper = wrappedShallow();
    expect(wrapper).toMatchSnapshot();
  });

  test('should pass in correct props', () => {
    const wrapper = wrappedMount();
    expect(wrapper.find('ContentTransactionC').props().transactions).toBe(transactionMockData);
  });

  test('should call copyTransaction with correct argument', () => {
    const wrapper = wrappedMount();

    expect(wrapper.props().copyTransaction.mock.calls.length).toBe(0);

    // Open menu, click on a button labeled 'Copy'
    wrapper.find('IconButton').first().simulate('click');
    wrapper.find('li').findWhere(n => n.contains('Copy')).first().simulate('click');

    // First argument of first call is the id of first row in table
    expect(wrapper.props().copyTransaction.mock.calls[0][0].id).toBe(transactionMockData[0].id);
    expect(wrapper.props().copyTransaction.mock.calls.length).toBe(1);
  });

});
