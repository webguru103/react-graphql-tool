import * as React from 'react';
import { withDialog } from '../dialog/withDialog';
import TextButton from '../textButton/textButton';
import ConfirmDialog from './confirmDialog';
import c from './constants';

type PropType = {
  createDialog: Function,
  agentName: String,
  brokerageName: String,
  handleSubmit: Function,
}

const RemoveAgentFromBOC = ({
  createDialog, agentName, brokerageName, handleSubmit,
}: PropType) => (
  <TextButton
    onClick={(e) => {
      e.stopPropagation();
      createDialog({
        dialogContent: <ConfirmDialog
          agentName={agentName}
          brokerageName={brokerageName}
          onSubmit={handleSubmit}
        />,
      });
    }}
    text={c.REMOVE_AGENT_FROM_BO}
    testId="remove-agent-from-bo-button"
  />
);

export default withDialog(RemoveAgentFromBOC);
