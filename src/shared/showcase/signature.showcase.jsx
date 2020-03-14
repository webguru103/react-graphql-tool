import * as React from 'react';
import { Button } from '@material-ui/core';
import { CreateSignature, UpdateSignature } from '../signature';
import { withDialog } from '../dialog';

type State = {
  signature: string,
  initials: string,
};

type Props = {
  createDialog: ({ dialogContent: React.Element }) => void,
  closeDialog: () => void,
}

class SignatureShowcase extends React.Component<Props, State> {

  state = {
    signature: '',
    initials: '',
  };

  render() {
    const { createDialog, closeDialog } = this.props;
    const { signature, initials } = this.state;
    return (
      <React.Fragment>
        <h3>Signature</h3>
        <Button onClick={() => createDialog({
          dialogContent: (
            <CreateSignature
              fullName="John Doe"
              onSubmit={(values) => {
                this.setState({ ...values });
                closeDialog();
              }}
              onClose={() => closeDialog()}
            />
          ),
          disableEsc: true,
          disableClickOutside: true,
        })}
        >
          Create signature
        </Button>
        <Button onClick={() => createDialog({
          dialogContent: (
            <UpdateSignature
              signature={signature}
              initials={initials}
            />
          ),
          disableEsc: true,
          disableClickOutside: true,
        })}
        >
          Update signature
        </Button>
        <p>You&apos;ve submitted:</p>
        {
          signature && <img src={signature} alt="" />
        }
        {
          initials && <img src={initials} alt="" />
        }
      </React.Fragment>
    );
  }

}

export default withDialog(SignatureShowcase);
