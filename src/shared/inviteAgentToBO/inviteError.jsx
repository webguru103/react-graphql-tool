import React from 'react';
import { withStyles } from '@material-ui/core';
import c from './constants';
import { get } from '../../utility';
import styles from './inviteError.styles';
import type { ParsedApiError } from '../../api-error-parser/errorParser';

type PropType = {
  classes: Object,
  submitErrors: Array<{
    email: string,
    error: ParsedApiError,
  }>,
}

const InviteErrorC = ({ submitErrors, classes }: PropType) => (
  <div className={classes.inviteError}>
    <p>{c.COULD_NOT_SEND}</p>
    {
      submitErrors.map(submError => (
        <span key={submError.email}>
          {`${submError.email}: `}
          {get(submError, 'error.network') ? c.NETWORK_ERROR : get(submError, 'error.global')}
        </span>
      ))
    }
  </div>
);

export default withStyles(styles)(InviteErrorC);
