/* eslint import/no-extraneous-dependencies: 0 */

import * as React from 'react';
import { func } from 'prop-types';
import 'jest-dom/extend-expect';
import { render, cleanup } from 'react-testing-library';
import withOreaVerification from '../../../src/account/oreaValidation/withOreaVerification';

const TestComponent = ({ oreaDialog }) => (
  <div data-testid="test">
    {oreaDialog ? 'true' : 'false'}
  </div>
);

TestComponent.propTypes = {
  oreaDialog: func.isRequired,
};

describe('With OREA Verification HOC', () => {
  afterEach(cleanup);
  const El = withOreaVerification(TestComponent);

  it('renders', () => {
    const { container } = render(<El classes={{}} location={{}} match={{}} />);

    expect(container).toMatchSnapshot();
  });

  it('passes in oreaDialog function', () => {
    const container = render(<El classes={{}} location={{}} match={{}} />);

    expect(container.getByTestId('test')).toHaveTextContent('true');
  });

});
