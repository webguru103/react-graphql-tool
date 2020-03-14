import * as React from 'react';
import classNames from 'classnames';
import { Formik } from 'formik';
import Select from 'react-select';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';
import styles from './inviteNewAgentDialog.styles';
import {
  pro, parseEmailsFromString,
} from '../../utility';
import c from './constants';
import type { BrokerageType } from '../../flowTypes';
import { errParser } from '../../api-error-parser';
import { SubmitError } from './submitError';
import InviteError from './inviteError';
import type { ParsedApiError } from '../../api-error-parser/errorParser';

type Props = {
  classes: Object,
  closeDialog: Function,
  inviteNewAgent: Function,
  brokerages: Array<BrokerageType>,
  onSuccessInvite: (number) => void,
};

type State = {
  validEmails: Array<string>,
  successInvites: number,
  submitErrors: Array<{
    email: string,
    error: ParsedApiError,
  }>,
  validEmails: Array<string>,
  visibleEmails: string,
  formikRefreshId: number,
};

class InviteNewAgentDialogC extends React.Component<Props, State> {

  state = {
    submitErrors: [],
    validEmails: [],
    successInvites: 0,
    visibleEmails: '',
    formikRefreshId: Math.random(),
  };

  validateEmails = (emailString: string) => {
    const validEmails = parseEmailsFromString(emailString);

    if (validEmails) {
      this.setState({
        validEmails,
      });
    }
    return validEmails;
  };

  inviteNewAgents = async ({ brokerage }: { brokerage: { value: string } }) => {
    const { inviteNewAgent, closeDialog, onSuccessInvite } = this.props;
    const { validEmails } = this.state;

    const returnedPromises = await Promise.all(validEmails.map(email => (
      pro(new Promise((res, rej) => {
        inviteNewAgent({
          email,
          resourceId: Number(brokerage.value),
        })
          .then(data => res(data))
          .catch(err => rej(new SubmitError({ error: err, email })));
      }))
    )));

    if (returnedPromises) {
      let successInvites = 0;
      const submitErrors = [];
      const visibleEmails = [];

      returnedPromises.forEach((returnedPromise) => {
        const [err] = returnedPromise;

        if (!err) {
          successInvites += 1;
        }

        if (err) {
          const { email, error } = err;
          const parsedErr = errParser.parse(error);
          submitErrors.push({ email, error: parsedErr });
          visibleEmails.push(email);
        }
      });

      this.setState({ successInvites });

      if (submitErrors.length) {
        this.setState({
          submitErrors,
          visibleEmails: visibleEmails.join(',\n'),
          formikRefreshId: Math.random(),
        });
      } else {
        onSuccessInvite(successInvites);
        closeDialog();
      }
    }
  };

  render() {
    const { classes, closeDialog, brokerages } = this.props;
    const {
      successInvites, submitErrors, visibleEmails, formikRefreshId,
    } = this.state;

    return (
      <Formik
        initialValues={{
          emails: visibleEmails,
          refreshId: formikRefreshId,
          brokerage: { value: '' },
        }}
        enableReinitialize
        onSubmit={this.inviteNewAgents}
        validate={({ emails, brokerage }) => {
          const errors = {};
          if (!emails) {
            errors.emails = c.NO_EMAILS;
          }

          if (!brokerage) {
            errors.brokerage = c.NO_BROKERAGE;
          }

          const areEmailsValid = this.validateEmails(emails);
          if (areEmailsValid === null) {
            errors.emails = c.INVALID_EMAILS;
          }

          return errors;
        }}
        render={({
          values, errors, handleSubmit, handleChange, setFieldValue,
        }) => (
          <form className={classes.dialog} onSubmit={handleSubmit}>
            <DialogTitle
              classes={{ root: classes.dialogTitle }}
              disableTypography
            >
              Invite New Agents
            </DialogTitle>
            <DialogContent classes={{ root: classes.dialogContent }}>
              <Select
                classes={classes}
                options={brokerages.map(b => ({ value: b.id, label: b.brokerageName }))}
                value={values.brokerage}
                onChange={option => setFieldValue('brokerage', option)}
                placeholder="To Which Brokerage Office?"
                name="brokerage"
              />
              { errors.brokerage && <FormHelperText error>{errors.brokerage}</FormHelperText> }
              <TextField
                error={Boolean(errors.emails)}
                fullWidth
                multiline
                rows={5}
                helperText={errors.emails}
                label="Agent emails, separate with comma or return"
                id="emails"
                InputProps={{
                  classes: {
                    root: classes.textFieldInputWrapper,
                    input: classes.textFieldInput,
                    error: classes.textFieldInputError,
                  },
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  classes: { root: `${classNames(classes.textFieldLabel, classes.label)}` },
                  required: true,
                }}
                onChange={handleChange}
                value={values.emails}
                name="emails"
              />
              {
                successInvites > 0 && <FormHelperText>{c.SUCCESSFULY_SENT(successInvites)}</FormHelperText>
              }
              {
                submitErrors.length > 0 && <InviteError submitErrors={submitErrors} />
              }
            </DialogContent>
            <DialogActions
              classes={{
                root: classes.dialogActions,
                action: classes.dialogAction,
              }}
            >
              <Button variant="raised" color="default" onClick={closeDialog}>Cancel</Button>
              <Button
                variant="raised"
                color="primary"
                type="submit"
                disabled={Boolean(errors.emails)}
              >
                Invite
              </Button>
            </DialogActions>
          </form>
        )}
      />

    );
  }

}

export default withStyles(styles, { withTheme: true })(InviteNewAgentDialogC);
