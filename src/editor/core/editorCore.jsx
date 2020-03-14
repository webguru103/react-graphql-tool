import * as React from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import type { RouterHistory } from 'react-router';
import { withStyles } from '@material-ui/core';
import { Document as PDFProvider } from 'react-pdf/dist/entry.webpack';
import styles from './editorCore.styles';
import FormDataEditor from './formDataEditor';
import {
  EDITOR_MODE, FIELD_TYPES,
} from '../constants';
import TemplateEditor from './templateEditor/templateEditor';
import ViewEditor from './viewEditor';
import SigningEditor from './signingEditor/signingEditor';
import type {
  AdaptedField, Data, EditorDocument, FieldTemplate,
} from './flowTypes';
import type { CreatePageFieldsResponse } from '../../agent-panel/api/mutations/createDocPageFields';
import type { UpdateDocPageFieldsResponse } from '../../agent-panel/api/mutations/updateDocPageFields';
import type { SessionSignee } from '../../agent-panel/api/fragments/sessionSignee';
import Loading from '../../shared/loading/loading';
import type { StampType } from '../../agent-panel/api/mutations/signOrWipe';
import type { UserStampInput, CreateUserStampResponse } from '../../agent-panel/api/mutations/createUserStamp';

type PropType = {
  classes: Object,
  mode: $Values<typeof EDITOR_MODE>,
  documents: Array<EditorDocument>,
  signees: Array<?SessionSignee>,
  createData: ({
    value: any,
    docId: number,
    affectsSignature: boolean,
    required: boolean,
    valueType: $Values<typeof FIELD_TYPES>
  }) => Promise<Data>,
  updateData: ({ id: number, fields: Data }) => Promise<void>,
  createFields: (fields: Array<FieldTemplate>, pageId: number, docId: number) => Promise<CreatePageFieldsResponse>,
  updateFields: (fields: Array<AdaptedField>, docId: number, ?{ deleting: boolean }) => Promise<UpdateDocPageFieldsResponse>,
  createUserStamps: ({ userSignature: UserStampInput, userInitial: UserStampInput }) => Promise<CreateUserStampResponse>,
  sessionSigneeName: string,
  history: RouterHistory,
  createData: ({
    value: any,
    docId: number,
    affectsSignature: boolean,
    required: boolean,
    valueType: $Values<typeof FIELD_TYPES>
  }) => Promise<Data>,
  completeSigning: () => Promise<boolean>,
  signOrWipeField: ({
    fieldId: number,
    dataReference: number,
    docId: number,
    stampType: StampType,
    wipeField: boolean,
  }) => Promise<string>,
  scrollToDocId: number,
  sessionId: number,
  emailTitle: string,
  createUserStamps: (userSignature: { stamp: string }, userInitials: { stamp: string }) => Promise<void>,
  sessionName: string,
  signeeCheck: (checkAllSigneesHaveField: Function) => void,
};

export class EditorCoreC extends React.PureComponent<PropType, *> {

  state = {
    pdfPages: {},
  };

  onDocumentLoadSuccess = (docId: number, documentLength: number) => (pdf: Object) => {
    this.setState((prevState) => {
      const newPDFs = { ...prevState.pdfPages };
      newPDFs[docId] = {
        pdf,
        documentLength,
      };
      return { pdfPages: newPDFs };
    });
  };

  render() {
    const {
      classes,
      mode,
      documents,
      createData,
      updateData,
      createFields,
      updateFields,
      signees,
      sessionSigneeName,
      completeSigning,
      signOrWipeField,
      createUserStamps,
      scrollToDocId,
      sessionId,
      emailTitle,
      signeeCheck,
    } = this.props;

    const {
      pdfPages,
    } = this.state;

    if (!documents) {
      return <Loading message="LOADING..." />;
    }

    return (
      <React.Fragment>
        {documents.map(document => (
          <PDFProvider
            loading=""
            key={`pdfdoc-${document.id}`}
            file={document.sourceURL}
            onLoadSuccess={this.onDocumentLoadSuccess(document.id, document.pages.nodes.length)}
          />
        ))}
        <div className={classes.root}>
          <FormDataEditor
            documents={documents}
            createData={createData}
            updateData={updateData}
            mode={mode}
          >
            {
              ({ values, ...restProps }) => ({
                [EDITOR_MODE.TEMPLATE_DRAFT]: (
                  <TemplateEditor
                    {...restProps}
                    pdfPages={pdfPages}
                    values={values}
                    documents={documents}
                    mode={mode}
                    createFields={createFields}
                    updateFields={updateFields}
                  />
                ),
                [EDITOR_MODE.INSTANCE_PREPARATION]: (
                  <TemplateEditor
                    {...restProps}
                    pdfPages={pdfPages}
                    values={values}
                    documents={documents}
                    mode={mode}
                    signees={signees}
                    createFields={createFields}
                    updateFields={updateFields}
                    createUserStamps={createUserStamps}
                    signeeCheck={signeeCheck}
                  />
                ),
                [EDITOR_MODE.TEMPLATE_PUBLISHED]: (
                  <ViewEditor
                    pdfPages={pdfPages}
                    documents={documents}
                    values={values}
                    mode={mode}
                  />
                ),
                [EDITOR_MODE.INSTANCE_VIEW]: (
                  <ViewEditor
                    pdfPages={pdfPages}
                    documents={documents}
                    values={values}
                    mode={mode}
                    scrollToDocId={scrollToDocId}
                    sessionId={sessionId}
                    emailTitle={emailTitle}
                  />
                ),
                [EDITOR_MODE.SIGNING]: (
                  <SigningEditor
                    {...restProps}
                    pdfPages={pdfPages}
                    documents={documents}
                    values={values}
                    mode={mode}
                    signees={signees}
                    sessionSigneeName={sessionSigneeName}
                    completeSigning={completeSigning}
                    signOrWipeField={signOrWipeField}
                    createUserStamps={createUserStamps}
                  />
                ),
              }[mode])
            }
          </FormDataEditor>
        </div>
      </React.Fragment>
    );
  }

}

export default withStyles(styles)(EditorCoreC);
