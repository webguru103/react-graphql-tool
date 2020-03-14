import React from 'react';
import { withStyles } from '@material-ui/core';
import Button from '../../button/button';
import { messages } from '../constants';
import styles from './updateSignature.styles';

const UpdateSignatureC = ({
  classes, signature, initials, useExistingStamps, createNewStamps,
}) => (
  <div className={classes.root}>
    <div className={classes.header}>Your Stamps</div>
    <div className={classes.stamps}>
      <div className={classes.labeledPicture} style={{ width: '75%' }}>
        <div>Signature</div>
        <img src={signature} className={classes.picture} alt="" />
      </div>
      <div className={classes.labeledPicture} style={{ width: '22%' }}>
        <div>Initial</div>
        <img src={initials} className={classes.picture} alt="" />
      </div>
    </div>
    <div className={classes.buttons}>
      <Button classes={{ button: classes.button }} secondary onClick={createNewStamps}>
        {messages.CREATE_NEW_STAMPS}
      </Button>
      <Button classes={{ button: classes.button }} onClick={useExistingStamps}>
        {messages.USE_THESE_STAMPS}
      </Button>
    </div>
  </div>
);

export default withStyles(styles)(UpdateSignatureC);
