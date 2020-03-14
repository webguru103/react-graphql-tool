import * as React from 'react';
import { withSnackbar } from '../../shared/snackbar/withSnackbar';
import type { TransactionBasic } from '../api/fragments/transaction';
import type { TransactionSessionBasic } from '../api/fragments/transactionSession';
import type { DocBasic } from '../api/fragments/doc';
import type { SessionSignee } from '../api/fragments/sessionSignee';
import SessionCard from './sessionCard';

type Props = {
  sessions: Array<?{
    ...$Exact<TransactionBasic>,
    transactionSessionsByTransactionId: {
      nodes: {
        ...$Exact<TransactionSessionBasic>,

        docsByTransactionSessionId: {
          nodes: Array<?DocBasic>,
          totalCount: number,
        },

        sessionSigneesByTransactionSessionId: {
          nodes: Array<?SessionSignee>,
          totalCount: number,
        },
      }
    },
  }>,
  loading: boolean,
};

class ViewSessionsC extends React.PureComponent<Props, null> {

  render() {
    const {
      sessions,
      loading,
    } = this.props;

    if (loading) {
      // show 3 fake session cards in loading state

      return [0, 1, 2].map(value => (
        <SessionCard
          loading={loading}
          session={{}}
          key={value}
        />
      ));
    }

    return (
      sessions.map(session => (
        <SessionCard
          session={session && session.transactionSessionsByTransactionId.nodes[0]}
          key={session && session.id}
        />
      ))
    );
  }

}

export default withSnackbar(ViewSessionsC);
