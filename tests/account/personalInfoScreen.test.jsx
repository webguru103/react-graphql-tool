import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import { withContext } from '../test-helpers/contextWrapper';
import PersonalInfoScreen from '../../src/account/shared/personalInfoScreen';

describe('Personal info screen', () => {
  afterEach(cleanup);
  const El = withContext(PersonalInfoScreen);
  it('should render', () => {
    const { container } = render(<El />);
    expect(container).toMatchSnapshot();
  });

  it('next button is disabled, if required fields are empty', () => {
    const { getByTestId } = render(<El firstName="any" />);
    const nextButton = getByTestId('button-next');
    expect(nextButton).toBeDisabled();
  });

  it('next button is active, if required fields are filled in', () => {
    const { getByTestId } = render(<El firstName="any" lastName="any" />);
    const nextButton = getByTestId('button-next');
    expect(nextButton).not.toBeDisabled();
  });
});
