import DialogContentText from '@material-ui/core/DialogContentText';
import * as React from 'react';
import DialogButtonBottom from '../../shared/dialogButtonBottom/dialogButtonBottom';

type Props = {
  actionButtonText: string,
  brokerageName: string,
  dialogContent: string,
  title: string,
  handleBrokerageResponse: Function,
}
const BrokerageConfirmationDialog = ({
  actionButtonText, brokerageName, dialogContent, handleBrokerageResponse, title,
}: Props) => (

  <DialogButtonBottom
    actionButtonText={actionButtonText}
    isButtonCancel
    title={title}
    content={(
      <React.Fragment>
        <DialogContentText>{dialogContent}</DialogContentText>
      </React.Fragment>
    )}
    onSubmit={() => handleBrokerageResponse(brokerageName)}
  />
);

export default BrokerageConfirmationDialog;
