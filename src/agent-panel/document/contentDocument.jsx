import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import DocumentIcon from '@material-ui/icons/Description';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import type { Match } from 'react-router';
import { withCopyDocument } from './api/document.service';
import c from './constants';
import styles from './contentDocument.styles';
import DeleteDocumentDialog from './deleteDocumentDialog';
import type { DocumentType } from './flowTypes';
import { compose } from '../../utility';
import { withDialog } from '../../shared/dialog/withDialog';

type Props = {
  documents: Array<DocumentType>,
  classes: Object,
  copyDocument: Function,
  onDocumentClick: Function,
  createDialog: Function,
  match: Match,
}

export class ContentDocumentC extends React.PureComponent<Props, *> {

  state = {
    anchorEl: null,
    anchorId: null,
    activeDocument: {},
  };

  handleMenuClick = (e: Event, id: string) => {
    e.stopPropagation();

    this.setState({
      anchorEl: e.currentTarget,
      anchorId: id,
      activeDocument: (this.props.documents.filter(document => document.id === id))[0],
    });
  };

  handleDelete = (e: Event) => {
    const { createDialog, match } = this.props;
    const { activeDocument } = this.state;
    this.handleClose(e);
    createDialog({
      dialogContent: <DeleteDocumentDialog document={activeDocument} transactionId={match.params.transactionId} />,
    });
  };

  handleClose = (e: Event) => {
    e.stopPropagation();
    this.setState({ anchorEl: null });
  };

  handleCopy = (e: Event) => {
    const { match } = this.props;
    this.props.copyDocument({
      id: this.state.anchorId,
      transactionId: match.params.transactionId,
    });
    this.handleClose(e);
  };

  render() {
    const {
      documents,
      classes,
      onDocumentClick,
    } = this.props;
    const { anchorEl } = this.state;
    return (
      <React.Fragment>
        <Paper classes={{ root: classes.contentHeader }} elevation={0}>
          <span>{c.TABLE_HEAD_NAME}</span>
          <span>{c.TABLE_HEAD_OWNER}</span>
          <span>{c.TABLE_HEAD_LAST_MODIFIED}</span>
        </Paper>
        {documents && documents.map(d => (
          <Paper
            key={d.id}
            onClick={() => onDocumentClick(d.id)}
            classes={{ root: classes.document }}
            elevation={1}
          >
            <div className={classes.contentCell}>
              <DocumentIcon classes={{ root: classes.contentDocumentIcon }} />
              <span>{d.name}</span>
            </div>
            <div className={classes.contentCell}>
              <span>-</span>
            </div>
            <div className={`${classes.contentCell} ${classes.contentCellWithButton}`}>
              {d.updatedAt ? moment(d.updatedAt).format('MMMM Do YYYY, h:mm A') : '-'}
              <IconButton
                onClick={e => this.handleMenuClick(e, d.id)}
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
          <MenuItem onClick={this.handleCopy}>{c.MENU_COPY}</MenuItem>
          <MenuItem onClick={this.handleDelete}>{c.MENU_DELETE}</MenuItem>
        </Menu>
      </React.Fragment>
    );
  }

}

export default compose(
  withCopyDocument,
  withStyles(styles),
  withDialog,
  withRouter,
)(ContentDocumentC);
