import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import type { Match } from 'react-router';
import AddDocumentsDialog from './addDocumentsDialog';
import styles from './addDocumentsButton.styles';
import { compose } from '../../../utility';
import { withDialog } from '../../../shared/dialog/withDialog';

type PropType = {
  createDialog: Function,
  classes: Object,
  match: Match,
}

const AddDocumentsButtonC = ({ createDialog, classes, match }: PropType) => (
  <Button
    variant="raised"
    onClick={() => createDialog({ dialogContent: <AddDocumentsDialog transactionId={match.params.transactionId} /> })}
    classes={{ root: classes.transactionButton }}
    disableRipple
  >
    <AddIcon />
    Add Form
  </Button>
);

export default compose(
  withRouter,
  withDialog,
  withStyles(styles, { withTheme: true }),
)(AddDocumentsButtonC);
