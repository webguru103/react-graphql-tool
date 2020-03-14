import React from 'react';
import { withRouter } from 'react-router-dom';
import { withBrokerageName } from '../api/admin.service';
import { compose } from '../../utility';

const BrokerageNameBreadCrumbC = ({ brokerageName }: {brokerageName: string}) => (
  <span>{brokerageName || ''}</span>
);

export default compose(
  withRouter,
  withBrokerageName,
)(BrokerageNameBreadCrumbC);
