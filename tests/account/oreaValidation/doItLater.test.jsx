/* eslint import/no-extraneous-dependencies: 0 */

import * as React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { withContext } from '../../test-helpers/contextWrapper';
import { DoItLaterC } from '../../../src/account/oreaValidation/doItLater';

describe('Do It Later Screen', () => {
  afterEach(cleanup);
  const El = withContext(DoItLaterC);
  it('renders', () => {
    const { container } = render(<El classes={{}} />);
    expect(container).toMatchSnapshot();
  });

  it('calls close dialog on pressing button', () => {
    const closeDialog = jest.fn();
    const { getByTestId } = render(<El classes={{}} closeDialog={closeDialog} />);
    const button = getByTestId('close-dialog');

    fireEvent(
      button,
      new MouseEvent('click', { bubbles: true, cancelable: true }),
    );
    expect(closeDialog).toHaveBeenCalledTimes(1);
  });

});
