/* eslint import/no-extraneous-dependencies: 0 */

import * as React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { withContext } from '../../test-helpers/contextWrapper';
import { MakeRequestC } from '../../../src/account/oreaValidation/makeRequest';

describe('Make request screen', () => {
  afterEach(cleanup);
  const El = withContext(MakeRequestC);
  it('renders', () => {
    const { container } = render(<El classes={{}} />);
    expect(container).toMatchSnapshot();
  });

  it('attempts to fetch OREA page on click', () => {
    const fetchOREA = jest.fn();
    const { getByTestId } = render(<El classes={{}} fetchOREA={fetchOREA} />);
    const button = getByTestId('fetch-orea');

    fireEvent(
      button,
      new MouseEvent('click', { bubbles: true, cancelable: true }),
    );
    expect(fetchOREA).toHaveBeenCalledTimes(1);
  });

});
