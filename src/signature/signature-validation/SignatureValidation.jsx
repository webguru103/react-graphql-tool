import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import Recaptcha from 'react-grecaptcha';
import Helmet from 'react-helmet';
import { RECAPTCHA_KEY } from '../../configurations';
import { compose } from '../../utility';
import { messages } from '../constants';
import styles from './styles';
import Button from '../../shared/button/button';
import { EVENT_KEYS } from '../../constants';
import SignatureIdInput from './idInput';
import CertificateDetail from '../signature-certificate/SignatureCertificate';
import SignatureLayout from '../layout/layout';

type Props = {
  classes: Object,
  history: Object,
  match: Object,
};
type State = {
  errorMessage: React.Element,
  signatureID: string,
  captured: boolean,
  isCertificated: boolean,
}

class SignatureValidation extends React.PureComponent<Props, State> {

  state = {
    errorMessage: '',
    signatureID: '',
    captured: false,
    isCertificated: false,
  }

  componentDidMount(): void {
    const { match } = this.props;
    if (match.params.sId) {
      this.setState({ signatureID: match.params.sId });
    }
  }

  componentDidUpdate(prevProps, prevState): void {
    const { match, history } = this.props;
    if (prevState.isCertificated && prevProps.match.params.sId && !match.params.sId) {
      this.setState({ signatureID: '', isCertificated: false });
    }

    if (history.action === 'POP' && prevState.isCertificated) {
      this.setState({ errorMessage: '', isCertificated: false });
    }
  }

  handleSubmit = (ev: SyntheticKeyboardEvent<any>) => {
    if (ev.key === EVENT_KEYS.ENTER && this.canLookUp()) {
      this.handleLookUp();
    }
  }

  // ToDo: Should integrate GraphQL, update this function to async function
  handleLookUp = () => {
    const { signatureID } = this.state;
    const { history } = this.props;
    this.setState({ errorMessage: '', isCertificated: true });
    history.push(`/s/${signatureID}`);
  }

  backToLookUp = () => {
    this.setState({ errorMessage: '', isCertificated: false });
  }

  validateSignatureID = (str) => {
    const validateREGX = /^[A-Za-z0-9]{4}[-]{1}[A-Za-z0-9]{4}$/;
    return validateREGX.test(str);
  }

  canLookUp = () => {
    const { signatureID, captured } = this.state;
    return signatureID && captured;
  }

  removeLock = () => {
    this.setState({ captured: true });
  }

  stopProceed = () => {
    this.setState({ captured: false });
  }

  handleSignatureID = (signatureID) => {
    this.setState({ signatureID });
  }

  handleCertificateError = (error = messages.WRONG_CERTIFICATE_ERROR) => {
    this.setState({
      errorMessage: error,
      isCertificated: false,
    });
  }

  render() {
    const { errorMessage, isCertificated, signatureID } = this.state;
    const { classes, match } = this.props;

    if (isCertificated) {
      return (
        <CertificateDetail
          match={match}
          stampHash={signatureID}
          handleCertificateError={this.handleCertificateError}
          backToLayout={this.backToLookUp}
        />
      );
    }

    return (
      <SignatureLayout>
        <div className={classes.root}>
          <Helmet titleTemplate="%s - DealTap" defaultTitle="DT40">
            <meta name="description" content="Signature Validation" />
            <title>Signature Validation</title>
          </Helmet>
          <div className={classes.screenTitle}>Signature Validation System</div>
          <div className={classes.screenContainer} onKeyPress={ev => this.handleSubmit(ev)} role="button" tabIndex="-1">
            <SignatureIdInput defaultSignatureID={match.params.sId} setSignatureID={this.handleSignatureID} />
            <Recaptcha sitekey={RECAPTCHA_KEY} callback={this.removeLock} expiredCallback={this.stopProceed} />
            <Button
              testId="button-submit"
              color="primary"
              classes={{ button: classes.submitButton }}
              text="Look Up"
              onClick={() => this.handleLookUp()}
              disabled={!this.canLookUp()}
            />
            <p className={classes.errorMessage}>{errorMessage}</p>
          </div>
        </div>
      </SignatureLayout>
    );
  }

}

export default compose(withStyles(styles, { withTheme: true }))(SignatureValidation);
