import React from 'react';
import { withRouter } from 'react-router-dom';
import type { Match } from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { withTransactions } from './api/transaction.service';
import { compose } from '../../utility';
import Content from './contentTransaction/contentTransaction';
import styles from './transaction.styles';
import { DEBOUNCE_TIMEOUT } from '../../configurations';
import type { TransactionType } from './flowTypes';

type Props = {
  classes: Object,
  fetchMore: Function,
  transactions: Array<TransactionType>,
  history: Object,
  match: Match,
  onFilter: Function,
  filterInput: string,
}

export class TransactionC extends React.Component<Props, *> {

  static getDerivedStateFromProps(nextProps: Props, prevState: any) {
    if (nextProps.transactions !== prevState.visibleTransactions) {
      return ({ visibleTransactions: nextProps.transactions });
    }
    return null;
  }

  state = {
    loadingMore: false,
    filtering: false,
    visibleTransactions: this.props.transactions,
    filterInput: '',
    page: 0,
  };

  containerRef = null;

  componentDidMount() {
    if (this.containerRef) {
      window.addEventListener('scroll', this.fetchMoreOnScroll);
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.filterInput !== this.props.filterInput) {
      this.handleTransactionsFilter(this.props.filterInput);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.fetchMoreOnScroll);
  }

  onTransactionClick = (id: string, name: string) => {
    const { history, match } = this.props;
    history.push({ pathname: `${match.path}/${id}`, state: { ...history.state, transactionName: name, transactionId: id } });
  };

  fetchMoreOnScroll = () => {
    if (
      document.documentElement && document.body
      && (document.body.offsetHeight + document.documentElement.scrollTop) >= document.documentElement.scrollHeight) {
      if (!this.state.loadingMore) {
        this.setState({ loadingMore: true });
        setTimeout(async () => {
          await this.props.fetchMore({ page: this.state.page + 1, filter: this.state.filterInput });
          this.setState(prevState => ({ loadingMore: false, page: prevState.page + 1 }));
        }, DEBOUNCE_TIMEOUT);
      }
    }
  };

  handleTransactionsFilter = (filter: string) => {
    this.setState({ filtering: true, filterInput: filter, page: 0 });
    setTimeout(async () => {
      await this.props.onFilter({ filter: this.state.filterInput });
      this.setState({ filtering: false });
    }, DEBOUNCE_TIMEOUT);
  };

  render() {
    const {
      visibleTransactions, loadingMore, filtering, filterInput,
    } = this.state;
    const { classes } = this.props;
    return (
      <div ref={r => (this.containerRef = r)} className={classes.transaction}>
        <Content
          transactions={visibleTransactions}
          onTransactionClick={this.onTransactionClick}
          filtering={filtering}
          filterInput={filterInput}
        />
        {filtering
          && (
          <div className={classes.filteringProgress}>
            <CircularProgress />
          </div>
          )
        }
        <div className={classes.loadMore}>
          {loadingMore && <CircularProgress />}
        </div>
      </div>
    );
  }

}

export default compose(
  withStyles(styles, { withTheme: true }),
  withTransactions,
  withRouter,
)(TransactionC);
