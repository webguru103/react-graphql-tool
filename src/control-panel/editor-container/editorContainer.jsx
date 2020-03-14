import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core';
import {
  withFormVersion, withUpdateFormData, withCreateFields, withUpdateFields,
} from './api/editor.service';
import styles from './editorContainer.styles';
import { compose, pro } from '../../utility';
import EditorCore from '../../editor/core/editorCore';
import { EDITOR_MODE } from '../../editor/constants';
import type { Form } from '../../flowTypes';
import Loading from '../../shared/loading';
import Navbar from './topNavbar/templateNavbar';
import type { EditorDocument, DataInput } from '../../editor/core/flowTypes';
import { prepareCreateFieldsResponse, prepareUpdateFieldsResponse } from './editorContainer.utils';

type PropType = {
  form: Form,
  transactionName: string,
  classes: Object,
  match: { params: { transactionId: string, documentId: string }},
  history: { push: Function },
  refetch: () => void,
  mode: $Keys<typeof EDITOR_MODE>,
  updateFormData: ({ id: number, fields: DataInput }) => void,
  createFields: Function,
  updateFields: Function,
}

type StateType = {
  adaptedForm: ?Array<EditorDocument>,
  form: ?Form,
}

class EditorContainerC extends React.PureComponent<PropType, StateType> {

  state = {
    form: null,
    adaptedForm: null,
  };

  componentDidUpdate() {
    if (!this.state.form && this.props.form) {
      this.setState({ form: this.props.form, adaptedForm: [this.transformFormToEditorFormat(this.props.form)] });
    }
  }

  refreshForm = async () => {
    await this.props.refetch();
    this.setState({ form: this.props.form, adaptedForm: [this.transformFormToEditorFormat(this.props.form)] });
  };

  transformFormToEditorFormat = (form: Form): EditorDocument => ({
    id: form.formVersion.id,
    name: form.formName,
    sourceURL: form.formVersion.sourceURL,
    pages: form.formVersion.pages,
    data: {
      nodes: form.formVersion.formData.nodes.map((formData) => {
        if (formData) {
          return ({
            id: formData.id,
            fieldType: formData.fieldType,
            dataName: formData.formDataName,
            value: formData.value,
            affectsSignature: formData.affectsSignature,
            required: formData.required,
          });
        }
        return null;
      }),
      totalCount: form.formVersion.formData.totalCount,
    },
  });

  updateFormData = (formDataInput) => {
    const { form } = this.state;
    const { updateFormData } = this.props;

    const { id, fields: { dataName, ...restFields } } = formDataInput;

    updateFormData({
      id,
      fields: {
        ...restFields,
        formDataName: dataName,
        formVersionId: form && form.draftVersionId,
      },
    });
  };

  createFields = (newFields, pageId) => {
    const { form } = this.state;
    const { createFields } = this.props;
    return new Promise(async (res, rej) => {
      const [err, fields] = await pro(createFields({
        formVersionId: Number(form && form.draftVersionId),
        ...prepareCreateFieldsResponse(newFields, pageId, Number(form && form.draftVersionId)),
      }));

      if (err) {
        rej(err);
      }

      res(fields);
    });
  };

  updateFields = (updatedFields, formVersionId, { deleting } = { deleting: false }) => {
    const { updateFields } = this.props;
    return new Promise(async (res, rej) => {
      const [err] = await pro(updateFields({
        formVersionId,
        ...prepareUpdateFieldsResponse(updatedFields, deleting),
      }));

      if (err) {
        rej(err);
      }

      res();
    });
  };

  render() {
    const {
      transactionName, classes, mode,
    } = this.props;
    const { adaptedForm, form } = this.state;

    return (
      <div className={classes.root}>
        {!form && <Loading message="LOADING..." />}
        <Navbar
          mode={mode}
          form={form}
          refreshForm={this.refreshForm}
          transactionName={transactionName}
        />
        <div className={classNames(
          classes.editorContainer,
          mode === EDITOR_MODE.TEMPLATE_DRAFT ? 'editorContainer--withBanner' : '',
        )}
        >
          {
            adaptedForm
              && (
                <EditorCore
                  mode={mode}
                  documents={adaptedForm}
                  updateData={this.updateFormData}
                  createFields={this.createFields}
                  updateFields={this.updateFields}
                />
              )
          }
        </div>
      </div>
    );
  }

}

export default compose(
  withStyles(styles),
  withRouter,
  withFormVersion,
  withUpdateFormData,
  withCreateFields,
  withUpdateFields,
)(EditorContainerC);
