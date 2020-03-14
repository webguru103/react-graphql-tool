import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import type { RouterHistory } from 'react-router';
import { columns } from './columns';
import RemoveFromBO from './removeFromBO';
import { withGetAgentsForAdmin, withRemoveAgentFromBO } from '../api/admin.service';
import { compose, pro } from '../../utility';
import type { UserType } from '../../flowTypes';
import Button from '../../shared/button/button';
import { UnControlledTable } from '../../shared/table';
import { withSnackbar } from '../../shared/snackbar/withSnackbar';
import { withAppUser } from '../../shared/authorization/userConsumer';
import c from './constants';

type PropType = {
  createSnackbar: Function,
  removeFromBO: Function,
  agents: UserType,
  history: RouterHistory,
  location: Object,
  loading: boolean,
};

type StateType = {
  data: Array<UserType>,
}

export class ViewAgentsC extends React.PureComponent<PropType, StateType> {

  handleRemoveFromBO = async ({
    id, agentName, brokerageName, brokerageAcl,
  }: { id: String, agentName: String, brokerageName: String, brokerageAcl: number } = {}) => {
    const [err] = await pro(this.props.removeFromBO({
      id,
      brokerageAcl,
    }));

    if (err) {
      // TODO: handle error
      return;
    }

    this.props.createSnackbar(<FormattedMessage
      id="agent-removed-feedback"
      defaultMessage={'{agentName} has been removed from {brokerageName}'}
      values={{ agentName, brokerageName }}
    />);
  };

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
        data={this.props.agents}
        loading={this.props.loading}
        defaultPageSize={c.DEFAULT_PAGE_SIZE}
        onRowClick={row => this.props.history.push(`/admin/agent-management/${row.original.id}`)}
        columns={[
          ...columns,
          {
            Header: 'Action',
            id: null,
            filterable: false,
            sortable: false,
            Cell: (row: Object) => (
              row && row.original && row.original.brokerage
                ? (
                  <RemoveFromBO
                    user={row.original}
                    handleRemoveFromBO={this.handleRemoveFromBO}
                  />
                )
                : (
                  <Button
                    text="Details"
                    secondary
                    onClick={() => {}}
                  />
                )
            ),
          },
        ]}
        defaultFiltered={[{ id: filter, value: filterValue }]}
        filtersVisible={filtersVisible}
      />
    );
  }

}

export default compose(
  withAppUser,
  withGetAgentsForAdmin,
  withRemoveAgentFromBO,
  withSnackbar,
  withRouter,
)(ViewAgentsC);
