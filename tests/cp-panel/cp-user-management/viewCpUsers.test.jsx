/* eslint import/no-extraneous-dependencies: 0 */

import * as React from 'react';
import 'jest-dom/extend-expect';
import {
  render, cleanup, waitForElement,
} from 'react-testing-library';
import { withContext } from '../../test-helpers/contextWrapper';
import UsersC from '../../../src/control-panel/cp-user-management/cpUsers';
import { DEBOUNCE_TIMEOUT } from '../../../src/shared/table/constants';

const mockResponse = {
  data: {
    cpUsers: {
      nodes: [
        {
          user: {
            id: 'abc1',
            email: 'abc1@gmail.com',
            firstName: 'Jacey',
            lastName: 'GreenHolt',
            loggedInAt: '2013-02-08',
            invites: {
              nodes: [
                {
                  createdAt: '2013-01-04',
                  userByRequestedId: {
                    id: 'abc2',
                    firstName: 'Ab',
                    lastName: 'Goa',
                  },
                },
              ],
            },
          },
        },
      ],
    },
  },
};

describe('View CP Users', () => {
  afterEach(cleanup);
  const Component = withContext(UsersC);

  test('renders', async (done) => {
    const fetchUsers = jest.fn(() => new Promise(resolve => resolve(mockResponse)));
    const { container, getByText } = render(<Component
      loading={false}
      onRefetch={fetchUsers}
    />);

    await waitForElement(() => getByText('Email'));

    setTimeout(() => {
      expect(container).toMatchSnapshot();
      done();
    }, DEBOUNCE_TIMEOUT);

  });

  test.skip('fetch users upon mounting', async (done) => {
    const fetchUsers = jest.fn(() => new Promise(resolve => resolve(mockResponse)));
    const { getByText } = render(<Component
      loading={false}
      onRefetch={fetchUsers}
    />);

    await waitForElement(() => getByText('Email'));

    setTimeout(() => {
      expect(fetchUsers).toHaveBeenCalledTimes(1);
      done();
    }, DEBOUNCE_TIMEOUT);

  });
});
