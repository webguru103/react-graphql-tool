import React from 'react';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router';
import type { Match } from 'react-router';
import EditorCore from '../../editor/core/editorCore';
import { compose } from '../../utility';
import styles from './editorContainer.styles';
import { transactionSessionById } from '../api/queries/transactionSessionById';
import { EDITOR_MODE } from '../../constants';
import type { TransactionSession } from '../api/fragments/transactionSession';
import type { TransactionSessionByIdResponse } from '../api/queries/transactionSessionById';

type State = {
  session: ?TransactionSession,
}

type Props = {
  classes: Object,
  match: Match,
  data: TransactionSessionByIdResponse,
}

class EditorContainerC extends React.PureComponent<Props, State> {

  state = {
    session: null,
  };

  componentDidUpdate() {
    if (!this.state.session && this.props.data.transactionSessionById) {
      this.setState({ session: this.props.data.transactionSessionById });
    }
  }

  render() {
    const { classes, match: { params: { documentId } } } = this.props;
    const { session } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.editorContainer}>
          {
            session
            && session.docsByTransactionSessionId
            && (
              <EditorCore
                mode={EDITOR_MODE.INSTANCE_VIEW}
                documents={session.docsByTransactionSessionId.nodes}
                signees={session.sessionSigneesByTransactionSessionId.nodes}
                scrollToDocId={Number(documentId)}
                sessionId={session && session.id}
                emailTitle={session && session.emailTitle}
              />
            )
          }
        </div>
        )
      </div>
    );
  }

}

export default compose(
  withStyles(styles),
  withRouter,
  transactionSessionById,
)(EditorContainerC);
