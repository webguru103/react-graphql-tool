import { FormLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './brokerageAssociation.styles';
import type { BrokerageType, InviteType } from '../../flowTypes';
import { compose } from '../../utility';
import { withGetBrokerage } from './api/accountSettings.service';

type Props = {
  classes: Object,
  invite: InviteType,
  handleConfirmDialogOpen: Function,
  errorMessage: string,
  brokerage: BrokerageType
}

class BrokerageInvitation extends React.PureComponent<Props, *> {

  render() {
    const {
      classes, invite, handleConfirmDialogOpen, errorMessage, brokerage,
    } = this.props;

    const accept = 'Accept Invitation? If you have other pending invitations, they will be automatically rejected.';
    const reject = 'Reject Invitation? The brokerage office will be notified of your rejection.';

    return (
      <div className={classes.brokerageInfo}>
        <div className={classes.content}>
          <Typography component="div" className={classes.label}>
            <FormattedMessage id="bo-name" defaultMessage="Brokerage Office Name" />
          </Typography>
          <Typography component="div" className={classes.body}>{brokerage.brokerageName}</Typography>
        </div>
        <div className={classes.buttons}>
          <Button
            color="primary"
            className={classes.button}
            disableFocusRipple
            onClick={() => handleConfirmDialogOpen(accept, invite.id, 'Accept', 'Join Brokerage Office')}
          >
            Accept
          </Button>
          <Button
            color="primary"
            className={classes.button}
            disableFocusRipple
            onClick={() => handleConfirmDialogOpen(reject, invite.id, 'Reject', 'Reject Invitation')}
          >
            Reject
          </Button>
        </div>
        <FormLabel error>{errorMessage}</FormLabel>
      </div>
    );
  }

}

export default compose(withStyles(styles, { withTheme: true }), withGetBrokerage)(BrokerageInvitation);
