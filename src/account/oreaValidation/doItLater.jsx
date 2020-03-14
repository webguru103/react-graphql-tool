import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Button from '../../shared/button/button';
import styles from './doItLater.styles';
import c from './constants';

type PropType = {
  classes: Object,
  closeDialog: Function,
}

export const DoItLaterC = ({ classes, closeDialog }: PropType) => (
  <React.Fragment>
    <div className={classes.notice} data-testid="do-it-later">
      <div className={classes.noticeText}>
        {c.DO_IT_LATER_MSG}
      </div>
    </div>
    <div className={classes.controlButtons}>
      <Button
        testId="close-dialog"
        classes={{ button: classes.controlButton }}
        text={c.OK}
        onClick={closeDialog}
        secondary
      />
    </div>
  </React.Fragment>
);

export default withStyles(styles)(DoItLaterC);
