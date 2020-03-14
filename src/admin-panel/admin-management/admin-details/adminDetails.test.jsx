import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { AdminDetailsC } from './adminDetails';
import { withContext } from '../../../../tests/test-helpers/contextWrapper';

describe('Admin Details', () => {
  afterEach(cleanup);
  it('renders', () => {
    const props = {
      classes: {},
      adminUserBrokerageAcls: [],
    };
    const { container } = render(<AdminDetailsC {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should correctly calculate the brokerages difference between my '
    + 'brokerages and target user brokerages and show the "Add access" button', async () => {
    const props = {
      classes: {},
      adminUserBrokerageAcls: [
        {
          roleCategory: 'ADMIN',
          brokerageByBrokerageId: {
            id: 2,
            brokerageName: 'brokerage2',
          },
          roleByRoleId: {
            roleName: 'ADMIN',
          },
        },
        {
          roleCategory: 'ADMIN',
          brokerageByBrokerageId: {
            id: 4,
            brokerageName: 'brokerage4',
          },
          roleByRoleId: {
            roleName: 'ADMIN',
          },
        },
      ],
      user: {
        brokerageAclsByUserId: {
          nodes: [
            {
              roleCategory: 'ADMIN',
              brokerageByBrokerageId: {
                id: 1,
                brokerageName: 'brokerage1',
              },
            },
            {
              roleCategory: 'ADMIN',
              brokerageByBrokerageId: {
                id: 4,
                brokerageName: 'brokerage4',
              },
              roleByRoleId: {
                roleName: 'ADMIN',
              },
            },
          ],
        },
      },
      targetUser: {
        id: 3,
      },
    };

    const Component = withContext(AdminDetailsC);

    const { getByText } = render(<Component {...props} />);

    const addAccessButton = await getByText('Add access');
    // button is shown if there are brokerages exists where I'm an admin and target user is not
    expect(addAccessButton).toBeDefined();
  });
});
