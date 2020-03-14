import React from 'react';
import moment from 'moment';
import { FORM_STATUS } from './constants';
import { get } from '../../utility';

const PublishedCell = ({
  publishedAt,
  firstName,
  lastName,
}: { publishedAt: string, firstName: string, lastName: string}) => (
  <div>
    <div>{publishedAt}</div>
    <div>{`${firstName} ${lastName}`}</div>
  </div>
);

const DraftSavedCell = ({
  draftSavedAt,
  firstName,
  lastName,
}: { draftSavedAt: string, firstName: string, lastName: string}) => (
  <div>
    <div>{draftSavedAt}</div>
    <div>{`${firstName} ${lastName}`}</div>
  </div>
);

const StatusFilter = (
  { filter, onChange }: { filter: { value: string }, onChange: Function },
) => (
  <select onChange={event => onChange(event.target.value)} value={filter ? filter.value : ''}>
    <option value="">All</option>
    <option value={FORM_STATUS.ACTIVE}>Active</option>
    <option value={FORM_STATUS.INACTIVE}>Inactive</option>
  </select>
);

export const columns = [
  {
    Header: 'Form Name',
    id: 'formName',
    align: 'left',
    accessor: (d: Object) => d.formName,
  },
  {
    Header: 'Published At',
    id: 'publishedAt',
    filterable: false,
    accessor: (d: Object) => {
      const firstName = get(d.userByPublishedBy, 'firstName', '');
      const lastName = get(d.userByPublishedBy, 'lastName', '');
      const publishedAt = d.publishedAt ? moment(d.publishedAt).format('MMMM Do YYYY, h:mm A') : 'Not published yet';
      return <PublishedCell publishedAt={publishedAt} firstName={firstName} lastName={lastName} />;
    },
  },
  {
    Header: 'Draft Saved At',
    id: 'draftSavedAt',
    filterable: false,
    accessor: (d: Object) => {
      const firstName = get(d.userByDraftSavedBy, 'firstName', '');
      const lastName = get(d.userByDraftSavedBy, 'lastName', '');
      const draftSavedAt = d.draftSavedAt ? moment(d.draftSavedAt).format('MMMM Do YYYY, h:mm A') : 'Not saved yet';
      return <DraftSavedCell draftSavedAt={draftSavedAt} firstName={firstName} lastName={lastName} />;
    },
  },
  {
    Header: 'Status',
    id: 'formStatus',
    accessor: (d: Object) => d.formStatus,
    Filter: StatusFilter,
  },
  {
    id: 'formGroupId',
    accessor: 'formGroupId',
    show: false,
  },
  {
    id: 'publishedStatus',
    accessor: 'publishedStatus',
    show: false,
  },
];
