import * as React from 'react';
import { withRouter } from 'react-router-dom';
import type { RouterHistory, Match } from 'react-router';
import EmailScreen from './emailScreen';
import PasswordSetScreen from '../shared/passwordSetScreen';
import PasswordEnterScreen from '../shared/passwordEnterScreen';
import GetAgentPanelAccessScreen from './getAgentPanelAccessScreen';
import AgentIdentityAddedScreen from './agentIdentityAddedScreen';
import PersonalInfoScreen from '../shared/personalInfoScreen';
import SummaryScreen from '../shared/summaryScreen';
import EmailVerificationScreen from './emailVerificationScreen';

type PropType = {
  match: Match,
  history: RouterHistory,
}

type StateType = {
  existingUser: boolean,
  existingUserId: ?string,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
}

class AgentSignUpC extends React.Component<PropType, StateType> {

  state = {
    existingUser: false,
    existingUserId: null,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  };

  componentDidMount() {
    if (this.props.match.params.step !== 0) {
      this.props.history.push('/signup/agent/0');
    }
  }

  setEmail = (email: string) => {
    this.setState({ email: email.trim() });
  };

  setPassword = (password: string) => {
    this.setState({ password });
  };

  setExistingUser = (existingUser: boolean) => {
    this.setState({ existingUser });
  };

  setExistingUserId = (id: string) => {
    this.setState({ existingUserId: id });
  };

  setFirstName = (name: string) => {
    this.setState({ firstName: name });
  };

  setLastName = (name: string) => {
    this.setState({ lastName: name });
  };

  setPhoneNumber = (number: string) => {
    this.setState({ phoneNumber: number });
  };

  moveBack = () => {
    const { history, match: { params: { step } } } = this.props;
    history.push(`/signup/agent/${Number(step) - 1}`);
  };

  proceed = () => {
    const { history, match: { params: { step } } } = this.props;
    history.push(`/signup/agent/${Number(step) + 1}`);
  };

  render() {
    const { match: { params: { step } } } = this.props;
    const {
      existingUser, existingUserId, email, password, firstName, lastName, phoneNumber,
    } = this.state;

    return (
      <React.Fragment>
        {step === '0'
          && (
            <EmailScreen
              setExistingUser={this.setExistingUser}
              proceed={this.proceed}
              moveBack={this.moveBack}
              email={email}
              setEmail={this.setEmail}
            />
          )
        }
        {step === '1'
          && !existingUser
          && (
          <PasswordSetScreen
            proceed={this.proceed}
            moveBack={this.moveBack}
            email={email}
            setPassword={this.setPassword}
          />
          )
        }
        {step === '1'
          && existingUser
          && (
            <PasswordEnterScreen
              proceed={this.proceed}
              moveBack={this.moveBack}
              email={email}
              setPassword={this.setPassword}
              setFirstName={this.setFirstName}
              setLastName={this.setLastName}
              setPhoneNumber={this.setPhoneNumber}
              setExistingUserId={this.setExistingUserId}
            />
          )
        }
        {step === '2'
          && !existingUser
          && (
            <PersonalInfoScreen
              firstName={firstName}
              lastName={lastName}
              phoneNumber={phoneNumber}
              setFirstName={this.setFirstName}
              setLastName={this.setLastName}
              setPhoneNumber={this.setPhoneNumber}
              proceed={this.proceed}
              moveBack={this.moveBack}
            />
          )
        }
        {
          step === '2'
          && existingUser
          && (
            <GetAgentPanelAccessScreen
              proceed={this.proceed}
              existingUserId={existingUserId}
            />
          )
        }
        {
          step === '3'
          && !existingUser
          && (
            <SummaryScreen
              firstName={firstName}
              lastName={lastName}
              phoneNumber={phoneNumber}
              email={email}
              password={password}
              proceed={this.proceed}
              moveBack={this.moveBack}
            />
          )
        }
        {
          step === '3' && existingUserId && <AgentIdentityAddedScreen />
        }
        {
          step === '4'
          && !existingUserId
          && (
            <EmailVerificationScreen
              email={email}
            />
          )
        }
      </React.Fragment>
    );
  }

}

export default (withRouter(AgentSignUpC): React.Element);
