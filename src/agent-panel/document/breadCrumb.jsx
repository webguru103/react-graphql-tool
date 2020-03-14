import React from 'react';
import { withRouter } from 'react-router-dom';
import { withTransactionName } from './api/document.service';
import { compose } from '../../utility';

const TransactionBreadcrumbC = ({ transactionName }: {transactionName: string}) => (
  <span>{transactionName}</span>
);

export default compose(
  withRouter,
  withTransactionName,
)(TransactionBreadcrumbC);
