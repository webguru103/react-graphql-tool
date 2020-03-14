import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { AttributePanelC } from './attributesPanel';
import { withContext } from '../../../../tests/test-helpers/contextWrapper';

describe('Attributes panel', () => {
  afterEach(cleanup);
  it('renders default message if no fields are chosen', () => {
    const props = {
      activeSelectionPageFields: [],
      classes: {},
    };
    const { getByTestId } = render(<AttributePanelC {...props} />);
    expect(getByTestId('no-selection-message')).toBeDefined();
  });

  it('renders text attributes if text field is chosen', () => {
    const props = {
      pages: [
        {
          fields: {
            1: {
              type: 'text',
            },
          },
        },
      ],
      activeSelectionPageFields: [1],
      activePage: 0,
      classes: {},
      pageRefs: [],
      handleFieldUpdate: () => {},
    };
    const Component = withContext(AttributePanelC);
    const { getByText } = render(<Component {...props} />);
    expect(getByText('Lock')).toBeDefined();
  });
});
