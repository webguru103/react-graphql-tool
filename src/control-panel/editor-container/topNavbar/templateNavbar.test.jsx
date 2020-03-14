import React from 'react';
import {
  render, cleanup,
} from 'react-testing-library';
import { withContext } from '../../../../tests/test-helpers/contextWrapper';
import { TopNavbarC } from './templateNavbar';
import { EDITOR_MODE } from '../../../editor/constants';

const mockForm = {
  id: 1,
  formName: 'Test Form',
  draftVersionId: 2,
  formVersion: {
    id: 2,
  },
};

describe('Editor TopNavbar', () => {
  afterEach(cleanup);
  const Component = withContext(TopNavbarC);
  test('renders', () => {
    const { container } = render(
      <Component classes={{}} mode={EDITOR_MODE.TEMPLATE_DRAFT} groupId={1} formId={1} groupName="Mock Group Name" form={mockForm} />,
    );
    expect(container).toMatchSnapshot();
  });
});
