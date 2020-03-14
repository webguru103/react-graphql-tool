import React from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { compose, get } from '../../utility';
import styles from './agentDetails.styles';
import { withGetAgent } from '../api/admin.service';
import type { UserType } from '../flowTypes';

type PropTypes = {
  classes: Object,
  agent: UserType,
};

const AgentDetails = ({ classes, agent }: PropTypes) => (
  <React.Fragment>
    <Typography className={classes.header} variant="title" gutterBottom>
        Basic info
    </Typography>
    <div className={classes.table}>
      <p>
          Name
      </p>
      <p>
        { `${agent.firstName} ${agent.lastName}` }
      </p>
      <p>
          Email
      </p>
      <p>
        { agent.email}
      </p>
      <p>
          Phone
      </p>
      <p>
        { agent.phone }
      </p>
      <p>
          Brokerage Office
      </p>
      <p>
        { get(agent, 'brokerageAclsByUserId.nodes.0.brokerageByBrokerageId.brokerageName') }
      </p>
    </div>
  </React.Fragment>
);

export default compose(withStyles(styles), withGetAgent)(AgentDetails);
