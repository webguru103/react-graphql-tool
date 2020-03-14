import moment from 'moment';
import { get } from '../../utility';

export const columns = [
  {
    Header: 'Name',
    id: 'name',
    filterMethod: (filter: {id: string, value: string}, row: Object) => row[filter.id]
      && row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
    accessor: (d: Object) => `${get(d, 'userByUserId.firstName')} ${get(d, 'userByUserId.lastName')}`,
  },
  {
    Header: 'Email',
    id: 'email',
    filterMethod: (filter: {id: string, value: string}, row: Object) => row[filter.id]
      && row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
    accessor: (d: Object) => `${get(d, 'userByUserId.email')}`,
    align: 'left',
  },
  {
    Header: 'Invited By',
    id: 'invitedBy',
    filterMethod: (filter: {id: string, value: string}, row: Object) => row[filter.id]
      && row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
    accessor: (d: Object) => {
      const firstName = get(d, 'userByUserId.invitesByUserId.nodes.0.userByRequestedById.firstName');
      const lastName = get(d, 'userByUserId.invitesByUserId.nodes.0.userByRequestedById.lastName');

      return (firstName || lastName) ? `${firstName} ${lastName}` : 'N/A';
    },
  },
  {
    Header: 'Invited At',
    id: 'invitedAt',
    accessor: (d: Object) => {
      const invitedAt = get(d, 'userByUserId.invitesByUserId.nodes.0.createdAt');
      const formattedInvitedAt = invitedAt && moment(invitedAt).format('MMMM Do YYYY, h:mm A');
      return formattedInvitedAt || 'N/A';
    },
    filterable: false,
  },
  {
    Header: 'Last Login',
    id: 'lastLogin',
    accessor: (d: Object) => {
      const loggedInAt = get(d, 'userByUserId.loggedInAt');
      const formattedLoggedInAt = loggedInAt && moment(loggedInAt).format('MMMM Do YYYY, h:mm A');
      return formattedLoggedInAt || 'N/A';
    },
    filterable: false,
  },
];
