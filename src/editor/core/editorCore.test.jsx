import React from 'react';
import { render } from 'react-testing-library';
import { withContext } from '../../../tests/test-helpers/contextWrapper';
import { EditorCoreC } from './editorCore';

describe('Editor', () => {
  const props = {
    classes: {},
    mode: 'editing',
    documents: [],
  };

  it('renders', () => {
    const Component = withContext(EditorCoreC);
    const { container } = render(<Component {...props} />);
    expect(container).toMatchSnapshot();
  });

});
