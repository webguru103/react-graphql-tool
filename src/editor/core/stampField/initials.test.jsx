import React from 'react';
import { render } from 'react-testing-library';
import { InitialsC } from './initials';

describe('Initial Field', () => {
  test('renders', () => {
    const { container } = render(<InitialsC classes={{}} />);
    expect(container).toMatchSnapshot();
  });
});
