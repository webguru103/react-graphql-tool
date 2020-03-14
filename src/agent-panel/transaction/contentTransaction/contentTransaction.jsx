import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { compose } from '../../../utility';
import { withCopyTransaction } from '../api/transaction.service';
import c from '../constants';
import DeleteDialog from '../deleteTransactionDialog/deleteTransactionDialog';
import RenameDialog from '../renameTransactionDialog/renameTransactionDialog';
import styles from './contentTransaction.styles';
import { withDialog } from '../../../shared/dialog/withDialog';
import HomeIcon from './ic_home.svg';

type PropType = {
  transactions?: Array<Object>,
  classes?: Object,
  onTransactionClick: (id: string, name: string) => any,
  copyTransaction: (id: string) => any,
  createDialog: ({ dialogContent: React.Element, }) => any,
};

export class ContentTransactionC extends React.PureComponent<PropType> {

  state = {
    anchorEl: null,
    anchorId: null,
    activeTransaction: {},
  };

  handleMenuClick = (e, id) => {
    e.stopPropagation();
    this.setState({
      anchorEl: e.currentTarget,
      anchorId: id,
      activeTransaction: (this.props.transactions.filter(transaction => transaction.id === id))[0],
    });
  };

  handleClose = (e) => {
    e.stopPropagation();
    this.setState({ anchorEl: null, anchorId: null });
  };

  handleRename = (e) => {
    this.handleClose(e);
    this.props.createDialog({
      dialogContent: <RenameDialog transaction={this.state.activeTransaction} />,
    });
  };

  handleDelete = (e) => {
    this.handleClose(e);
    this.props.createDialog({
      dialogContent: <DeleteDialog transaction={this.state.activeTransaction} />,
    });
  };

  handleCopy = (e) => {
    this.handleClose(e);
    this.props.copyTransaction({ id: this.state.anchorId });
  };

  render() {
    const {
      transactions,
      classes,
      onTransactionClick,
    } = this.props;
    const { anchorEl } = this.state;
    return (
      <React.Fragment>
        <Paper classes={{ root: classes.contentHeader }} elevation={0}>
          <span>{c.TABLE_HEAD_NAME}</span>
          <span>{c.TABLE_HEAD_OWNER}</span>
          <span>{c.TABLE_HEAD_LAST_MODIFIED}</span>
        </Paper>
        {transactions && transactions.map(t => (
          <Paper
            key={t.id}
            onClick={() => onTransactionClick(t.id, t.name)}
            classes={{ root: classes.transaction }}
            elevation={1}
          >
            <div className={classes.contentCell}>
              <HomeIcon className={classes.contentTransactionIcon} />
              <span>{t.name}</span>
            </div>
            <div className={classes.contentCell}>
              <span>{t.owner || '-'}</span>
            </div>
            <div className={`${classes.contentCell} ${classes.contentCellWithButton}`}>
              {t.updatedAt ? moment(t.updatedAt).format('MMMM Do YYYY, h:mm A') : '-'}
              <IconButton
                onClick={e => this.handleMenuClick(e, t.id)}
              >
                <MoreHorizIcon />
              </IconButton>
            </div>
          </Paper>
        ))}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleRename}>{c.MENU_RENAME}</MenuItem>
          <MenuItem onClick={this.handleCopy}>{c.MENU_COPY}</MenuItem>
          <MenuItem onClick={this.handleDelete}>{c.MENU_DELETE}</MenuItem>
        </Menu>
      </React.Fragment>
    );
  }

}

ContentTransactionC.defaultProps = {
  transactions: [],
  classes: {},
};

export default compose(
  withStyles(styles),
  withCopyTransaction,
  withDialog,
)(ContentTransactionC);
