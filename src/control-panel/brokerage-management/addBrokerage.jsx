import * as React from 'react';
import Button from '@material-ui/core/Button';
import { withDialog } from '../../shared/dialog/withDialog';
import { withSnackbar } from '../../shared/snackbar/withSnackbar';
import InviteFlow from './inviteFlow';
import { compose } from '../../utility';

type Props = {
  createDialog: Function,
  closeDialog: Function,
  createSnackbar: Function,
};

const AddBrokerageC = (props: Props) => {

  const { createDialog, closeDialog, createSnackbar } = props;
  return (
    <React.Fragment>
      <Button
        variant="raised"
        color="primary"
        onClick={() => createDialog({
          dialogContent: <InviteFlow createSnackbar={createSnackbar} closeDialog={closeDialog} />,
          disableClickOutside: true,
        })}
      >
        Invite New
      </Button>
    </React.Fragment>
  );

};

export default compose(withDialog, withSnackbar)(AddBrokerageC);
