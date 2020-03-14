import React from 'react';
import { RenameTransactionDialogC } from '../../../src/agent-panel/transaction/renameTransactionDialog/renameTransactionDialog';
import { shallowWrap, mountWrap } from '../../test-helpers/contextWrapper';

describe('Rename', () => {
  let props;
  let component;
  let renameFunction = jest.fn();
  const wrappedShallow = (lang = 'en') => {
    component = shallowWrap(<RenameTransactionDialogC {...props} />, lang);
    return component;
  };

  const wrappedMount = (lang = 'en') => {
    component = mountWrap(<RenameTransactionDialogC {...props} />, lang);
    return component;
  };

  beforeEach(() => {
    renameFunction = jest.fn(({ transactionId, newName }) => Promise.resolve({ transactionId, newName }));
    props = {
      renameTransaction: renameFunction,
      transaction: {
        id: 'mockId',
        name: 'Transaction name',
      },
      closeDialog: jest.fn(),
    };
    if (component) component.unmount();
  });

  test('should render', () => {
    const wrapper = wrappedShallow();
    expect(wrapper).toMatchSnapshot();
  });

  test('should call renameTransaction with correct argument', (done) => {
    const wrapper = wrappedMount();

    // Should not have made a call yet
    expect(renameFunction.mock.calls.length).toBe(0);

    // Set the input value
    wrapper.find('input').simulate('change', { target: { name: 'name', value: 'Transaction name' } });
    // Click Done button (Dialog is set to open)
    wrapper.find('button').findWhere(n => n.contains('Done')).first().simulate('submit');

    // Calls renameTransaction, which returns a function that should be called once
    // with proper variables passed in, wrapped in a Promise.
    setTimeout(() => {
      expect(renameFunction).toHaveBeenCalledWith({ id: props.transaction.id, newName: props.transaction.name });
      done();
    });
  });

});
