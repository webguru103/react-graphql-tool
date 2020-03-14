import * as React from 'react';
import { withDialog } from '../../dialog/withDialog';
import TextButton from '../../textButton/textButton';
import ConfirmDialog from './confirmDialog';
import c from '../constants';

type PropType = {
  createDialog: Function,
  adminName: String,
  handleSubmit: Function,
  shortTitle?: Boolean,
}

const RemoveAdminFromBOC = ({
  createDialog, adminName, handleSubmit, shortTitle,
}: PropType) => (
  <TextButton
    onClick={() => createDialog({
      dialogContent: <ConfirmDialog
        adminName={adminName}
        onSubmit={handleSubmit}
      />,
    })}
    text={shortTitle ? c.REMOVE_ACCESS : c.REMOVE_ADMIN_FROM_BO}
  />
);

RemoveAdminFromBOC.defaultProps = {
  shortTitle: false,
};

export default withDialog(RemoveAdminFromBOC);
