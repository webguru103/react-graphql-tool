import React from 'react';
import { withRouter } from 'react-router-dom';
import { withUserName } from './api/admin.service';
import { compose } from '../utility';

const UsernameBreadCrumbC = ({ firstName, lastName }: {firstName: string, lastName: string}) => (
  <span>{`${firstName || ''} ${lastName || ''}`}</span>
);

export default compose(
  withRouter,
  withUserName,
)(UsernameBreadCrumbC);
