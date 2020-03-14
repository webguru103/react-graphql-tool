import * as React from 'react';
import type { RouterHistory } from 'react-router';
import DocumentPrepScreen from './documentPrepScreen';
import PeopleScreen from './peopleScreen';
import SummaryScreen from './summaryScreen';
import FeedbackScreen from './feedback';
import type { DocPageInput } from '../api/mutations/createTransactionSession';
import EditorContainer from './editorContainer/editorContainer';
import { EDITOR_MODE } from '../../constants';
import Navbar from './navbar';
import { withSnackbar } from '../../shared/snackbar/withSnackbar';
import { compose } from '../../utility';
import { withAppUser } from '../../shared/authorization';
import type { AppUser } from '../../shared/authorization';

type Props = {
  history: RouterHistory,
  user: AppUser,
};

type State = {
  step: number,
  files: Array<{uuid: string, docName: string, pdf: string, docPages: Array<DocPageInput>}>,
  transactionId: number,
  transactionSessionId: number,
  signees: Array<{ sessionSigneeName: string, email: string }>,
  emailTitle: string,
  emailBody: string,
};

const alertText = 'Are you sure you want to go back? Your session will be discarded';
const reloadMessage = 'Are you sure? This unfinished session will be lost.';

class InitiateSessionC extends React.Component<Props, State> {

  state = {
    step: 0,
    transactionId: -1,
    transactionSessionId: -1,
    files: [],
    signees: [],
    emailTitle: 'Please Sign These Documents',
    emailBody: '',
  };

  componentDidMount() {
    // TO-DO: Improve alert styles.
    window.onpopstate = () => window.confirm(alertText);  // eslint-disable-line
    window.addEventListener('beforeunload', this.handleReload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleReload);
  }

  handleReload = (e: BeforeUnloadEvent) => {
    if (this.state.step !== 4) {
      e.returnValue = reloadMessage;
      return reloadMessage;
    }
    return '';
  }

  stepBack = () => {
    const { history } = this.props;
    const { step } = this.state;
    if (step > 0) {
      this.setState(prevState => ({ step: prevState.step - 1 }));
      return;
    }
    history.push('/agent/sessions');
  };

  stepForward = () => {
    this.setState(prevState => ({ step: prevState.step + 1 }));
  };

  setTitle = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = e.target;

    this.setState({
      emailTitle: value,
    });
  };

  setBody = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = e.target;

    this.setState({
      emailBody: value,
    });
  };

  onSessionCreate = (transactionId: number, transactionSessionId: number) => {
    this.setState({ transactionId, transactionSessionId });
  };

  setFiles = (
    { documents }: { documents: Array<{uuid: string, docName: string, pdf: string, docPages: Array<DocPageInput>}>} = {},
  ) => {
    this.setState({ files: [...documents] });
  };

  setSignees = (signees: Array<{ sessionSigneeName: string, email: string }>) => {
    this.setState({
      signees,
    });
  }

  discardSession = () => {
    // TODO HI-FI popup
    const result = window.confirm(alertText); // eslint-disable-line

    if (result) {
      this.stepBack();
      this.setState({ transactionId: -1 });
    }
  };

  signeeCheck = (checkAllSigneesHaveField) => {
    this.checkAllSigneesHaveField = checkAllSigneesHaveField;
  };

  checkAllSigneesHaveField = () => {};

  editorForward = () => {
    // Check that all signees have at least one field assigned to them before proceeding.

    const canProceed = this.checkAllSigneesHaveField();

    if (canProceed) {
      this.stepForward();
    }
  }

  render() {
    const {
      step,
      files,
      transactionId,
      transactionSessionId,
      signees,
      emailTitle,
      emailBody,
    } = this.state;

    const { user } = this.props;

    const isCurrentUserSoleSignee = signees.length === 1 && user.email === signees[0].email;
    return (
      <React.Fragment>
        {
          step === 0 && (
            <DocumentPrepScreen
              stepForward={this.stepForward}
              stepBack={this.stepBack}
              onSubmit={this.setFiles}
              files={files}
            />
          )
        }
        {
          step === 1 && (
            <PeopleScreen
              stepForward={this.stepForward}
              stepBack={this.stepBack}
              setSignees={this.setSignees}
              onSubmit={this.onSessionCreate}
              documents={files}
              signees={signees}
            />
          )
        }
        {
          step === 2 && (
            <EditorContainer
              navbar={<Navbar onBack={this.discardSession} onForward={this.editorForward} title="Prepare Documents" />}
              mode={EDITOR_MODE.INSTANCE_PREPARATION}
              transactionId={transactionId}
              signeeCheck={this.signeeCheck}
            />
          )
        }
        {
          step === 3 && (
            <SummaryScreen
              transactionSessionId={transactionSessionId}
              signees={signees}
              documents={files}
              stepForward={this.stepForward}
              stepBack={this.stepBack}
              emailTitle={emailTitle}
              emailBody={emailBody}
              setTitle={this.setTitle}
              setBody={this.setBody}
              isCurrentUserSoleSignee={isCurrentUserSoleSignee}
            />
          )
        }
        {
          step === 4 && (
            <FeedbackScreen isCurrentUserSoleSignee={isCurrentUserSoleSignee} />
          )
        }
      </React.Fragment>
    );
  }

}

export default compose(
  withAppUser,
  withSnackbar,
)(InitiateSessionC);
