import * as React from 'react';
import AdminInput from './adminInput';
import AdminInviteInput from './adminAddInput';
import BOInput from './brokerageInput';
import EmailInput from './emailInput';

type PropType = {
  closeDialog: Function,
  createSnackbar: Function,
}

type StateType = {
  step: number,
  existingUserEmail: string,
  email: string,
  brokerage: Object,
}

class InviteFlowC extends React.Component<PropType, StateType> {

  state = {
    step: 0,
    existingUserEmail: '',
    email: '',
    brokerage: {},
  };

  setUser = (email: string) => {
    this.setState({
      existingUserEmail: email,
    });
  };

  setEmail = (email: string) => {
    this.setState({
      email: email.trim(),
    });
  };

  setBrokerage = (brokerage: Object) => {
    this.setState({
      brokerage,
    });
  };

  stepForward = () => {
    this.setState(prevState => ({
      step: (prevState.step + 1),
    }));
  };

  render() {

    const { closeDialog, createSnackbar } = this.props;

    const {
      brokerage,
      existingUserEmail,
      email,
      step,
    } = this.state;

    return (
      <React.Fragment>
        {step === 0
          && (
            <BOInput
              nextForm={this.stepForward}
              closeDialog={closeDialog}
              createSnackbar={createSnackbar}
              setBrokerage={this.setBrokerage}
            />
          )
        }
        {step === 1
          && (
            <EmailInput
              nextForm={this.stepForward}
              closeDialog={closeDialog}
              setExistingUser={this.setUser}
              setEmail={this.setEmail}
            />
          )
        }
        {step === 2 && !existingUserEmail
          && (
            <AdminInput
              newBrokerage={brokerage}
              closeDialog={closeDialog}
              createSnackbar={createSnackbar}
              email={email}
            />
          )
        }
        {step === 2 && existingUserEmail
          && (
            <AdminInviteInput
              newBrokerage={brokerage}
              closeDialog={closeDialog}
              createSnackbar={createSnackbar}
              userEmail={existingUserEmail}
            />
          )
        }
      </React.Fragment>
    );
  }

}
export default InviteFlowC;
