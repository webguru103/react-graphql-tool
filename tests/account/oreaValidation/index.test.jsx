/* eslint import/no-extraneous-dependencies: 0 */

import * as React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup } from 'react-testing-library';
import { withContext } from '../../test-helpers/contextWrapper';
import { OREAValidationC } from '../../../src/account/oreaValidation/index';

describe('OREA Validation Index', () => {
  afterEach(cleanup);
  const El = withContext(OREAValidationC);
  it('renders', () => {
    const { container } = render(<El classes={{}} />);
    expect(container).toMatchSnapshot();
  });

  it('changes screen based on initalDialog prop', () => {
    const pages = ['make-request', 'cannot-reach', 'do-it-later', 'verification-failed', 'verification-success'];
    const { rerender, getByTestId } = render(<El classes={{}} initialDialog="make-request" />);
    pages.forEach((item, index) => {
      setTimeout(() => {
        rerender(<El classes={{}} initialDialog={item} />);
        expect(getByTestId(item)).toBeInTheDocument();
      }, index * 10);
    });
  });

});
