import React from 'react';
import moment from 'moment';
import { FORM_GROUP_VISIBILITY } from './constants';
import { get } from '../../utility';

const VisibilityFilter = (
  { filter, onChange }: { filter: { value: string }, onChange: Function },
) => (
  <select onChange={event => onChange(event.target.value)} value={filter ? filter.value : ''}>
    <option value="">All</option>
    <option value={FORM_GROUP_VISIBILITY.EVERYONE}>Everyone</option>
    <option value={FORM_GROUP_VISIBILITY.OREA}>Limit to OREA</option>
    <option value={FORM_GROUP_VISIBILITY.NO_ONE}>No one</option>
  </select>
);

const CreatedCell = ({
  createdAt,
  firstName,
  lastName,
}: { createdAt: string, firstName: string, lastName: string}) => (
  <div>
    <div>{moment(createdAt).format('MMMM Do YYYY, h:mm A')}</div>
    <div>{`${firstName} ${lastName}`}</div>
  </div>
);

const UpdatedCell = ({
  updatedAt,
  firstName,
  lastName,
}: { updatedAt: string, firstName: string, lastName: string}) => (
  <div>
    <div>{moment(updatedAt).format('MMMM Do YYYY, h:mm A')}</div>
    <div>{`${firstName} ${lastName}`}</div>
  </div>
);

export const columns = [
  {
    Header: 'Group Name',
    id: 'formGroupName',
    accessor: 'formGroupName',
    align: 'left',
  },
  {
    Header: 'Form Count',
    id: 'formCount',
    accessor: 'formCount',
    filterable: false,
  },
  {
    Header: 'Visible to',
    id: 'visibility',
    accessor: (d: Object) => {
      if (d.visibility === FORM_GROUP_VISIBILITY.NO_ONE) {
        return 'No one';
      }
      if (d.visibility === FORM_GROUP_VISIBILITY.EVERYONE) {
        return 'Everyone';
      }
      return 'Limited';
    },
    Filter: VisibilityFilter,
  },
  {
    Header: 'Created At',
    id: 'createdAt',
    accessor: (d: Object) => {
      const firstName = get(d.userByCreatedBy, 'firstName', '');
      const lastName = get(d.userByCreatedBy, 'lastName', '');
      return <CreatedCell createdAt={d.createdAt} firstName={firstName} lastName={lastName} />;
    },
    filterable: false,
  },
  {
    Header: 'Updated At',
    id: 'updatedAt',
    accessor: (d: Object) => {
      const firstName = get(d.userByUpdatedBy, 'firstName', '');
      const lastName = get(d.userByUpdatedBy, 'lastName', '');
      return <UpdatedCell updatedAt={d.updatedAt} firstName={firstName} lastName={lastName} />;
    },
    filterable: false,
  },
];
