import * as React from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Tooltip from '@material-ui/core/Tooltip';
import sendSigningEmailsMutation from '../api/mutations/sendSigningEmails';
import Navbar from './navbar';
import styles from './summaryScreen.styles';
import { messages } from './constants';
import { errParser } from '../../api-error-parser';
import { get, compose, stringTruncateWithEllipsis } from '../../utility';
import type { DocInput } from '../api/mutations/createTransactionSession';
import DocumentIcon from '../../assets/document.svg';
import PersonIcon from '../../assets/person.svg';

type Props = {
  classes: Object,
  stepForward: () => void,
  stepBack: () => void,
  transactionSessionId: number,
  signees: Array<{ sessionSigneeName: string, email: string }>,
  documents: Array<DocInput>,
  emailTitle: string,
  emailBody: string,
  setTitle: (string) => void,
  setBody: (string) => void,
  sendSigningEmails: ({
    transactionSessionId: number,
    emailTitle: string,
    emailBody: string
  }) => boolean,
  isCurrentUserSoleSignee: boolean,
};

const NAME_LENGTH = 75;

type State = {
  error: React.Element,
};

class SummaryC extends React.Component<Props, State> {

  state = {
    error: '',
  };

  handleSubmit = async () => {
    const {
      emailTitle,
      emailBody,
      stepForward,
    } = this.props;

    const { transactionSessionId } = this.props;
    if (emailTitle.length) {
      try {
        await this.props.sendSigningEmails({
          transactionSessionId,
          emailTitle,
          emailBody,
        });
        stepForward();
      } catch (err) {
        const parsedErr = errParser.parse(err);
        this.setState({ error: get(parsedErr, 'global') });
      }
    } else {
      this.setState({ error: messages.EMAIL_TITLE_EMPTY });
    }
  }

  render() {
    const {
      classes,
      stepBack,
      documents,
      signees,
      emailTitle,
      emailBody,
      setTitle,
      setBody,
      isCurrentUserSoleSignee,
    } = this.props;

    const {
      error,
    } = this.state;

    // TODO: Replace usage of tooltip in codebase with ellipsis component.
    return (
      <div className={classes.view}>
        <Navbar
          onBack={stepBack}
          onForward={this.handleSubmit}
          forwardButtonText={isCurrentUserSoleSignee ? 'Complete' : 'Send'}
          title="Your Summary"
        />
        <div className={classes.summaryBody}>
          <Card className={classes.card}>
            <div className={classes.summaryTitle}>
              {isCurrentUserSoleSignee ? 'Documents' : 'Documents To Sign'}
            </div>
            {
              documents.map(document => (
                <div key={document.sourceURL} className={classes.document}>
                  <DocumentIcon className={classes.docIcon} />
                  <Tooltip
                    title={document.docName}
                    classes={{
                      tooltip: (document.docName.length > NAME_LENGTH) ? classes.tooltip : classes.hide,
                    }}
                  >
                    <div className={classes.docTitle}>
                      { stringTruncateWithEllipsis(document.docName, NAME_LENGTH) }
                    </div>
                  </Tooltip>
                </div>
              ))
            }
          </Card>
          <Card className={classes.card}>
            <div className={classes.summaryTitle}>
              Signees
            </div>
            {
              signees.map(signee => (
                <div key={signee.email} className={classes.signee}>
                  <PersonIcon className={classes.avatarIcon} />
                  <div className={classes.signeeDetails}>
                    <div className={classes.signeeName}>
                      {get(signee, 'sessionSigneeName')}
                    </div>
                    <div className={classes.signeeEmail}>
                      {get(signee, 'email')}
                    </div>
                  </div>
                </div>
              ))
            }
          </Card>
          <Card className={classes.card}>
            {!isCurrentUserSoleSignee && (
              <React.Fragment>
                <div className={classes.summaryTitle}>
                Email Customization
                </div>
                <form className={classes.formContainer}>
                  <div className={classes.formTitle}>
                    Subject (Required)
                  </div>
                  <TextField
                    className={classes.titleInput}
                    type="text"
                    name="emailTitle"
                    value={emailTitle}
                    onChange={setTitle}
                    inputProps={{ maxLength: 100 }}
                  />
                  <div className={classes.characterCount}>
                    {`${emailTitle.length} out of 100 characters used`}
                  </div>
                  <div className={classes.formTitle}>
                    Content
                  </div>
                  <TextField
                    id="standard-multiline-flexible"
                    multiline
                    rows="4"
                    value={emailBody}
                    onChange={setBody}
                    className={classes.bodyInput}
                    margin="normal"
                    variant="outlined"
                    placeholder="Your message goes here."
                    inputProps={{ maxLength: 10000 }}
                  />
                  <div className={classes.characterCount}>
                    {`${emailBody.length} out of 10,000 characters used`}
                  </div>
                  <FormLabel
                    error={Boolean(error)}
                  >
                    {error}
                  </FormLabel>
                </form>
              </React.Fragment>
            )}
            {isCurrentUserSoleSignee && (
              <React.Fragment>
                <div className={classes.summaryTitle}>
                Customize Signing Session Name
                </div>
                <form className={classes.formContainer}>
                  <div className={classes.formTitle}>
                    Signing Session Name
                  </div>
                  <TextField
                    className={classes.titleInput}
                    type="text"
                    name="emailTitle"
                    value={emailTitle}
                    onChange={setTitle}
                    inputProps={{ maxLength: 100 }}
                  />
                  <div className={classes.characterCount}>
                    {`${emailTitle.length} out of 100 characters used`}
                  </div>
                </form>
              </React.Fragment>
            )}
          </Card>
        </div>
      </div>
    );
  }

}

export default compose(
  sendSigningEmailsMutation,
  withStyles(styles, { withTheme: true }),
)(SummaryC);
