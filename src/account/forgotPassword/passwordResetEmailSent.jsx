import React from 'react';
import { withRouter } from 'react-router';
import type { RouterHistory } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withSendResetPasswordEmail } from '../api/accountService';
import { compose, pro } from '../../utility';
import styles from './passwordResetEmailSent.styles';
import { messages } from '../constants';
import Button from '../../shared/button/button';
import { withSnackbar } from '../../shared/snackbar/withSnackbar';

type Props = {
  classes: Object,
  history: RouterHistory,
  createSnackbar: Function,
  sendResetPasswordEmail: Function,
  email: string,
};

class PasswordResetEmailSentC extends React.PureComponent<Props, *> {

  handleSendResetPasswordEmail = async ({ email }: { email: string }) => {
    const { sendResetPasswordEmail, createSnackbar } = this.props;

    const [err] = await pro(sendResetPasswordEmail({
      email,
    }));

    let snackbarMessage = messages.EMAIL_RESENT;

    if (err) {
      snackbarMessage = messages.REQUEST_ERROR;
    }

    createSnackbar(snackbarMessage);
  };

  resendEmail = () => {
    const { email } = this.props;

    this.handleSendResetPasswordEmail({
      email,
    });
  };

  render() {
    const { classes, history } = this.props;
    return (
      <div className={classes.resetEmailSent}>
        <Typography classes={{ root: classes.subtitle }} variant="subheading">
          A password reset email was sent to your email address. Please check your email.
        </Typography>
        <div className={classes.buttons}>
          <Button classes={{ button: classes.button }} text="Login" onClick={() => history.push('/login')} />
          <Button testId="submit-button" classes={{ button: classes.button }} secondary text="Resend Email" onClick={this.resendEmail} />
        </div>
      </div>
    );
  }

}

export default compose(
  withRouter,
  withSnackbar,
  withStyles(styles),
  withSendResetPasswordEmail,
)(PasswordResetEmailSentC);
