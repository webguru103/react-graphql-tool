import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { withRouter } from 'react-router';
import withOreaVerification from '../oreaValidation/withOreaVerification';
import styles from './affiliation.styles';
import { compose } from '../../utility';

type Props = {
  classes: Object,
  affiliated: boolean,
  oreaDialog: Function,
}

class AffiliationC extends React.PureComponent<Props, null> {

  render() {
    const { classes, affiliated, oreaDialog } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <Typography component="div" className={classes.label}>OREA</Typography>
          <Typography component="div" className={classes.body}>{affiliated ? 'Affiliated' : 'Not Affiliated' }</Typography>
        </div>
        {
          !affiliated
          && <Button color="primary" className={classes.button} disableFocusRipple onClick={oreaDialog}>Verify</Button>
        }
      </div>
    );
  }

}

export default compose(
  withStyles(styles, { withTheme: true }),
  withRouter,
  withOreaVerification,
)(AffiliationC);
