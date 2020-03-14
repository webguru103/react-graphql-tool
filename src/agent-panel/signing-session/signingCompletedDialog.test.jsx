/* eslint import/no-extraneous-dependencies: 0 */

import * as React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { withContext } from '../../../tests/test-helpers/contextWrapper';
import { SigningCompletedDialogC } from './signingCompletedDialog';

describe('CreateFormDialogC', () => {
  afterEach(cleanup);
  const Component = withContext(SigningCompletedDialogC);

  test('renders', () => {
    const { container } = render(<Component
      viewDocument={() => {}}
      classes={{}}
    />);
    expect(container).toMatchSnapshot();
  });

  test('calls viewDocument', (done) => {
    const viewDocument = jest.fn(() => {});

    const { getByTestId } = render(<Component
      viewDocument={viewDocument}
      classes={{}}
    />);

    const viewDocumentButton = getByTestId('view-document-button');
    fireEvent.click(viewDocumentButton);

    setTimeout(() => {
      expect(viewDocument).toHaveBeenCalledTimes(1);
      done();
    });
  });

});
