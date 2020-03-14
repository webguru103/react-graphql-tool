import React from 'react';
import Table from '../../../shared/table/unControlledTable';
import { RemoveAdminFromBO } from '../../../shared/adminDetails';

const VisibilityFilter = ({ filter, onChange }: { filter: { value: string }, onChange: Function }) => (
  <select onChange={event => onChange(event.target.value)} value={filter ? filter.value : ''}>
    <option value="">Show all</option>
    <option value="Super Admin">Super Admin</option>
    <option value="Admin">Admin</option>
  </select>
);

const columns = [
  {
    Header: 'Brokerage Offices',
    id: 'brokerage-name',
    filterMethod: (filter: {id: string, value: string}, row: Object) => row[filter.id]
      && row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
    accessor: (d: Object) => `${d.brokerageByBrokerageId.brokerageName}`,
  },
  {
    Header: 'Role',
    id: 'role',
    accessor: (d: Object) => `${d.roleByRoleId.roleName}`,
    Filter: VisibilityFilter,
  },
];

type BrokerageTableProp = {
  data: Array<Object>, // TODO fix ones flowtypes are merged,
  totalCount: number,
  onRemoveAccess: Function,
  adminName: string,
  loading: boolean,
}

const BrokerageTable = ({
  data, totalCount, onRemoveAccess, adminName, loading,
}: BrokerageTableProp) => (
  <Table
    data={data}
    loading={loading}
    columns={[
      ...columns,
      {
        Header: 'Action',
        filterable: false,
        sortable: false,
        Cell: ({ original }: Object) => (
          <RemoveAdminFromBO
            shortTitle
            adminName={adminName}
            handleSubmit={() => onRemoveAccess({ brokerageAclId: original.id })}
          />
        ),
      },
    ]}
    defaultPageSize={5}
    totalAmount={totalCount}
  />
);

export default BrokerageTable;
