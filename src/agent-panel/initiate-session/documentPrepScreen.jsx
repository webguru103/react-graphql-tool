import * as React from 'react';
import { Formik } from 'formik';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import Navbar from './navbar';
import styles from './documentPrepScreen.styles';
import UploadForm from '../../shared/uploadForm/uploadForm';
import c, { MAX_UPLOAD_SIZE, PDF } from '../../constants';
import type { DocPageInput } from '../api/mutations/createTransactionSession';

export type UploaderDocuments = Array<{uuid: string, docName: string, pdf: string, docPages: Array<DocPageInput>}>

type Props = {
  classes: Object,
  networkError: React.Node,
  uploadError: string,
  stepForward: () => void,
  stepBack: () => void,
  onSubmit: ({ documents: UploaderDocuments }) => void,
  files: UploaderDocuments,
};

type State = {
  internalNetworkError: React.Node,
  internalUploadError: string,
}

class DocumentPrepC extends React.Component<Props, State> {

  state = {
    internalUploadError: this.props.uploadError,
    internalNetworkError: this.props.networkError,
  }

  setUploadError = (uploadError) => {
    this.setState({
      internalUploadError: uploadError,
    });
  }

  render() {
    const {
      classes,
      stepForward,
      onSubmit,
      stepBack,
      files,
    } = this.props;

    const { internalUploadError, internalNetworkError } = this.state;

    return (
      <Formik
        onSubmit={(values) => {
          onSubmit(values);
          stepForward();
        }}
        validate={(values) => {
          const errors = {};

          if ((values && values.documents && values.documents.length < 1)) {
            errors.documents = c.NO_FORM_BASE_UPLOADED;
          }

          return errors;
        }}
        initialValues={{
          documents: files || [],
        }}
        render={({
          handleSubmit, touched, errors, setFieldValue, setErrors,
        }) => (
          <div className={classes.view}>
            <Navbar
              title="Which documents need to be signed?"
              onForward={handleSubmit}
              onBack={stepBack}
            />
            <div className={classes.docPrepBody}>
              <Card className={classes.card}>
                <div className={classes.viewContent}>
                  <form className={classes.formContent} onSubmit={handleSubmit}>
                    <div className={classes.formInput}>
                      <UploadForm
                        acceptTypes={[PDF]}
                        acceptMultiple
                        maxUploadSize={MAX_UPLOAD_SIZE}
                        uploadLabel={c.UPLOAD_LABEL}
                        otherDetails={c.DRAG_FILE_DETAILS}
                        setUploadError={this.setUploadError}
                        existingDocuments={files}
                        setURLs={(documents: Array<any>) => {
                          setFieldValue('documents', documents);
                        }}
                        className={classes.uploadForm}
                        onDrop={() => {
                          // Formik hook for UploadForm - reset error for urls field
                          // manually so that when upload field is touched, error is no longer present
                          if (setErrors) {
                            setErrors({
                              ...errors,
                              documents: '',
                            });
                          }
                        }}
                      />
                      {Boolean(internalUploadError) && (
                      <FormControl error>
                        <FormHelperText className={classes.errorContainer}>
                          <ErrorIcon className={classes.errorIcon} />
                          {internalUploadError}
                        </FormHelperText>
                      </FormControl>
                      )}
                      {touched && touched.documents && Boolean(errors && errors.documents) && (
                      <FormControl error>
                        <FormHelperText className={classes.errorContainer}>
                          <ErrorIcon className={classes.errorIcon} />
                          {errors && errors.documents}
                        </FormHelperText>
                      </FormControl>
                      )}
                      {Boolean(internalNetworkError) && (
                      <FormControl error>
                        <FormHelperText className={classes.errorContainer}>
                          <ErrorIcon className={classes.errorIcon} />
                          {internalNetworkError}
                        </FormHelperText>
                      </FormControl>
                      )}
                    </div>
                  </form>
                </div>
              </Card>
            </div>
          </div>
        )
        }
      />
    );
  }

}

export default withStyles(styles, { withTheme: true })(DocumentPrepC);
