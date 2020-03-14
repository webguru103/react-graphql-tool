import React from 'react';
import { withRouter } from 'react-router';
import type { RouterHistory } from 'react-router';
import { columns } from './columns';
import { withGetAdminsForSuperAdmin } from '../api/admin.service';
import { compose } from '../../utility';
import c from './constants';
import type { UserType } from '../../flowTypes';
import { UnControlledTable } from '../../shared/table';
import { withAppUser } from '../../shared/authorization/userConsumer';

type PropType = {
  fetchData: Function,
  history: RouterHistory,
  location: Object,
};

type StateType = {
  data: Array<UserType>,
  loading: boolean,
}

export class ViewAgentsC extends React.PureComponent<PropType, StateType> {

  state = {
    data: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });
    this.props.fetchData()
      .then(data => this.setState({ data, loading: false }))
      .catch(() => this.setState({ loading: false }));
  }

  render() {
    // TODO switch to backend pagination
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
        data={this.state.data}
        loading={this.state.loading}
        columns={columns}
        defaultPageSize={c.DEFAULT_PAGE_SIZE}
        onRowClick={row => this.props.history.push(`/admin/admin-management/${row.original.id}`)}
        defaultFiltered={[{ id: filter, value: filterValue }]}
        filtersVisible={filtersVisible}
      />
    );
  }

}

export default compose(
  withAppUser,
  withGetAdminsForSuperAdmin,
  withRouter,
)(ViewAgentsC);
