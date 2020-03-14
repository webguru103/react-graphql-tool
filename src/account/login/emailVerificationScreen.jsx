import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { compose } from '../../utility';
import Button from '../../shared/button/button';
import styles from './emailVerificationScreen.styles';
import { withVerificationEmail } from '../api/accountService';
import { messages } from './constants';

type Props = {
  verifyEmail: (string) => Promise<void>,
  classes: Object,
  goBack: () => {},
  email: string,
}

class EmailVerificationScreen extends React.PureComponent<Props, null> {

  componentDidMount() {
    this.props.verifyEmail(this.props.email);
  }

  render() {
    const { classes, goBack } = this.props;
    return (
      <div className={classes.screenContainer}>
        <p className={classes.screenTitle}>{messages.VERIFY_EMAIL}</p>
        <p className={classes.screenContent}>{messages.ACCOUNT_NOT_VERIFIED}</p>
        <Button onClick={goBack}>Back</Button>
      </div>
    );
  }

}

export default compose(withStyles(styles, { withTheme: true }), withVerificationEmail)(EmailVerificationScreen);
