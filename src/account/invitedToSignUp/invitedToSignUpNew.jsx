import * as React from 'react';
import { withRouter } from 'react-router-dom';
import type { RouterHistory, Match, Location } from 'react-router';
import { get } from '../../utility';
import PasswordSetScreen from '../shared/passwordSetScreen';
import PersonalInfoScreen from '../shared/personalInfoScreen';
import SummaryScreen from '../shared/summaryScreen';
import AccountCreatedScreen from '../shared/accountCreatedScreen';
import type { RoleType } from '../../flowTypes';

type PropType = {
  match: Match,
  location: Location,
  history: RouterHistory,
}

type StateType = {
  inviteId: number,
  resourceCategory: string,
  resourceId: number,
  role: RoleType,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  brokerageName: '',
}

class InvitedToSignUpNewC extends React.Component<PropType, StateType> {

  state = {
    inviteId: get(this.props.location, 'state.inviteId'),
    resourceCategory: get(this.props.location, 'state.resourceCategory'),
    resourceId: get(this.props.location, 'state.resourceId'),
    role: get(this.props.location, 'state.role'),
    email: get(this.props.location, 'state.email'),
    brokerageName: get(this.props.location, 'state.brokerageName'),
    password: '',
    firstName: get(this.props.location, 'state.firstName', ''),
    lastName: get(this.props.location, 'state.lastName', ''),
    phoneNumber: '',
  };

  componentDidMount() {
    if (!this.state.inviteId) {
      this.props.history.push('/');
      return;
    }

    if (this.props.match.params.step !== 0) {
      this.props.history.push('/signup/new/0');
    }
  }

  setPassword = (password: string) => {
    this.setState({ password });
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
    history.push(`/signup/new/${Number(step) - 1}`);
  };

  proceed = () => {
    const { history, match: { params: { step } } } = this.props;
    history.push(`/signup/new/${Number(step) + 1}`);
  };

  render() {
    const { match: { params: { step } } } = this.props;

    const {
      email, password, firstName, lastName, phoneNumber, inviteId, resourceId, resourceCategory, role, brokerageName,
    } = this.state;

    if (!inviteId) {
      return null;
    }

    return (
      <React.Fragment>
        {step === '0'
        && (
          <PasswordSetScreen
            invitedToSignUp
            proceed={this.proceed}
            moveBack={this.moveBack}
            email={email}
            setPassword={this.setPassword}
            role={role}
            brokerageName={brokerageName}
          />
        )
        }
        {step === '1'
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
          && (
            <SummaryScreen
              firstName={firstName}
              lastName={lastName}
              phoneNumber={phoneNumber}
              email={email}
              password={password}
              proceed={this.proceed}
              moveBack={this.moveBack}
              role={role}
              resourceId={resourceId}
              resourceCategory={resourceCategory}
              brokerageName={brokerageName}
              inviteId={inviteId}
            />
          )
        }
        {
          step === '3'
          && (
            <AccountCreatedScreen
              roleCategory={role.roleCategory}
            />
          )
        }
      </React.Fragment>
    );
  }

}

export default (withRouter(InvitedToSignUpNewC): React.Element);
