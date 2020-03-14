import * as React from 'react';
import type { RouterHistory } from 'react-router';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router';
import styles from './editorContainer.styles';
import { compose } from '../../utility';
import EditorCore from '../../editor/core/editorCore';
import Loading from '../../shared/loading';
import { EDITOR_MODE } from '../../constants';
import type { TransactionSession } from '../api/fragments/transactionSession';
import { sessionSigneeBySigningToken as sessionSigneeBySigningTokenQuery } from '../api/queries/sessionSigneeBySigningToken';
import type { SessionSigneeBySigningTokenResponse } from '../api/queries/sessionSigneeBySigningToken';
import createDocDataMutation from '../api/mutations/createDocData';
import type { CreateDocDataInput, CreateDocDataResponse } from '../api/mutations/createDocData';
import completeSigningMutation from '../api/mutations/completeSigning';
import updateDocDataMutation from '../api/mutations/updateDocData';
import type { UpdateDocDataInput, UpdateDocDataResponse } from '../api/mutations/updateDocData';
import type { SignOrWipeFieldResponse, StampType } from '../api/mutations/signOrWipe';
import signOrWipeFieldMutation from '../api/mutations/signOrWipe';
import type { User } from '../api/fragments/user';
import { withUpdateUserState } from '../../shared/authorization';
import createUserStampMutation from '../api/mutations/createUserStamp';

type PropType = {
  classes: Object,
  mode: $Keys<typeof EDITOR_MODE>,
  data: SessionSigneeBySigningTokenResponse,
  history: RouterHistory,
  location: Location,
  createDocData: ({ docData: CreateDocDataInput }) => Promise<CreateDocDataResponse>,
  completeSigning: () => Promise<boolean>,
  updateDocData: ({ id: number, docData: UpdateDocDataInput }) => Promise<UpdateDocDataResponse>,
  signOrWipeField: ({
    fieldId: number,
    dataReference: number,
    docId: number,
    stampType: StampType,
    wipeField: boolean,
  }) => Promise<SignOrWipeFieldResponse>,
  createUserStamp: ({ userSignature: { stamp: string }, userInitial: { stamp: string } }) => Promise<void>,
  setUser: (user: ?User) => void,
}

type StateType = {
  session: ?TransactionSession,
  sessionSigneeName: ?string,
}

class EditorContainerC extends React.PureComponent<PropType, StateType> {

  state = {
    session: null,
    sessionSigneeName: '',
  };

  componentDidUpdate() {
    if (!this.state.session && this.props.data.sessionSigneeBySigningToken) {
      const {
        transactionSessionByTransactionSessionId: session,
        sessionSigneeName,
        userByUserId,
      } = this.props.data.sessionSigneeBySigningToken;

      // Check if current signee has any fields in the session.
      // If not, forward to viewing mode.
      if (session && sessionSigneeName) {
        const doesSigneeHaveFieldInSession = this.doesSigneeHaveField(sessionSigneeName, session);
        if (!doesSigneeHaveFieldInSession) {
          const { location: { search } } = this.props;
          const urlParams = new URLSearchParams(search);
          const signingToken = urlParams.get('token');

          // Call CompleteSigning.
          this.completeSigning();

          // Forward to viewing mode because there are no fields to sign.
          this.props.history.push(`/view?token=${signingToken || ''}`);
          return;
        }
      }

      this.setState({
        session,
        sessionSigneeName,
      });

      // also set the global user object
      this.props.setUser(userByUserId);
    }
  }

