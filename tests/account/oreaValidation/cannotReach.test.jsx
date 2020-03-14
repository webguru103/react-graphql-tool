/* eslint import/no-extraneous-dependencies: 0 */

import * as React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { withContext } from '../../test-helpers/contextWrapper';
import { CannotReachC } from '../../../src/account/oreaValidation/cannotReach';

describe('Cannot Reach Screen', () => {
  afterEach(cleanup);
  const El = withContext(CannotReachC);
  it('renders', () => {
    const { container } = render(<El classes={{}} />);
    expect(container).toMatchSnapshot();
  });

  it('calls change view function correctly on clicking do it later', () => {
    const changeView = jest.fn();
    const { getByTestId } = render(<El classes={{}} changeView={changeView} />);
    const doItLaterButton = getByTestId('change-view-do-it-later');

    fireEvent(
      doItLaterButton,
      new MouseEvent('click', { bubbles: true, cancelable: true }),
    );
    expect(changeView).toHaveBeenCalledTimes(1);
    expect(changeView).toBeCalledWith('do-it-later');
  });

  it('calls change view function correctly on clicking try again', () => {
    const changeView = jest.fn();
    const { getByTestId } = render(<El classes={{}} changeView={changeView} />);
    const tryAgainButton = getByTestId('change-view-make-request');

    fireEvent(
      tryAgainButton,
      new MouseEvent('click', { bubbles: true, cancelable: true }),
    );
    expect(changeView).toHaveBeenCalledTimes(1);
    expect(changeView).toBeCalledWith('make-request');
  });

});
