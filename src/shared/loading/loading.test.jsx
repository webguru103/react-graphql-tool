import React from 'react';
import { render } from 'react-testing-library';
import { withContext } from '../../../tests/test-helpers/contextWrapper';
import { LoadingC } from './loading';

describe('LoadingC', () => {

  jest.useFakeTimers();

  const Component = withContext(LoadingC);
  test('renders', () => {
    const { container } = render(
      <Component
        message="LOADING"
        classes={{}}
      />,
    );

    // Fast forward all timers so Loading indicator content is rendered
    jest.runAllTimers();
    expect(container).toMatchSnapshot();
  });
});
