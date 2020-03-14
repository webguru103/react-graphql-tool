import React from 'react';
import moment from 'moment';
import { get } from '../../utility';

const AdminCell = ({ user: { firstName, lastName, email } }: { user: Object }) => (
  <div>
    <div>{`${firstName} ${lastName}`}</div>
    <div>{email}</div>
  </div>
);

const BrokerageCell = ({ user: { brokerageAclsByUserId } }: { user: Object }) => {
  if (brokerageAclsByUserId && brokerageAclsByUserId.nodes && brokerageAclsByUserId.nodes.length) {
    return (
      <ul style={{ listStyle: 'none' }}>
        {brokerageAclsByUserId.nodes.map(brokerage => (
          <li key={get(brokerage, 'brokerageByBrokerageId.id')}>
            {get(brokerage, 'brokerageByBrokerageId.brokerageName')}
          </li>
        ))}
      </ul>
    );
  }
  return <div style={{ padding: '0 0 0 40px' }}>N/A</div>;
};

export const columns = [
  {
    Header: 'Admin',
    id: 'admin',
    Cell: (row: Object) => <AdminCell user={row.original} />,
    align: 'left',
    filterMethod: (filter: {id: string, value: string}, row: Object) => row[filter.id]
      && row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
    accessor: (row: Object) => `${row.email} ${row.firstName} ${row.lastName}`,
  },
  {
    Header: 'Phone',
    id: 'phone',
    accessor: 'phone',
    filterable: false,
  },
  {
    Header: 'Brokerage Office(s)',
    id: 'brokerageName',
    Cell: (row: Object) => <BrokerageCell user={row.original} />,
    accessor: (d: Object) => (
      (d.brokerageAclsByUserId.nodes.length > 0) ? get(d, 'brokerageAclsByUserId.nodes.0.brokerageByBrokerageId.brokerageName') : 'N/A'
    ),
    align: 'left',
    filterMethod: (filter: { id: string, value: string }, row: Object) => {
      const brokerage = row._original.brokerageAclsByUserId.nodes[0];
      if (brokerage) {
        return brokerage.brokerageByBrokerageId[filter.id].includes(filter.value);
      }
      return false;
    },
  },
  {
    Header: 'Created At',
    id: 'createdAt',
    accessor: (d: Object) => moment(d.createdAt).format('MMMM Do YYYY, h:mm A'),
    filterable: false,
  },
  {
    Header: 'Last Login',
    id: 'loggedInAt',
    accessor: (d: Object) => {
      const loggedInAt = get(d, 'loggedInAt');
      const formattedLoggedInAt = loggedInAt && moment(loggedInAt).format('MMMM Do YYYY, h:mm A');
      return formattedLoggedInAt || 'N/A';
    },
    filterable: false,
  },
];
