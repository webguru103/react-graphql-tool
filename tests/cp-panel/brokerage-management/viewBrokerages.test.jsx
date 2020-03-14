/* eslint import/no-extraneous-dependencies: 0 */

import * as React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { withContext } from '../../test-helpers/contextWrapper';
import { ViewBrokeragesC } from '../../../src/control-panel/brokerage-management/viewBrokerages';
import { DEBOUNCE_TIMEOUT } from '../../../src/shared/table/constants';

const mockResponse = {
  data: {
    brokerages: {
      list: [
        {
          id: '02avcsd',
          name: 'DealTap Brokerage',
          address: {
            unit: '256',
            streetNumber: '10253',
            streetName: 'Dundas St',
          },
        },
      ],
      pageCount: 1,
    },
  },
};

describe('View Brokerages', () => {
  afterEach(cleanup);
  // jest.useFakeTimers();
  const Component = withContext(ViewBrokeragesC);

  test('renders', async (done) => {
    const fetchBrokerages = jest.fn(() => new Promise(resolve => resolve(mockResponse)));
    const { container, getByText } = render(<Component
      loading={false}
      onRefetch={fetchBrokerages}
      agentCount={() => Promise.resolve()}
      adminCount={() => Promise.resolve()}
    />);

    await waitForElement(() => getByText('Office'));

    setTimeout(() => {
      expect(container).toMatchSnapshot();
      done();
    }, DEBOUNCE_TIMEOUT + 50);
  });

  test('fetch brokerages upon mounting', async (done) => {
    const fetchBrokerages = jest.fn(() => new Promise(resolve => resolve(mockResponse)));
    const { getByText } = render(<Component
      loading={false}
      onRefetch={fetchBrokerages}
      agentCount={() => Promise.resolve()}
      adminCount={() => Promise.resolve()}
    />);

    await waitForElement(() => getByText('Office'));

    setTimeout(() => {
      expect(fetchBrokerages).toHaveBeenCalledTimes(1);
      done();
    }, DEBOUNCE_TIMEOUT + 50);
  });
});
