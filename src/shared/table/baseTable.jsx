import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import debounce from 'lodash.debounce';
import ReactTable from 'react-table';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { FormattedMessage } from 'react-intl';
import './table.css';
import Pagination from './pagination/pagination';
import { DEBOUNCE_TIMEOUT } from './constants';
import Filter from './filter';

const CellAlign = ({ children, align }: { children: React.Element, align: 'center' | 'left' | 'right'}) => (
  <div
    style={{
      display: 'flex',
      height: '100%',
      justifyContent: align,
      alignItems: 'center',
    }}
  >
    {children}
  </div>
);

const FilterToggleHeader = ({
  column, label, onToggle,
}: { column: Object, label: string, onToggle: () => {}}) => (
  <React.Fragment>
    {label}
    {
        column.filterable === undefined && (
          <IconButton aria-label="Filter" disableRipple onClick={(e) => { e.stopPropagation(); onToggle(); }}>
            <SearchIcon />
          </IconButton>
        )
      }
  </React.Fragment>
);

const adaptColumns = ({ columns, toggleFilters }) => columns.map(column => (
  {
    ...column,
    Header: props => (
      <FilterToggleHeader
        {...props}
        label={column.Header}
        onToggle={() => toggleFilters(column)}
        filterable={column.filterable}
      />
    ),
    Cell: (props: { value: any }) => (
      <CellAlign align={column.align || 'center'}>
        {
          column.Cell ? React.createElement(column.Cell, props) : props.value
        }
      </CellAlign>
    ),
  }));

class TableC extends React.PureComponent<*, { areFiltersVisible: boolean}> {

  state = {
    areFiltersVisible: this.props.filtersVisible,
  };

  filterRefs: {[string]: React.Element} = {};

  toggleFilters = (column: { id: string }) => {
    this.setState(({ areFiltersVisible }) => ({ areFiltersVisible: !areFiltersVisible }),
      () => this.state.areFiltersVisible && this.filterRefs[column.id] && this.filterRefs[column.id].focus());
  };

  withRef = (filterRef: React.Element, columnName: string) => {
    this.filterRefs[columnName] = filterRef;
  };

  render() {
    return (
      <ReactTable
        {...this.props}
        onFetchData={this.props.onFetchData && debounce(this.props.onFetchData, DEBOUNCE_TIMEOUT)}
        className="-highlight"
        columns={adaptColumns({ columns: this.props.columns, toggleFilters: this.toggleFilters })}
        loadingText={<CircularProgress />}
        rowsText={<FormattedMessage id="data-table-rows" defaultMessage="Rows" />}
        ofText={<FormattedMessage id="data-table-of" defaultMessage="of" />}
        pageText={<FormattedMessage id="data-table-page" defaultMessage="Page" />}
        nextText={<FormattedMessage id="data-table-next" defaultMessage="Next" />}
        previousText={<FormattedMessage id="data-table-previous" defaultMessage="Previous" />}
        noDataText={<FormattedMessage id="data-table-no-data" defaultMessage="Nothing to display!" />}
        filterable
        defaultPageSize={this.props.defaultPageSize || 10}
        getTrProps={(_, rowInfo) => ({
          onClick: () => {
            if (this.props.onRowClick) {
              this.props.onRowClick(rowInfo);
            }
          },
        })}
        getTheadFilterProps={() => ({
          style:
            this.state.areFiltersVisible
              ? null
              : { display: 'none' },
        })}
        PaginationComponent={Pagination}
        FilterComponent={Filter(this.withRef)}
      />
    );
  }

}

export default TableC;
