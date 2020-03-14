import React from 'react';
import { withRouter } from 'react-router';
import type { RouterHistory } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import { UnControlledTable } from '../../shared/table';
import { columns } from './columns';
import { withBrokerages } from '../api/admin.service';
import { compose } from '../../utility';
import { withAppUser } from '../../shared/authorization/userConsumer';
import styles from './brokerages.styles';
import type { BrokerageType } from '../../flowTypes';
import c from './constants';

type PropType = {
  history: RouterHistory,
  getBrokerages: () => Promise<Array<BrokerageType>>,
  classes: Object,
}

type StateType = {
  brokerages: Array<BrokerageType>,
  loading: boolean,
}

class Brokerages extends React.Component<PropType, StateType> {

  state = {
    brokerages: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.props.getBrokerages()
      .then(brokerages => this.setState({ brokerages, loading: false }))
      .catch(() => this.setState({ loading: false })); /* TODO: handle error */
  }

  render() {
    return (
      <div className={this.props.classes.brokeragesTable}>
        <UnControlledTable
          data={this.state.brokerages}
          loading={this.state.loading}
          columns={columns}
          defaultPageSize={c.DEFAULT_PAGE_SIZE}
          onRowClick={row => this.props.history.push(`/admin/brokerage-management/${row.original.id}`)}
        />
      </div>
    );
  }

}

export default compose(
  withStyles(styles),
  withRouter,
  withAppUser,
  withBrokerages,
)(Brokerages);
