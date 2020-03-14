import React from 'react';
import { RemoveAgentFromBO } from '../../shared/removeAgentFromBO';
import type { BrokerageType } from '../../flowTypes';

type TableUser = {
  id: string,
  firstName: string,
  lastName: string,
  brokerage: BrokerageType,
  brokerageAcl: number,
};

type PropType = {
  user: TableUser,
  handleRemoveFromBO: Function,
};

const RemoveFromBOC = ({
  user: {
    id, firstName, lastName, brokerage, brokerageAcl,
  }, handleRemoveFromBO,
}: PropType) => (
  <RemoveAgentFromBO
    agentName={`${firstName} ${lastName}`}
    brokerageName={brokerage.brokerageName}
    handleSubmit={() => handleRemoveFromBO({
      id,
      agentName: `${firstName} ${lastName}`,
      brokerageName: brokerage.brokerageName,
      brokerageAcl,
    })}
  />
);

export default (RemoveFromBOC);
