import React from 'react';
import moment from 'moment';
import { get } from '../../utility';
import type { BrokerageType } from '../../flowTypes';

type TableUser = {
  firstName: string,
  lastName: string,
  email: string,
}

const AdminCell = ({ user: { firstName, lastName, email } }: { user: TableUser }) => (
  <div>
    <div>{`${firstName} ${lastName}`}</div>
    <div>{email}</div>
  </div>
);

const BrokerageCell = ({ brokerages }: { brokerages: Array<BrokerageType> }) => (
  <ul style={{ listStyle: 'none' }}>
    {brokerages.map(b => (
      <li key={b.id}>{b.brokerageName}</li>
    ))}
  </ul>
);

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
    align: 'left',
    accessor: (row: Object) => <BrokerageCell brokerages={row.brokerages} />,
    filterMethod: (filter: { id: string, value: string }, row: Object) => {
      const escapedStr = filter.value.toLowerCase();
      const regexExpr = `.*${escapedStr}.*`;
      const regex = new RegExp(regexExpr, 'i');
      let output = false;
      row._original.brokerages.forEach((brokerage: BrokerageType) => {
        if (regex.test(brokerage[filter.id])) {
          output = true;
        }
      });
      return output;
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
