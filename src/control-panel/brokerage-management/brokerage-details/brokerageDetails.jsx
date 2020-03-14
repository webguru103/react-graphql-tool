import * as React from 'react';
import moment from 'moment';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { compose, get, pro } from '../../../utility';
import EditBrokerage from './editBrokerage';
import styles from './brokerageDetails.styles';
import { withGetBrokerage, withGetBrokerageCounts } from './api/brokerageDetails.service';
import type { BrokerageType } from '../../../flowTypes';
import { errParser } from '../../../api-error-parser';

type PropType = {
  classes: Object,
  getBrokerage: Function,
  getBrokerageCounts: Function,
};

type StateType = {
  brokerage: ?BrokerageType,
  agentCount: number,
  adminCount: number,
  error: React.Node,
};

class BrokerageDetailsC extends React.PureComponent<PropType, StateType> {

  state = {
    brokerage: null,
    agentCount: 0,
    adminCount: 0,
    error: null,
  };

  componentDidMount() {
    this.getBrokerageInfo();
    this.getCounts();
  }

  getBrokerageInfo = async () => {
    const [err, returnedData] = await pro(this.props.getBrokerage());

    if (err) {
      const parsedErr = errParser.parse(err);
      this.setState({ error: get(parsedErr, 'global') });
    }

    if (returnedData) {
      this.setState({
        brokerage: get(returnedData, 'data.brokerage.nodes.0', null),
      });
    }
  };

  getCounts = async () => {
    const [err, returnedData] = await pro(this.props.getBrokerageCounts());

    if (err) {
      const parsedErr = errParser.parse(err);
      this.setState({ error: get(parsedErr, 'global') });
    }

    if (returnedData) {
      this.setState({
        adminCount: get(returnedData, 'brokerageAdmins.adminCount.nodes.0.brokerageAclsByBrokerageId.totalCount', 0),
        agentCount: get(returnedData, 'brokerageAgents.agentCount.nodes.0.brokerageAclsByBrokerageId.totalCount', 0),
      });
    }
  };

  render() {
    const { classes } = this.props;
    const {
      agentCount, adminCount, brokerage, error,
    } = this.state;

    return (
      <React.Fragment>
        <div className={classes.titleBar}>
          <Typography
            className={classes.header}
            variant="title"
            gutterBottom
          >
            Basic info
          </Typography>
          <EditBrokerage classname={classes.edit} brokerage={brokerage} refetchBrokerage={this.getBrokerageInfo} />
        </div>
        <div className={classes.table}>
          <p>
            Office Name
          </p>
          <p>
            {brokerage && brokerage.brokerageName}
          </p>
          <p>
            Office Address
          </p>
          <p>
            {brokerage && `${(brokerage.unit || '')} ${brokerage.streetNumber} ${brokerage.streetName},
            ${brokerage.city}, ${brokerage.province}, ${brokerage.postalCode}`}
          </p>
          <p>
            Office Number
          </p>
          <p>
            {brokerage && brokerage.phone}
          </p>
          <p>
            Fax Number
          </p>
          <p>
            {brokerage && brokerage.fax}
          </p>
          <p>
            Agent Count
          </p>
          <p>
            {agentCount}
          </p>
          <p>
            Admin Count
          </p>
          <p>
            {adminCount}
          </p>
          <p>
            Created At
          </p>
          <p>
            {brokerage && brokerage.createdAt && moment(brokerage.createdAt).format('MM-DD-YY')}
          </p>
        </div>
        {error && <div>{error}</div>}
      </React.Fragment>
    );
  }

}

export default compose(
  withGetBrokerage,
  withGetBrokerageCounts,
  withStyles(styles),
)(BrokerageDetailsC);
