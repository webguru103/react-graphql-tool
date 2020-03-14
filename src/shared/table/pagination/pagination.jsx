import * as React from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import { withStyles } from '@material-ui/core';
import PaginationActions from './paginationActions';
import styles from './pagination.styles';

type PaginationPropType = {
  page: number,
  classes: Object,
  onPageChange: (number) => void,
  onPageSizeChange: (any, number) => void,
  pageSize: number,
  pageSizeOptions: Array<number>,
  totalAmount: number,
}

const Pagination = ({
  page, classes, onPageChange, onPageSizeChange, pageSize, pageSizeOptions, totalAmount,
}: PaginationPropType) => (
  <div className={classes.paginationContainer}>
    <TablePagination
      className={classes.pagination}
      component="div"
      classes={{
        select: classes.paginationSelect,
      }}
      colSpan={3}
      count={totalAmount}
      rowsPerPage={pageSize}
      page={page}
      rowsPerPageOptions={pageSizeOptions}
      ActionsComponent={PaginationActions}
      onChangePage={(pageIndex) => {
        window.scrollTo({ top: 0, left: 0 });
        onPageChange(pageIndex);
      }}
      onChangeRowsPerPage={ev => onPageSizeChange(ev.target.value, page)}
      SelectProps={{
        SelectDisplayProps: {
          'data-testid': 'select',
        },
      }}
    />
  </div>
);

export default withStyles(styles)(Pagination);
