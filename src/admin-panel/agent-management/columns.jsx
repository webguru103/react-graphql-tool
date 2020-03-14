import React from 'react';
import moment from 'moment';
import type { UserType, BrokerageType } from '../../flowTypes';
import { get } from '../../utility';

const AgentCell = ({ user: { firstName, lastName, email } }: { user: UserType }) => (
  <div>
    <div>{`${firstName} ${lastName}`}</div>
    <div>{email}</div>
  </div>
);

const BrokerageCell = ({
  brokerage: {
    brokerageName, unit, streetNumber, streetName,
  },
}: { brokerage: BrokerageType }) => (
  <div>
    <div>{brokerageName}</div>
    <div>{`${unit} ${streetNumber} ${streetName}`}</div>
  </div>
);

export const columns = [
  {
    Header: 'Agent',
    id: 'agent',
    Cell: (row: Object) => <AgentCell user={row.original} />,
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
    Header: 'Affiliation',
    id: 'oreaVerified',
    filterMethod: (filter: {id: string, value: string}, row: Object) => row[filter.id] && row[filter.id].includes(filter.value),
    accessor: (d: Object) => (d.oreaVerified ? 'OREA' : 'N/A'),
  },
  {
    Header: 'Brokerage Office(s)',
    id: 'brokerageName',
    align: 'left',
    accessor: (row: Object) => <BrokerageCell brokerage={row.brokerage} />,
    filterMethod:
      (filter: {id: string, value: string}, row: Object) => row._original.brokerage[filter.id]
        && row._original.brokerage[filter.id].includes(filter.value),
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
