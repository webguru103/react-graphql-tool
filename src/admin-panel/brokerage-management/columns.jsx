import * as React from 'react';
import { withRouter } from 'react-router';
import type { RouterHistory } from 'react-router';
import TextButton from '../../shared/textButton/textButton';
import theme from '../../startup/theme';
import type { BrokerageType } from '../../flowTypes';

const OfficeCell = ({
  brokerage: {
    brokerageName, unit, streetNumber, streetName,
  },
}: { brokerage: BrokerageType}) => (
  <div>
    <div>{brokerageName}</div>
    <div>{`${unit} ${streetNumber} ${streetName}`}</div>
  </div>
);

const AgentCell = ({
  history,
  brokerage: {
    brokerageName,
    agentCount,
  },
}: { history: RouterHistory, brokerage: BrokerageType}) => (
  agentCount === 0
    ? <span style={{ fontSize: theme.table.fontSize, color: theme.palette.neutrals.secondaryText, cursor: 'initial' }}>0</span>
    : (
      <TextButton
        onClick={(e) => {
          e.stopPropagation();
          history.push(`/cp-user/agent-management?filter=brokerageName&filter_value=${brokerageName}`);
        }}
      >
        {agentCount}
      </TextButton>
    )
);

const AgentCellLink = (withRouter(AgentCell): React.Element);

const AdminCell = ({
  history,
  brokerage: {
    brokerageName,
    adminCount,
  },
}: { history: RouterHistory, brokerage: BrokerageType }) => (
  adminCount === 0
    ? <span style={{ fontSize: theme.table.fontSize, color: theme.palette.neutrals.secondaryText, cursor: 'initial' }}>0</span>
    : (
      <TextButton
        onClick={(e) => {
          e.stopPropagation();
          history.push(`/cp-user/admin-management?filter=brokerageName&filter_value=${brokerageName}`);
        }}
      >
        {Number(adminCount)}
      </TextButton>
    )
);

const AdminCellLink = (withRouter(AdminCell): React.Element);

export const columns = [
  {
    Header: 'Office',
    id: 'brokerageName',
    Cell: (row: Object) => <OfficeCell brokerage={row.original}>{row.value}</OfficeCell>,
    align: 'left',
    filterMethod: (filter: {id: string, value: string}, row: Object) => row[filter.id]
      && row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
    accessor: (row: Object) => `${row.brokerageName}`,
  },
  {
    Header: 'Agent Count',
    id: 'agentCount',
    Cell: (row: Object) => <AgentCellLink brokerage={row.original}>{row.value}</AgentCellLink>,
    filterable: false,
  },
  {
    Header: 'Admin Count',
    id: 'adminCount',
    Cell: (row: Object) => <AdminCellLink brokerage={row.original}>{row.value}</AdminCellLink>,
    filterable: false,
  },
  {
    Header: 'My Role',
    id: 'myRole',
    Filter: ({ filter, onChange }: { filter: React.Element, onChange: Function }) => (
      <select
        onChange={event => onChange(event.target.value)}
        value={filter ? filter.value : ''}
      >
        <option value="">Show all</option>
        <option value="ADMIN">Admin</option>
        <option value="SUPER_ADMIN">Super Admin</option>
      </select>
    ),
    accessor: 'roleCategory',
  },
];
