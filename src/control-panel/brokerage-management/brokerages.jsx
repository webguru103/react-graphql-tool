import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AddBrokerage from './addBrokerage';
import ViewBrokerages from './viewBrokerages';
import styles from './brokerages.styles';

const BrokeragesC = ({ classes }: { classes: Object }) => (
  <React.Fragment>
    <div className={classes.nav}>
      <AddBrokerage />
    </div>
    <ViewBrokerages />
  </React.Fragment>
);

export default withStyles(styles, { withTheme: true })(BrokeragesC);
