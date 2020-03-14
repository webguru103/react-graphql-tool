import React from 'react';
import { DocumentC } from '../../src/agent-panel/document/document';
import { shallowWrap, mountWrap } from '../test-helpers/contextWrapper';
import documentMockData from '../test-helpers/documentMockData';

describe('DocumentC', () => {
  let props;
  let component;
  const wrappedShallow = (lang = 'en') => {
    component = shallowWrap(<DocumentC {...props} />, lang);
    return component;
  };

  const wrappedMount = (lang = 'en') => {
    component = mountWrap(<DocumentC {...props} />, lang);
    return component;
  };

  beforeEach(() => {
    props = {
      classes: {},
      documents: documentMockData,
    };
    if (component) component.unmount();
  });

  test('should render', () => {
    const wrapper = wrappedShallow();
    expect(wrapper).toMatchSnapshot();
  });

  test('should find row name on page for each row passed in', () => {
    const wrapper = wrappedMount();
    documentMockData.forEach((item) => {
      expect(wrapper.contains(item.name)).toBe(true);
    });
  });
});
