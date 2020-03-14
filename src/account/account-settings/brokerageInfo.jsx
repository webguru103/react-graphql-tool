import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './brokerageInfo.styles';
import type { BrokerageType } from '../../flowTypes';

const BrokerageInfoC = ({ classes, brokerage }: { classes: Object, brokerage: BrokerageType }) => (
  <div className={classes.root}>
    <div className={classes.content}>
      <Typography component="div" className={classes.label}><FormattedMessage id="bo-name" defaultMessage="Office" /></Typography>
      <Typography component="div" className={classes.body}>{brokerage.brokerageName}</Typography>
    </div>
    <div className={classes.content}>
      <Typography component="div" className={classes.label}><FormattedMessage id="bo-addr" defaultMessage="Address" /></Typography>
      <Typography component="div" className={classes.body}>
        {`${brokerage.unit}-${brokerage.streetNumber}, ${brokerage.streetName}, ${brokerage.city}`}
      </Typography>
    </div>
    <div className={classes.content}>
      <Typography component="div" className={classes.label}><FormattedMessage id="bo-phone" defaultMessage="Phone" /></Typography>
      <Typography component="div" className={classes.body}>{brokerage.phone}</Typography>
    </div>
    <div className={classes.content}>
      <Typography component="div" className={classes.label}><FormattedMessage id="bo-fax" defaultMessage="Fax" /></Typography>
      <Typography component="div" className={classes.body}>{brokerage.fax}</Typography>
    </div>
  </div>
);

export default withStyles(styles)(BrokerageInfoC);
