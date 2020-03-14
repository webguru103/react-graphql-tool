import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import NewTransactionDialog from './newTransactionDialog';
import styles from './newTransactionButton.styles';
import { compose } from '../../../utility';
import { withDialog } from '../../../shared/dialog/withDialog';

type PropType = {
  createDialog: Function,
  classes: Object,
}

const NewTransactionButton = ({ createDialog, classes }: PropType) => (
  <Button
    variant="raised"
    onClick={() => createDialog({ dialogContent: <NewTransactionDialog /> })}
    classes={{ root: classes.transactionButton }}
    disableRipple
  >
    <AddIcon />
    New Transaction
  </Button>
);

export default compose(
  withDialog,
  withStyles(styles, { withTheme: true }),
)(NewTransactionButton);
