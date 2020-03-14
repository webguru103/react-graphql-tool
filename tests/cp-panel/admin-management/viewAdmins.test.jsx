/* eslint import/no-extraneous-dependencies: 0 */

import * as React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { withContext } from '../../test-helpers/contextWrapper';
import { ViewAdminsC } from '../../../src/control-panel/admin-management/viewAdmins';
import { DEBOUNCE_TIMEOUT } from '../../../src/shared/table/constants';

const mockResponse = {
  data: {
    admins: [
      {
        id: 104,
        email: 'abc1@gmail.com',
        firstName: 'Jacey',
        lastName: 'GreenHolt',
        phone: '1234567891',
        createdAt: '2013-02-08',
        loggedInAt: '2013-02-08',
        brokerageAclsByUserId: {
          nodes: [
            {
              id: 500,
              brokerageName: 'Brokerage Name',
            },
          ],
        },
      },
    ],
  },
};

describe('View Admins', () => {
  afterEach(cleanup);
  const Component = withContext(ViewAdminsC);

  test('renders', async (done) => {
    const fetchUsers = jest.fn(() => new Promise(resolve => resolve(mockResponse)));
    const { container, getByText } = render(<Component
      loading={false}
      onRefetch={fetchUsers}
    />);

    await waitForElement(() => getByText('Admin'));
    setTimeout(() => {
      expect(container).toMatchSnapshot();
      done();
    }, DEBOUNCE_TIMEOUT + 50);
  });

  test('fetch users upon mounting', async (done) => {
    const fetchUsers = jest.fn(() => new Promise(resolve => resolve(mockResponse)));
    const { getByText } = render(<Component
      loading={false}
      onRefetch={fetchUsers}
    />);

    await waitForElement(() => getByText('Admin'));
    setTimeout(() => {
      expect(fetchUsers).toHaveBeenCalledTimes(1);
      done();
    }, DEBOUNCE_TIMEOUT + 50);

  });
});
