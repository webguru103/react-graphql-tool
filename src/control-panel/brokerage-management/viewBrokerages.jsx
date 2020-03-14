import React from 'react';
import { withRouter } from 'react-router';
import type { RouterHistory } from 'react-router';
import debounce from 'lodash.debounce';
import { columns } from './columns';
import { withGetAllBrokerages, withAgentCount, withAdminCount } from './api/brokerages.service';
import { pro, get, compose } from '../../utility';
import c from './constants';
import UncontrolledTable from '../../shared/table/unControlledTable';
import type { BrokerageType } from './flowTypes';
import { DEBOUNCE_TABLE_REFETCH_MS } from '../../configurations';

type PropType = {
  onRefetch: Function,
  agentCount: Function,
  adminCount: Function,
  history: RouterHistory,
};

type StateType = {
  brokerages: Array<BrokerageType>,
  totalAmount: number,
  loading: boolean,
}

export class ViewBrokeragesC extends React.PureComponent<PropType, StateType> {

  state = {
    brokerages: [],
    totalAmount: 0,
    loading: false,
  };

  fetchData = debounce(async () => {
    this.setState({ loading: true });
    const [err, returnedData] = await pro(this.props.onRefetch());
    const [err2, returnedAgents] = await pro(this.props.agentCount());
    const [err3, returnedAdmins] = await pro(this.props.adminCount());

    if (err || err2 || err3) {
      // TODO: handle error
      this.setState({ loading: false });
    } else if (returnedData) {
      const massagedData = [];
      const bulkData = get(returnedData, 'data.brokerages.nodes', []);

      bulkData.forEach((brokerage, index) => {

        if (brokerage.id === get(returnedAgents, `data.brokerages.nodes.${index}.id`)
          && brokerage.id === get(returnedAdmins, `data.brokerages.nodes.${index}.id`)) {

          const agentCount = get(returnedAgents, `data.brokerages.nodes.${index}.brokerageAclsByBrokerageId.totalCount`, '0');
          const adminCount = get(returnedAdmins, `data.brokerages.nodes.${index}.brokerageAclsByBrokerageId.totalCount`, '0');

          const enhancedBrokerage = {
            ...brokerage,
            agentCount: ((agentCount === undefined) ? '0' : agentCount),
            adminCount: ((adminCount === undefined) ? '0' : adminCount),
          };
          massagedData.push(enhancedBrokerage);
        }
      });

      this.setState({
        brokerages: massagedData,
        // TODO: UPDATE PAGES COUNT BASED ON TOTAL BROKERAGE COUNT
        totalAmount: get(returnedData, 'data.brokerages.totalCount', 0),
        loading: false,
      });
    }
  }, DEBOUNCE_TABLE_REFETCH_MS);

  render() {
    const { brokerages, totalAmount, loading } = this.state;

    return (
      <UncontrolledTable
        data={brokerages}
        loading={loading}
        columns={columns}
        onFetchData={this.fetchData}
        defaultPageSize={c.DEFAULT_PAGE_SIZE}
        totalAmount={totalAmount}
        onRowClick={row => this.props.history.push(`/cp-user/brokerage-management/${row.original.id}`)}
      />
    );
  }

}

export default compose(
  withGetAllBrokerages,
  withAgentCount,
  withAdminCount,
  withRouter,
)(ViewBrokeragesC);
