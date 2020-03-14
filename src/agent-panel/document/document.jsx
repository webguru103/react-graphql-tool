import React from 'react';
import { withRouter } from 'react-router-dom';
import type { Match, RouterHistory } from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import Content from './contentDocument';
import styles from './document.styles';
import { DEBOUNCE_TIMEOUT } from '../../configurations';
import type { DocumentType } from './flowTypes';
import { withDocuments } from './api/document.service';
import { compose } from '../../utility';

type Props = {
  classes: Object,
  fetchMore: Function,
  documents: Array<DocumentType>,
  history: RouterHistory,
  match: Match,
  onFilter: Function,
  filterInput: string,
};

export class DocumentC extends React.Component<Props, *> {

  static getDerivedStateFromProps(nextProps: Props, prevState: any) {
    if (nextProps.documents !== prevState.documents) {
      return ({ documents: nextProps.documents });
    }
    return null;
  }

  state = {
    loadingMore: false,
    filtering: false,
    documents: this.props.documents,
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
      this.handleDocumentsFilter();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.fetchMoreOnScroll);
  }

  onDocumentClick = (id: string) => {
    const { history, match } = this.props;
    history.push(`${match.url}/${id}`);
  };

  fetchMoreOnScroll = () => {
    const { match } = this.props;

    if (
      document.documentElement && document.body
      && (document.body.offsetHeight + document.documentElement.scrollTop) >= document.documentElement.scrollHeight) {
      if (!this.state.loadingMore) {
        this.setState({ loadingMore: true });
        setTimeout(async () => {
          await this.props.fetchMore({
            id: match.params.transactionId,
            page: this.state.page + 1,
            filter: this.props.filterInput,
          });
          this.setState(prevState => ({ loadingMore: false, page: prevState.page + 1 }));
        }, Number(DEBOUNCE_TIMEOUT));
      }
    }
  };

  handleDocumentsFilter = () => {
    this.setState({ filtering: true });
    setTimeout(async () => {
      await this.props.onFilter({ filter: this.props.filterInput });
      this.setState({ filtering: false });
    }, Number(DEBOUNCE_TIMEOUT));
  };

  render() {
    const {
      documents, loadingMore, filtering,
    } = this.state;
    const { classes, filterInput } = this.props;
    return (
      <div ref={r => (this.containerRef = r)} className={classes.document}>
        <Content documents={documents} onDocumentClick={this.onDocumentClick} filtering={filtering} filterInput={filterInput} />
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
  withRouter,
  withDocuments,
)(DocumentC);
