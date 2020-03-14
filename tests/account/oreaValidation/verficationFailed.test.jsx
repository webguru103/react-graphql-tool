/* eslint import/no-extraneous-dependencies: 0 */

import * as React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { withContext } from '../../test-helpers/contextWrapper';
import { VerificationFailedC } from '../../../src/account/oreaValidation/verificationFailed';

describe('Verification Failed Screen', () => {
  afterEach(cleanup);
  const El = withContext(VerificationFailedC);
  it('renders', () => {
    const { container } = render(<El classes={{}} />);
    expect(container).toMatchSnapshot();
  });

  it('calls change view function correctly', () => {
    const changeView = jest.fn();
    const { getByTestId } = render(<El classes={{}} changeView={changeView} />);
    const button = getByTestId('change-view-make-request');

    fireEvent(
      button,
      new MouseEvent('click', { bubbles: true, cancelable: true }),
    );
    expect(changeView).toHaveBeenCalledTimes(1);
    expect(changeView).toBeCalledWith('make-request');
  });
});
