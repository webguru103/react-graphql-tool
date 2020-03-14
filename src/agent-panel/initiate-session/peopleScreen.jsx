import * as React from 'react';
import {
  TextField, withStyles, Card, IconButton, FormControl,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup';
import TextButton from '../../shared/textButton/textButton';
import type { UploaderDocuments } from './documentPrepScreen';
import Navbar from './navbar';
import styles from './peopleScreen.styles';
import { compose, get } from '../../utility';
import validator from '../../validation/helpers';
import { EMAIL_MAX_LENGTH, messages, SIGNEE_NAME_MAX_LENGTH } from './constants';
import createTransactionSessionMutation from '../api/mutations/createTransactionSession';
import type {
  CreateTransactionSessionResponse, DocInput, SessionSigneeInput, TransactionSessionInput,
} from '../api/mutations/createTransactionSession';
import { withSnackbar } from '../../shared/snackbar';
import { withAppUser } from '../../shared/authorization';
import type { AppUser } from '../../shared/authorization';
import { logger } from '../../logger';
import { MAX_SIGNEES_COUNT } from '../../constants';
import TrashIcon from '../../assets/trash.svg';

type SessionSignee = {
  sessionSigneeName: string,
  email: string,
}

type Props = {
  stepForward: () => void,
  stepBack: () => void,
  createTransactionSession: ({
    transactionSession: TransactionSessionInput,
    docs: Array<DocInput>,
    sessionSignees: Array<SessionSigneeInput>,
  }) => Promise<CreateTransactionSessionResponse>,
  classes: Object,
  documents: UploaderDocuments,
  createSnackbar: (React.Element) => void,
  user: AppUser,
  setSignees: (Array<SessionSignee>) => void,
  onSubmit: (number, number) => void,
  signees: Array<SessionSignee>,
}

export class PeopleScreenC extends React.Component<Props, null> {

  handleSubmit = async ({ sessionSignees }: { sessionSignees: Array<SessionSignee>}) => {
    const {
      stepForward, createTransactionSession, documents, createSnackbar, setSignees, onSubmit,
    } = this.props;
    const updatedDocs = documents && JSON.parse(JSON.stringify(documents));
    const docs = updatedDocs && updatedDocs.map(((doc) => {
      const updatedDoc = doc;
      const sourceURL = updatedDoc.pdf;
      delete updatedDoc.pdf;
      delete updatedDoc.uuid;
      return { sourceURL, ...updatedDoc };
    }));

    const sanitizedSignees = sessionSignees.map(ss => ({ sessionSigneeName: ss.sessionSigneeName.trim(), email: ss.email.trim() }));

    createTransactionSession({
      transactionSession: {
        transactionSessionName: '',
      },
      docs,
      sessionSignees: sanitizedSignees,
    })
      .then((data) => {
        setSignees(sessionSignees);
        onSubmit(data.data.createTransactionSession.transactionId || -1, data.data.createTransactionSession.id);
        stepForward();
      })
      .catch((err) => {
        logger.log(err);
        createSnackbar(messages.SOMETHING_WENT_WRONG);
      });
  };

  render() {
    const {
      stepBack, classes, user: { firstName, lastName, email }, signees, setSignees,
    } = this.props;
    return (
      <Formik
        initialValues={{
          sessionSignees: (signees && signees.length > 0 && signees[0].sessionSigneeName !== '')
            ? signees
            : [{ sessionSigneeName: `${firstName || ''} ${lastName || ''}`, email }, { sessionSigneeName: '', email: '' }],
        }}
        onSubmit={this.handleSubmit}
        validate={(values) => {
          const { errors } = validator(values, {
            sessionSignees: yup.array().min(1, messages.AT_LEAST_ONE_SIGNEE).of(yup.object().shape({
              sessionSigneeName: yup
                .string().trim().matches(/^\w+\s\w+[\w+\s]+$/, messages.FULL_NAME_NOT_VALID)
                .required(messages.FULL_NAME_REQUIRED)
                .max(SIGNEE_NAME_MAX_LENGTH, messages.SIGNEE_NAME_TOO_LONG),
              email: yup.string().trim().email(messages.EMAIL_IS_WRONG)
                .required(messages.EMAIL_IS_REQUIRED)
                .max(EMAIL_MAX_LENGTH, messages.EMAIL_TOO_LONG),
            })),
          });

          const extraErrors = {};

          // duplicates aren't allowed
          values.sessionSignees.forEach((signee, idx) => {
            const restArr = values.sessionSignees.slice(0, idx).concat([...values.sessionSignees.slice(idx + 1)]);

            if (restArr.findIndex(
              restSignee => restSignee.sessionSigneeName.trim().toUpperCase() === signee.sessionSigneeName.trim().toUpperCase(),
            ) !== -1) {
              extraErrors[`sessionSignees[${idx}].sessionSigneeName`] = messages.NAMES_NOT_UNIQUE;
            }

            if (restArr.findIndex(restSignee => restSignee.email === signee.email) !== -1) {
              extraErrors[`sessionSignees[${idx}].email`] = messages.EMAIL_NOT_UNIQUE;
            }
          });

          return { ...errors, ...extraErrors };
        }}
        validateOnChange={false}
        render={({
          values, handleChange, errors, touched, handleSubmit, setFieldTouched,
        }) => (
          <Form data-testid="people-form">
            <Navbar
              onForward={handleSubmit}
              onBack={() => {
                setSignees(values.sessionSignees);
                stepBack();
              }
              }
              title="Who needs to sign?"
              forwardButtonText="Continue"
            />
            <div className={classes.content}>
              <FieldArray
                name="sessionSignees"
                validateOnChange={false}
                render={arrayHelpers => (
                  <Card className={classes.signees} elevation={0}>
                    {
                    values.sessionSignees.map((signee, index) => (
                      // eslint-disable-next-line
                      <div key={index} className={classes.signee}>
                        <FormControl>
                          <TextField
                            id={`full-name-${index}`}
                            label="Full Name"
                            value={signee.sessionSigneeName}
                            name={`sessionSignees[${index}].sessionSigneeName`}
                            className={classes.inputs}
                            margin="normal"
                            onChange={(e) => {
                              handleChange(e);
                              setFieldTouched(`sessionSignees[${index}].sessionSigneeName`, true, false);
                            }}
                            onBlur={(e) => {
                              handleChange(e);
                              setFieldTouched(`sessionSignees[${index}].sessionSigneeName`, true, true);
                            }}
                            error={
                              get(touched, `sessionSignees.${index}.sessionSigneeName`)
                              && Boolean(errors[`sessionSignees[${index}].sessionSigneeName`])
                            }
                            helperText={
                              get(touched, `sessionSignees.${index}.sessionSigneeName`)
                              && errors[`sessionSignees[${index}].sessionSigneeName`]
                            }
                          />
                        </FormControl>
                        <FormControl>
                          <TextField
                            id={`email-${index}`}
                            label="Email"
                            value={signee.email}
                            name={`sessionSignees.${index}.email`}
                            className={classes.inputs}
                            margin="normal"
                            onChange={(e) => {
                              handleChange(e);
                              setFieldTouched(`sessionSignees[${index}].email`, true, false);
                            }}
                            onBlur={(e) => {
                              handleChange(e);
                              setFieldTouched(`sessionSignees[${index}].sessionSigneeName`, true, true);
                            }}
                            error={get(touched, `sessionSignees.${index}.email`) && Boolean(errors[`sessionSignees[${index}].email`])}
                            helperText={get(touched, `sessionSignees.${index}.email`) && errors[`sessionSignees[${index}].email`]}
                          />
                        </FormControl>
                        <IconButton
                          classes={{ root: classes.clearIcon }}
                          onClick={async () => {
                            await arrayHelpers.remove(index);
                            if (values.sessionSignees.length === 1) {
                              arrayHelpers.push({ sessionSigneeName: '', email: '' });
                            }
                          }}
                          data-testid="clear-button"
                        >
                          <TrashIcon />
                        </IconButton>
                      </div>
                    ))
                  }
                    {values.sessionSignees.length < MAX_SIGNEES_COUNT && (
                      <TextButton
                        classes={{ button: classes.addButton }}
                        onClick={() => arrayHelpers.push({ sessionSigneeName: '', email: '' })}
                      >
                        Add Signee
                        <AddIcon className={classes.addIcon} />
                      </TextButton>
                    )}
                  </Card>
                )}
              />
            </div>
          </Form>
        )}
      />
    );
  }

}

export default compose(
  withStyles(styles, { withTheme: true }),
  createTransactionSessionMutation,
  withSnackbar,
  withAppUser,
)(PeopleScreenC);
