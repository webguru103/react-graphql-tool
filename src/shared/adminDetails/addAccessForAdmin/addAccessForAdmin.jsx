import React from 'react';
import Button from '../../button/button';
import AddAccessForAdminDialog from './addAccessForAdminDialog';
import DialogButtonButtom from '../../dialogButtonBottom/dialogButtonBottom';
import c from '../constants';
import { withDialog } from '../../dialog/withDialog';
import type { BrokerageType } from '../../../flowTypes';

type PropType = {
  createDialog: Function,
  handleSubmit: Function,
  closeDialog: Function,
  brokerages: Array<BrokerageType>,
};

const AddAccessForAdminC = ({
  createDialog, handleSubmit, closeDialog, brokerages,
}: PropType) => {
  const handleSubmitMethod = (values) => {
    handleSubmit({ brokerageId: values.brokerage.value, brokerageName: values.brokerage.label, role: values.role });
    closeDialog();
  };
  return (
    <Button
      onClick={() => createDialog({
        dialogContent: <DialogButtonButtom
          content={(
            <AddAccessForAdminDialog brokerages={brokerages} />
          )}
          title={c.ADD_ADMIN_ACCESS}
          onSubmit={handleSubmitMethod}
          actionButtonText="Confirm"
          validate={values => (!values.brokerage ? { brokerage: c.SELECT_BROKERAGE } : {})}
        />,
      })}
      text={c.ADD_ACCESS}
    />
  );
};

export default withDialog(AddAccessForAdminC);