  doesSigneeHaveField = (sessionSigneeName: string, session: TransactionSession) => {
    const docs = session.docsByTransactionSessionId.nodes;
    if (docs.length === 0) {
      return false;
    }

    // Compile all fields of all docs of this transaction session.
    const fields = [];
    const docsLength = docs.length;
    for (let i = 0; i < docsLength; i += 1) {
      const doc = docs[i];
      if (!doc) {
        break;
      }
      const pagesLength = doc.pages.nodes.length;
      for (let j = 0; j < pagesLength; j += 1) {
        const page = doc.pages.nodes[j];
        if (!page) {
          break;
        }
        fields.push(...page.boolFields.nodes);
        fields.push(...page.dateFields.nodes);
        fields.push(...page.initialFields.nodes);
        fields.push(...page.signatureFields.nodes);
        fields.push(...page.textFields.nodes);
      }
    }

    // Check if sessionSigneeName is on any fields.
    let signeeHasField = false;
    const fieldsLength = fields.length;
    for (let i = 0; i < fieldsLength; i += 1) {
      const assigneeToCheck = fields[i] && fields[i].assignee;
      if (assigneeToCheck === sessionSigneeName) {
        signeeHasField = true;
        break;
      }
    }

    return signeeHasField;
  }

  updateDocData = (docDataInput) => {
    const { updateDocData } = this.props;

    const { id, fields: { dataName, ...restField } } = docDataInput;

    updateDocData({
      id,
      docData: {
        ...restField,
        docDataName: dataName,
      },
    });
  };

  createDocData = (docDataInput: CreateDocDataInput) => {
    const { createDocData } = this.props;

    return new Promise(async (res, rej) => {
      createDocData({
        docData: docDataInput,
      })
        .then((docData) => {
          const data = docData && docData.data && docData.data.createDocData;
          if (data) {
            res(data);
          } else {
            res(null);
          }

        })
        .catch(err => rej(err));
    });
  };

  completeSigning = (): Promise<boolean> => {
    const { completeSigning } = this.props;

    return new Promise(async (res, rej) => {
      completeSigning()
        .then(data => res(data))
        .catch(err => rej(err));
    });
  };

  signOrWipeField = (fieldId: number, dataReference: number, docId: number, stampType: StampType, wipeField: boolean) => {
    const { signOrWipeField } = this.props;

    return new Promise(async (res, rej) => {
      signOrWipeField({
        fieldId,
        dataReference,
        docId,
        stampType,
        wipeField,
      })
        .then(data => res(data && data.data && data.data.signOrWipeField))
        .catch(err => rej(err));
    });
  };

  createUserStamps = (userSignature, userInitial) => {
    const { createUserStamp } = this.props;

    return new Promise(async (res, rej) => {
      createUserStamp(
        {
          userSignature,
          userInitial,
        },
      )
        .then(data => res(data))
        .catch(data => rej(data));
    });
  };

  render() {
    const {
      classes, mode, data: { loading, sessionSigneeBySigningToken }, history, location: { search },
    } = this.props;

    const { session, sessionSigneeName } = this.state;

    if (loading) {
      return <Loading message="LOADING..." />;
    }

    // if already signed, redirect user to viewing mode
    if (sessionSigneeBySigningToken && sessionSigneeBySigningToken.signedAt) {
      const urlParams = new URLSearchParams(search);
      const signingToken = urlParams.get('token');

      history.push(`/view?token=${signingToken || ''}`);
      return null;
    }

    return (
      <div className={classes.root}>
        <div className={classes.editorContainer}>
          {
            session
            && session.docsByTransactionSessionId
            && (
              <EditorCore
                mode={mode}
                documents={session.docsByTransactionSessionId.nodes}
                signees={session.sessionSigneesByTransactionSessionId.nodes}
                updateData={this.updateDocData}
                createData={this.createDocData}
                sessionSigneeName={sessionSigneeName}
                completeSigning={this.completeSigning}
                signOrWipeField={this.signOrWipeField}
                createUserStamps={this.createUserStamps}
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
  sessionSigneeBySigningTokenQuery,
  createDocDataMutation,
  completeSigningMutation,
  updateDocDataMutation,
  withUpdateUserState,
  createUserStampMutation,
  signOrWipeFieldMutation,
)(EditorContainerC);
