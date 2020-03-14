import * as React from 'react';
import IconButton from '@material-ui/core/IconButton/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { withStyles } from '@material-ui/core';
import styles from './paginationActions.styles';

type PropType = {
  onChangePage: (number) => void,
  page: number,
  count: number,
  rowsPerPage: number,
  classes: Object,
}

class PaginationActions extends React.Component<PropType, null> {

  handleFirstPageButtonClick = () => {
    this.props.onChangePage(0);
  };

  handleBackButtonClick = () => {
    this.props.onChangePage(this.props.page - 1);
  };

  handleNextButtonClick = () => {
    this.props.onChangePage(this.props.page + 1);
  };

  handleLastPageButtonClick = () => {
    this.props.onChangePage(
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const {
      classes, count, page, rowsPerPage,
    } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          <KeyboardArrowRight />
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          <LastPageIcon />
        </IconButton>
      </div>
    );
  }

}

export default withStyles(styles, { withTheme: true })(PaginationActions);
