import React from 'react';
import {
  render, cleanup, waitForElement,
} from 'react-testing-library';
import { withContext } from '../../../tests/test-helpers/contextWrapper';
import FormGroupNameBreadCrumb from './formGroupNameBreadCrumb';

describe('Form Group Name Bread Crumb', () => {
  afterEach(cleanup);
  const Component = withContext(FormGroupNameBreadCrumb);
  const mockForm = {
    id: 1,
    formName: 'mockForm',
    formStatus: 'ACTIVE',
    formGroupId: 3,
  };
  const mockFormGroup = {
    id: 1,
    formGroupName: 'mockName',
  };
  test('renders', () => {
    const { container } = render(<Component classes={{}} form={mockForm} formGroups={[mockFormGroup]} />);
    expect(container).toMatchSnapshot();
  });

  test('should have formGroupName in breadcrumb', () => {
    const { container } = render(<Component classes={{}} form={mockForm} formGroups={[mockFormGroup]} />);
    const breadCrumb = waitForElement(() => container(mockFormGroup.formGroupName));
    expect(breadCrumb).toBeDefined();
  });
});
