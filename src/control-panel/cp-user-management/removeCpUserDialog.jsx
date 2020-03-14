import DialogContentText from '@material-ui/core/DialogContentText';
import * as React from 'react';
import { FormControl, FormHelperText } from '@material-ui/core';
import DialogButtonBottom from '../../shared/dialogButtonBottom/dialogButtonBottom';
import constants from './constants';

type Props = {
  userId: String,
  systemAclId: String,
  removeUser: Function,
  error: React.Node,
}

const RemoveCPUserDialog = ({
  userId, systemAclId, removeUser, error,
}: Props) => (
  <DialogButtonBottom
    actionButtonText="Confirm"
    isButtonCancel
    title="Remove CP User"
    content={(
      <React.Fragment>
        <DialogContentText>
          {constants.USER_WILL_BE_REMOVED}
        </DialogContentText>
        <FormControl error={Boolean(error)}>
          <FormHelperText>{error}</FormHelperText>
        </FormControl>
      </React.Fragment>
        )}
    onSubmit={() => removeUser(userId, systemAclId)}
  />
);

export default RemoveCPUserDialog;
