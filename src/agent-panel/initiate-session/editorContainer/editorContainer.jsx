import * as React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './editorContainer.styles';
import { compose, pro } from '../../../utility';
import EditorCore from '../../../editor/core/editorCore';
import Loading from '../../../shared/loading';
import {
  prepareCreateFieldsResponse,
  prepareUpdateFieldsResponse,
} from './editorContainer.utils';
import createDocPageFieldsMutation from '../../api/mutations/createDocPageFields';
import type { CreatePageFieldsResponse, DocPageFieldsInput } from '../../api/mutations/createDocPageFields';
import updateDocPageFieldsMutation from '../../api/mutations/updateDocPageFields';
import updateDocDataMutation from '../../api/mutations/updateDocData';
import type { UpdateDocPageFieldsInput, UpdateDocPageFieldsResponse } from '../../api/mutations/updateDocPageFields';
import { EDITOR_MODE } from '../../../constants';
import type { UpdateDocDataInput, UpdateDocDataResponse } from '../../api/mutations/updateDocData';
import { getTransactionById } from '../../api/queries/allTransactions';
import type { AllTransactionsResponse } from '../../api/queries/allTransactions';
import type { TransactionSession } from '../../api/fragments/transactionSession';
import createDocDataMutation from '../../api/mutations/createDocData';
import type { CreateDocDataInput, CreateDocDataResponse } from '../../api/mutations/createDocData';
import createUserStampMutation from '../../api/mutations/createUserStamp';
import type { UserStampInput, CreateUserStampResponse } from '../../api/mutations/createUserStamp';

type PropType = {
  classes: Object,
  createDocPageFields: ({ fields: DocPageFieldsInput }) => Promise<CreatePageFieldsResponse>,
  updateDocPageFields: ({ fields: UpdateDocPageFieldsInput }) => Promise<UpdateDocPageFieldsResponse>,
  mode: $Keys<typeof EDITOR_MODE>,
  createDocData: ({ docData: CreateDocDataInput }) => Promise<CreateDocDataResponse>,
  updateDocData: ({ id: number, docData: UpdateDocDataInput }) => Promise<UpdateDocDataResponse>,
  createUserStamp: ({ userSignature: UserStampInput, userInitial: UserStampInput }) => Promise<CreateUserStampResponse>,
  data: AllTransactionsResponse,
  navbar: React.Element,
  signeeCheck: (checkAllSigneesHaveField: Function) => void,
}

type StateType = {
  session: ?TransactionSession,
}

class EditorContainerC extends React.PureComponent<PropType, StateType> {

  state = {
    session: null,
  };

  componentDidUpdate() {
    if (!this.state.session && this.props.data.allTransactions) {
      const session = this.props.data.allTransactions.nodes[0]
        && this.props.data.allTransactions.nodes[0].transactionSessionsByTransactionId.nodes[0];
      this.setState({ session });
    }
  }

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

  createFields = (newFields, pageId, docId) => {
    const { createDocPageFields } = this.props;
    return new Promise(async (res, rej) => {
      createDocPageFields({
        // $FlowFixMe date dataValue input is Date
        fields: {
          docId: Number(docId),
          ...prepareCreateFieldsResponse(newFields, pageId, docId || -1),
        },
      })
        .then(fields => res(fields))
        .catch(err => rej(err));
    });
  };

  updateFields = (updatedFields, docId, { deleting } = { deleting: false }) => {
    const { updateDocPageFields } = this.props;
    return new Promise(async (res, rej) => {
      const [err, data] = await pro(updateDocPageFields({
        fields: {
          docId,
          ...prepareUpdateFieldsResponse(updatedFields, deleting),
        },
      }));

      if (err) {
        rej(err);
      }

      res(data);
    });
  };

  render() {
    const {
      classes, mode, navbar, data: { loading }, signeeCheck,
    } = this.props;

    const { session } = this.state;

    if (loading) {
      return <Loading message="LOADING..." />;
    }

    return (
      <div className={classes.root}>
        {navbar}
        <div className={classes.editorContainer}>
          {
            session
            && session.docsByTransactionSessionId
            && (
              <EditorCore
                mode={mode}
                documents={session.docsByTransactionSessionId.nodes}
                signees={session.sessionSigneesByTransactionSessionId.nodes}
                createFields={this.createFields}
                updateFields={this.updateFields}
                createData={this.createDocData}
                updateData={this.updateDocData}
                emailTitle={session.emailTitle}
                createUserStamps={this.createUserStamps}
                signeeCheck={signeeCheck}
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
  createDocPageFieldsMutation,
  updateDocPageFieldsMutation,
  createDocDataMutation,
  updateDocDataMutation,
  createUserStampMutation,
  getTransactionById,
)(EditorContainerC);
