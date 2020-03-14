import * as React from 'react';
import { withRouter } from 'react-router';
import type { RouterHistory } from 'react-router';
import { withForms } from './api/form.service';
import { Table } from '../../shared/table';
import { columns } from './columns';
import { paginationOptions, compose } from '../../utility';
import FormActionsButton from './formActionsButton';
import type { Form, Pagination } from '../../flowTypes';
import { DEFAULT_PAGE_SIZE, FORM_STATUS } from '../../constants';

type PropType = {
  refetch: Function,
  forms: Array<Form>,
  totalCount: number,
  history: RouterHistory,
};

type StateType = {
  loading: boolean,
}

export class ViewFormsC extends React.PureComponent<PropType, StateType> {

  state = {
    loading: false,
  };

  pagination: Pagination = {
    offset: 0,
    first: DEFAULT_PAGE_SIZE,
    condition: { formStatus: FORM_STATUS.ACTIVE },
    orderBy: [],
  };

  fetchData = async ({
    filtered, sorted, pageSize, page,
  }: {
    filtered: Array<{[string]: string}>, sorted: Array<{[string]: string}>, pageSize: number, page: number,
  } = {}) => {
    this.setState({ loading: true });

    const pagination = paginationOptions({
      page, pageSize, filtered, sorted,
    });

    // storing pagination locally to be passed to update dialog;
    this.pagination = pagination;

    await this.props.refetch(pagination);

    this.setState({ loading: false });
  };

  refetchWithPagination = () => this.props.refetch(this.pagination);

  render() {
    return (
      <Table
        loading={this.state.loading}
        data={this.props.forms}
        defaultFiltered={[{ id: 'formStatus', value: FORM_STATUS.ACTIVE }]}
        filtersVisible
        columns={[
          ...columns,
          {
            Header: 'Actions',
            id: 'actions',
            filterable: false,
            sortable: false,
            Cell: row => (
              <FormActionsButton
                form={row.original}
                refetch={this.refetchWithPagination}
              />
            ),
          },
        ]}
        onFetchData={this.fetchData}
        onRowClick={(row) => {
          let link = `/cp-user/editor/edit?formId=${row.original.id}`;

          if (row.original.publishedAt && row.original.publishedVersionId) {
            link = `/cp-user/editor/view?formId=${row.original.id}`;
          }

          this.props.history.push(link);
        }}
        totalAmount={this.props.totalCount}
      />
    );
  }

}

export default compose(
  withForms,
  withRouter,
)(ViewFormsC);
