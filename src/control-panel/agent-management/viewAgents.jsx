import React from 'react';
import { withRouter } from 'react-router';
import type { RouterHistory } from 'react-router';
import { FormattedMessage } from 'react-intl';
import debounce from 'lodash.debounce';
import { columns } from './columns';
import RemoveFromBO from './removeFromBO';
import { withAgents, withRemoveAgentFromBO } from './api/agents.service';
import { compose, pro, get } from '../../utility';
import c from './constants';
import type { UserType } from './flowTypes';
import UnControlledTable from '../../shared/table/unControlledTable';
import { withSnackbar } from '../../shared/snackbar/withSnackbar';
import { DEBOUNCE_TABLE_REFETCH_MS } from '../../configurations';

type PropType = {
  onRefetch: Function,
  createSnackbar: Function,
  removeFromBO: Function,
  history: RouterHistory,
  location: Object,
};

type StateType = {
  data: Array<UserType>,
  totalCount: number,
  loading: boolean,
}

export class ViewAgentsC extends React.PureComponent<PropType, StateType> {

  state = {
    data: [],
    totalCount: 0,
    loading: false,
  };

  fetchData = debounce(async () => {
    this.setState({ loading: true });

    const [err, returnedData] = await pro(this.props.onRefetch({
      fetchPolicy: 'network-only',
    }));

    if (err) {
      // TODO: handle error
      this.setState({ loading: false });
    } else if (returnedData) {
      const agents = get(returnedData, 'data.agents.nodes', []).reduce((acc, node) => [...acc, get(node, 'userByUserId')], []);

      this.setState({
        data: agents,
        totalCount: get(returnedData, 'data.agents.totalCount', 0),
        loading: false,
      });
    }
  }, DEBOUNCE_TABLE_REFETCH_MS);

  handleRemoveFromBO = async ({
    id, agentName, brokerageName, brokerageAclId,
  }: { id: String, agentName: String, brokerageName: String, brokerageAclId: String } = {}) => {
    const [err] = await pro(this.props.removeFromBO({
      id,
      brokerageAclId,
    }));

    if (err) {
      // TODO: handle error
      return;
    }

    this.setState({ loading: true });

    const [errs, returnedData] = await pro(this.props.onRefetch({
      fetchPolicy: 'cache-first',
    }));

    if (errs) {
      // TODO: handle error
      this.setState({ loading: false });
      return;
    }

    if (returnedData) {
      const agents = get(returnedData, 'data.agents.nodes', []).reduce((acc, node) => [...acc, get(node, 'userByUserId')], []);

      this.setState({
        data: agents,
        totalCount: get(returnedData, 'data.agents.totalCount', 0),
        loading: false,
      });
    }

    this.props.createSnackbar(<FormattedMessage
      id="agent-removed-feedback"
      defaultMessage={'{agentName} has been removed from {brokerageName}'}
      values={{ agentName, brokerageName }}
    />);
  };

  render() {
    const { data, totalCount, loading } = this.state;
    let filter = '';
    let filterValue = '';
    let filtersVisible = false;
    if (this.props.location) {
      const urlParams = new URLSearchParams(this.props.location.search);
      filter = urlParams.get('filter');
      filterValue = urlParams.get('filter_value');
      if (filterValue) {
        filtersVisible = true;
      }
    }

    return (
      <UnControlledTable
        data={data}
        loading={loading}
        columns={[
          ...columns,
          {
            Header: 'Action',
            id: null,
            filterable: false,
            sortable: false,
            Cell: (row: Object) => {
              const brokeragesNodes = get(row.original, 'brokerageAclsByUserId.nodes', []);
              return (
                row && row.original && brokeragesNodes.length
                  ? (
                    <RemoveFromBO
                      user={row.original}
                      handleRemoveFromBO={this.handleRemoveFromBO}
                    />
                  )
                  : ''
              );
            },
          },
        ]}
        onFetchData={this.fetchData}
        totalAmount={totalCount}
        defaultPageSize={c.DEFAULT_PAGE_SIZE}
        onRowClick={row => this.props.history.push(`/cp-user/agent-management/${row.original.id}`)}
        defaultFiltered={[{ id: filter, value: filterValue }]}
        filtersVisible={filtersVisible}
      />
    );
  }

}

export default compose(
  withAgents,
  withRemoveAgentFromBO,
  withSnackbar,
  withRouter,
)(ViewAgentsC);
