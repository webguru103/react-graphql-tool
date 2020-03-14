// @flow

import * as React from 'react';
import type { Node } from 'react';
import { withDialog } from '../../../shared/dialog/withDialog';
import DialogButtonBottom from '../../../shared/dialogButtonBottom/dialogButtonBottom';
import FormInput from './formInput';
import validator from '../../../validation/helpers';
import { formValidationSchema } from '../../../validation/validationSchemas';
import { withCreateForm } from '../api/form.service';
import { pro, compose, get } from '../../../utility';
import c from '../constants';
import { errParser } from '../../../api-error-parser';
import errorMessages from '../../../api-error-parser/formattedMessages';
import type { DocumentUpload } from '../flowTypes';

type Props = {
  createForm: Function,
  closeDialog: Function,
  groupId: string,
  history: Object,
  testMode: boolean, // Used for testing to bypass file upload dialog
}

export class CreateFormDialogC extends React.PureComponent<Props, *> {

  state = {
    networkError: '',
  };

  onCreate = async ({
    name,
    status,
    documents,
  }: {
      name: string,
      status: string,
      documents: Array<DocumentUpload>,
    } = {}) => {
    let pdf = get(documents[0], 'pdf', '');
    const pages = get(documents[0], 'docPages', []);

    // TestMode added here because a file cannot be easily programmatically added to the dropzone input
    // for testing purposes. Passing in the testMode prop will add a test URL to the urls array,
    // And also bypasses the validation step in the validate function.
    if (this.props.testMode) {
      pdf = 'http://testurl.com/pdf.pdf';
    }

    if (pdf === '') {
      return;
    }

    const {
      history,
      groupId,
      createForm,
      closeDialog,
    } = this.props;

    const formInput = {
      formName: name.trim(),
      formGroupId: groupId,
      formStatus: status,
    };

    const formPages = pages.map(item => ({
      pageNumber: item.pageNumber,
      width: item.width,
      height: item.height,
    }));

    const formVersionInput = {
      sourceURL: get(documents[0], 'pdf', ''),
      formPages,
    };

    const [err, data] = await pro(createForm(formInput, formVersionInput));

    if (err) {
      const parsedErr = errParser.parse(err);
      const globalError = get(parsedErr, 'global');
      const networkError = get(parsedErr, 'network');

      // If there was a network error, just return a generic network error message.
      const errorToSet = networkError ? errorMessages.networkErrorMessage() : globalError;

      this.setState({
        networkError: errorToSet,
      });
    } else {
      history.push(`/cp-user/editor/edit?formId=${get(data, 'data.createForm.id', '')}`);
      closeDialog();
    }
  };

  render() {
    const {
      networkError,
    } = this.state;

    return (
      <DialogButtonBottom
        title={c.NEW_FORM}
        content={(
          <FormInput networkError={networkError} />
        )}
        initialValues={{
          name: '',
          status: 'ACTIVE',
          documents: [],
        }}
        validate={(values) => {
          const validationResult = validator(values, formValidationSchema);

          const errors: { documents?: Node } = {
            ...validationResult.errors,
          };

          // TestMode used here to bypass 'urls' check if test is running
          if ((!values.documents || values.documents.length < 1) && !this.props.testMode) {
            errors.documents = c.NO_FORM_BASE_UPLOADED;
          }

          return errors;
        }}
        actionButtonText={c.START_EDITING}
        onSubmit={this.onCreate}
      />
    );
  }

}

export default compose(
  withCreateForm,
  withDialog,
)(CreateFormDialogC);
