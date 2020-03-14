import React from 'react';
import { RemoveAgentFromBO } from '../../shared/removeAgentFromBO';
import type { UserType } from './flowTypes';
import { get } from '../../utility';

type PropType = {
  user: UserType,
  handleRemoveFromBO: Function,
};

const RemoveFromBOC = ({
  user, user: {
    id, firstName, lastName,
  }, handleRemoveFromBO,
}: PropType) => (
  <RemoveAgentFromBO
    agentName={`${firstName} ${lastName}`}
    brokerageName={get(user, 'brokerageAclsByUserId.nodes.0.brokerageByBrokerageId.brokerageName')}
    handleSubmit={() => handleRemoveFromBO({
      id,
      agentName: `${firstName} ${lastName}`,
      brokerageName: get(user, 'brokerageAclsByUserId.nodes.0.brokerageByBrokerageId.brokerageName'),
      brokerageAclId: get(user, 'brokerageAclsByUserId.nodes.0.id'),
    })}
  />
);

export default (RemoveFromBOC);
