import * as React from 'react';
import { withRouter } from 'react-router-dom';
import type { RouterHistory, Match, Location } from 'react-router';
import { get } from '../../utility';
import SignUpExistingScreen from './signUpExistingScreen';
import SummaryScreen from '../shared/summaryScreen';
import AccountCreatedScreen from '../shared/accountCreatedScreen';
import type { UserType, RoleType } from '../../flowTypes';

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
  user: UserType,
  brokerageName: '',
  token: string,
}

class InvitedToSignUpExistingC extends React.Component<PropType, StateType> {

  state = {
    inviteId: get(this.props.location, 'state.inviteId'),
    resourceCategory: get(this.props.location, 'state.resourceCategory'),
    resourceId: get(this.props.location, 'state.resourceId'),
    role: get(this.props.location, 'state.role'),
    user: get(this.props.location, 'state.user'),
    brokerageName: get(this.props.location, 'state.brokerageName'),
    token: get(this.props.location, 'state.token'),
  };

  componentDidMount() {
    if (!this.state.inviteId) {
      this.props.history.push('/');
      return;
    }

    if (this.props.match.params.step !== 0) {
      this.props.history.push('/signup/existing/0');
    }
  }

  moveBack = () => {
    const { history, match: { params: { step } } } = this.props;
    history.push(`/signup/existing/${Number(step) - 1}`);
  };

  proceed = () => {
    const { history, match: { params: { step } } } = this.props;
    history.push(`/signup/existing/${Number(step) + 1}`);
  };

  render() {
    const { match: { params: { step } } } = this.props;

    const {
      user, role, resourceId, resourceCategory, inviteId, brokerageName, token,
    } = this.state;

    if (!inviteId) {
      return null;
    }

    return (
      <React.Fragment>
        {step === '0'
        && (
          <SignUpExistingScreen
            proceed={this.proceed}
            role={role}
            brokerageName={brokerageName}
          />
        )
        }
        {step === '1'
        && (
          <SummaryScreen
            firstName={user.firstName}
            lastName={user.lastName}
            phoneNumber={user.phone}
            email={user.email}
            proceed={this.proceed}
            moveBack={this.moveBack}
            role={role}
            resourceId={resourceId}
            resourceCategory={resourceCategory}
            brokerageName={brokerageName}
            token={token}
            inviteId={inviteId}
            existingUserId={user.id}
          />
        )
        }
        {
          step === '2'
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

export default (withRouter(InvitedToSignUpExistingC): React.Element);
