import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import Certificate from './certificate';
import Layout from './layout';
import styles from './styles';

type Props = {
  classes: Object,
  match: Object,
  stampHash: string,
  handleCertificateError: (stamp: string) => void,
  backToLayout: () => void,
};

class SignatureCertificateScreen extends React.PureComponent<Props, null> {

  render() {
    const {
      classes,
      match,
      stampHash,
      handleCertificateError,
      backToLayout,
    } = this.props;
    return (
      <Layout>
        <Helmet titleTemplate="%s - DealTap" defaultTitle="DT40">
          <meta name="description" content="Signature Certificate" />
          <title>Signature Certificate</title>
        </Helmet>
        <div className={classes.screenContainer}>
          <Certificate match={match} stampHash={stampHash} handleCertificateError={handleCertificateError} />
          <div className={classes.buttonContainer}>
            <button type="button" className={classes.backButton} onClick={backToLayout}>Look up another one</button>
          </div>
        </div>
      </Layout>
    );
  }

}

export default withStyles(styles, { withTheme: true })(SignatureCertificateScreen);
