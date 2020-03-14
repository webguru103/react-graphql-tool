/* eslint import/no-extraneous-dependencies: 0 */

import * as React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { withContext } from '../../test-helpers/contextWrapper';
import { ViewAgentsC } from '../../../src/control-panel/agent-management/viewAgents';
import { DEBOUNCE_TIMEOUT } from '../../../src/shared/table/constants';

const mockResponse = {
  data: {
    agents: [
      {
        id: 104,
        email: 'abc1@gmail.com',
        firstName: 'Jacey',
        lastName: 'GreenHolt',
        phone: '1234567891',
        createdAt: '2013-02-08',
        loggedInAt: '2013-02-08',
        oreaVerified: true,
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

describe('View Agents', () => {
  afterEach(cleanup);
  const Component = withContext(ViewAgentsC);

  test('renders', async (done) => {
    const fetchUsers = jest.fn(() => new Promise(resolve => resolve(mockResponse)));
    const { container, getByText } = render(<Component
      loading={false}
      onRefetch={fetchUsers}
    />);
    await waitForElement(() => getByText('Agent'));

    setTimeout(() => {

      expect(container).toMatchSnapshot();
      done();
    }, DEBOUNCE_TIMEOUT);

  });

  test('fetch users upon mounting', async () => {
    jest.useFakeTimers();
    const fetchUsers = jest.fn(() => new Promise(resolve => resolve(mockResponse)));
    const { getByText } = render(<Component
      loading={false}
      onRefetch={fetchUsers}
    />);

    await waitForElement(() => getByText('Agent'));

    jest.runAllTimers();
    expect(fetchUsers).toHaveBeenCalledTimes(1);
  });
});
