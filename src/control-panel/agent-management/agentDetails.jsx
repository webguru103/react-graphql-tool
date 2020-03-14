import React from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { compose, get } from '../../utility';
import styles from './agentDetails.styles';
import { withGetUser } from './api/agents.service';

type PropTypes = {
  classes: Object,
  user: Object // TODO replace with user obj, once flowtypes are merged
};

const AgentDetails = ({ classes, user }: PropTypes) => (
  <React.Fragment>
    <Typography className={classes.header} variant="title" gutterBottom>
        Basic info
    </Typography>
    <div className={classes.table}>
      <p>
          Name
      </p>
      <p>
        { user && `${user.firstName} ${user.lastName}` }
      </p>
      <p>
          Email
      </p>
      <p>
        { user && user.email}
      </p>
      <p>
          Phone
      </p>
      <p>
        { user && user.phone }
      </p>
      <p>
          Address
      </p>
      <p>
        {user && `${(user.unit || '')} ${(user.streetNumber || '')} ${(user.streetName || '')}
        ${(user.city || '')} ${(user.province || '')} ${(user.country || '')} ${(user.postalCode || '')}`}
      </p>
      <p>
          OREA Affiliation
      </p>
      <p>
        {(user && user.oreaVerified) ? 'Affiliated' : 'Not Affiliated' }
      </p>
      <p>
          Brokerage Office
      </p>
      <p>
        {(
          (user && get(user, 'brokerageAclsByUserId.nodes.0.brokerageByBrokerageId.brokerageName'))
            ? (get(user, 'brokerageAclsByUserId.nodes.0.brokerageByBrokerageId.brokerageName'))
            : 'N/A'
        )}
      </p>
    </div>
  </React.Fragment>
);

export default compose(withStyles(styles), withGetUser)(AgentDetails);
