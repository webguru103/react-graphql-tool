import React from 'react';
import { ContentDocumentC } from '../../src/agent-panel/document/contentDocument';
import { shallowWrap, mountWrap } from '../test-helpers/contextWrapper';
import documentMockData from '../test-helpers/documentMockData';

describe('ContentDocumentC', () => {
  let props;
  let component;
  const wrappedShallow = (lang = 'en') => {
    component = shallowWrap(<ContentDocumentC {...props} />, lang);
    return component;
  };

  const wrappedMount = (lang = 'en') => {
    component = mountWrap(<ContentDocumentC {...props} />, lang);
    component.setProps(props);
    return component;
  };

  beforeEach(() => {
    props = {
      documents: documentMockData,
      classes: {},
      copyDocument: jest.fn(),
      match: {
        params: {},
      },
    };
    if (component) component.unmount();
  });

  test('should render', () => {
    const wrapper = wrappedShallow();
    expect(wrapper).toMatchSnapshot();
  });

  test('should be passing correct props to subcomponents', () => {
    const wrapper = wrappedMount();

    // First document row (2nd div) has correct name.
    expect(wrapper.find('div').at(1).find('span').first()
      .contains(documentMockData[0].name)).toBe(true);
  });

  test('should call copyTransaction with correct argument', () => {
    const wrapper = wrappedMount();

    expect(wrapper.props().copyDocument).toHaveBeenCalledTimes(0);

    // Open menu, click on a button labeled 'Copy'
    wrapper.find('IconButton').first().simulate('click');
    wrapper.find('li').findWhere(n => n.contains('Copy')).first().simulate('click');

    // First argument of first call is the id of first row in table
    expect(wrapper.props().copyDocument.mock.calls[0][0].id).toBe(documentMockData[0].id);
    expect(wrapper.props().copyDocument).toHaveBeenCalledTimes(1);
  });
});
