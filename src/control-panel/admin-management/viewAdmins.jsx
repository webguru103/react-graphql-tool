import React from 'react';
import { withRouter } from 'react-router';
import type { RouterHistory } from 'react-router';
import debounce from 'lodash.debounce';
import { columns } from './columns';
import { withAdmins } from './api/admins.service';
import { pro, get, compose } from '../../utility';
import c from './constants';
import type { UserType } from './flowTypes';
import { DEBOUNCE_TABLE_REFETCH_MS } from '../../configurations';
import UnControlledTable from '../../shared/table/unControlledTable';

type PropType = {
  onRefetch: Function,
  history: RouterHistory,
  location: Object,
};

type StateType = {
  data: Array<UserType>,
  totalCount: number,
  loading: boolean,
}

export class ViewAdminsC extends React.PureComponent<PropType, StateType> {

  state = {
    data: [],
    totalCount: 0,
    loading: false,
  };

  fetchData = debounce(async () => {
    this.setState({ loading: true });

    const [err, returnedData] = await pro(this.props.onRefetch());

    if (err) {
      // TODO: handle error
      this.setState({ loading: false });
    } else if (returnedData) {
      const admins = get(returnedData, 'data.admins.nodes', []).reduce((acc, node) => [...acc, get(node, 'userByUserId')], []);

      this.setState({
        data: admins,
        totalCount: get(returnedData, 'data.admins.totalCount', 0),
        loading: false,
      });
    }
  }, DEBOUNCE_TABLE_REFETCH_MS);

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
        columns={columns}
        onFetchData={this.fetchData}
        defaultPageSize={c.DEFAULT_PAGE_SIZE}
        totalAmount={totalCount}
        onRowClick={row => this.props.history.push(`/cp-user/admin-management/${row.original.id}`)}
        defaultFiltered={[{ id: filter, value: filterValue }]}
        filtersVisible={filtersVisible}
      />
    );
  }

}

export default compose(withRouter, withAdmins)(ViewAdminsC);
