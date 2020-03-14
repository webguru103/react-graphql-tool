import React from 'react';
import { DeleteDocumentDialogC } from '../../src/agent-panel/document/deleteDocumentDialog';
import { shallowWrap, mountWrap } from '../test-helpers/contextWrapper';

describe('Delete Document', () => {
  let props;
  let component;
  let deleteFunction = jest.fn();
  const wrappedShallow = (lang = 'en') => {
    component = shallowWrap(<DeleteDocumentDialogC {...props} />, lang);
    return component;
  };

  const wrappedMount = (lang = 'en') => {
    component = mountWrap(<DeleteDocumentDialogC {...props} />, lang);
    return component;
  };

  beforeEach(() => {
    deleteFunction = jest.fn(({ id, transactionId }) => Promise.resolve({ id, transactionId }));
    props = {
      deleteDocument: deleteFunction,
      document: {
        id: 'mockId',
      },
      closeDialog: jest.fn(),
      transactionId: '123',
    };
    if (component) component.unmount();
  });

  test('should render', () => {
    const wrapper = wrappedShallow();
    expect(wrapper).toMatchSnapshot();
  });

  test('should call deleteDocument with correct argument', (done) => {
    expect.assertions(2);
    const wrapper = wrappedMount();

    // Should not have made a call yet
    expect(deleteFunction).toHaveBeenCalledTimes(0);

    // Click Done button (Dialog is set to open)
    wrapper.find('button').findWhere(n => n.contains('Continue')).first().simulate('submit');

    // Calls deleteDocument, which returns a function that should be called once
    // with proper variables passed in, wrapped in a Promise.
    setTimeout(() => {
      expect(deleteFunction).toHaveBeenCalledWith({ id: props.document.id, transactionId: props.transactionId });
      done();
    });
  });

});
