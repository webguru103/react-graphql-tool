import * as React from 'react';
import BaseTable from './baseTable';

type StateType = {
  page: number,
  pageSize: number,
  prevPageSize: ?number,
}

type PropType = {
  columns: Array<Object>,
  data: Array<any>,
  totalAmount: number,
  page?: number,
  loading?: boolean,
  defaultPageSize?: number,
  fetchDataOnMount?: boolean,
  onFetchData: ({
    filtered: Array<{[string]: string}>, sorted: Array<{[string]: string}>, pageSize: number, page: number,
  }) => Promise<any>,
}

class TableC extends React.PureComponent<PropType, StateType> {

  static defaultProps = {
    page: 0,
    loading: false,
    defaultPageSize: 10,
    fetchDataOnMount: false,
  };

  state = {
    page: this.props.page || 0,
    pageSize: this.props.defaultPageSize || 10,
    prevPageSize: null,
  };

  onMountFetchDataCalled = false;

  handlePageChange = (page: number) => {
    this.setState({ page });
  };

  onFetchData = (data: {
    filtered: Array<{[string]: string}>, sorted: Array<{[string]: string}>, pageSize: number, page: number,
  }) => {
    if (this.props.fetchDataOnMount) {
      this.props.onFetchData(data);
      return;
    }

    if (!this.onMountFetchDataCalled) {
      this.onMountFetchDataCalled = true;
      return;
    }

    // Check to prevent unnecessary fetch on pageSize state change
    if (data.pageSize === this.state.prevPageSize) {
      return;
    }

    this.props.onFetchData(data);
  };

  handlePageSizeChange = (pageSize: number, page: number) => {
    this.setState(prevState => ({ page, pageSize, prevPageSize: prevState.pageSize }));
  };

  render() {
    const { page, pageSize } = this.state;
    const { totalAmount, loading } = this.props;
    return (
      <BaseTable
        {...this.props}
        onFetchData={this.onFetchData}
        manual
        page={page}
        loading={loading}
        pageSize={pageSize}
        pages={Math.ceil(totalAmount / pageSize)}
        onPageChange={this.handlePageChange}
        onPageSizeChange={this.handlePageSizeChange}
      />
    );
  }

}

export default TableC;
