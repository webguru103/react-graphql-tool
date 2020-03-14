import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import EmptySession from './emptySession';
import ViewSessions from './viewSessions';
import styles from './sessions.styles';
import { get, compose } from '../../utility';
import { getAllTransactionsBasic } from '../api/queries/allTransactionsBasic';
import type { AllTransactionsBasicResponse } from '../api/queries/allTransactionsBasic';
import Navbar from './navbar';

type Props = {
  classes: Object,
  data: AllTransactionsBasicResponse,
};

class Sessions extends React.PureComponent<Props, *> {

  render() {
    const {
      classes,
      data,
    } = this.props;

    const transactions = get(data, 'allTransactions.nodes', []).filter((transaction) => {
      if (get(transaction, 'transactionSessionsByTransactionId.nodes.0.prepComplete', false) === true) {
        return transaction;
      }
      return null;
    });

    if (data.loading) {
      return (
        <React.Fragment>
          <Navbar />
          <div className={classes.sessions}>
            <ViewSessions loading={data.loading} />
          </div>
        </React.Fragment>
      );
    }

    if (!transactions || !transactions.length) {
      return (
        <React.Fragment>
          <Navbar />
          <div className={classes.sessions}>
            <EmptySession />
          </div>
        </React.Fragment>
      );
    }

    if (transactions.length) {
      return (
        <React.Fragment>
          <Navbar />
          <div className={classes.sessions}>
            <ViewSessions sessions={transactions} />
          </div>
        </React.Fragment>
      );
    }

    return null;

  }

}

export default compose(
  getAllTransactionsBasic,
  withStyles(styles, { withTheme: true }),
)(Sessions);
