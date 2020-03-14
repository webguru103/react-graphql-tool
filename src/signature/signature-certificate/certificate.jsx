import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment-timezone';
import Loading from '../../shared/loading/loading';
import { withUserStampByHash } from '../api/signature.service';
import { compose } from '../../utility';
import { labels, CERTIFICATE_ERROR_MESSAGE } from '../constants';
import styles from './certificate.styles';

type Props = {
  classes: Object,
  handleCertificateError: (stamp: string) => void,
  loading: boolean,
  error: any,
  errors: any,
  data: any,
};

type State = {
  certificate: Object,
};

class CertificateC extends React.PureComponent<Props, State> {

  state = {
    certificate: null,
  }

  componentDidMount(): void {
    const { data: { userStampByHash } } = this.props;
    if (userStampByHash) {
      this.setCertificate(userStampByHash);
    }
  }

  componentDidUpdate(prevProps): void {
    const {
      handleCertificateError,
      loading,
      error,
      errors,
      data,
    } = this.props;

    if (prevProps.loading && !loading) {
      if (error || errors || !data) {
        handleCertificateError(CERTIFICATE_ERROR_MESSAGE);
        return;
      }
      const { userStampByHash } = data;
      if (!userStampByHash) {
        handleCertificateError(CERTIFICATE_ERROR_MESSAGE);
        return;
      }

      this.setCertificate(userStampByHash);
    }
  }

  setCertificate = (userStampByHash: any) => {
    const time = `${moment(userStampByHash.createdAt).local().format('MMMM Do YYYY, h:mm:ss a')} ${moment.tz(moment.tz.guess(true)).zoneAbbr()}`;
    const certificate = {
      signature: userStampByHash.stamp,
      title: userStampByHash.documentName,
      page: userStampByHash.documentPage,
      signedEmail: userStampByHash.signeeEmail,
      signedAs: userStampByHash.signeeName,
      time,
      uID: userStampByHash.stampHash,
      device: {
        browser: `${userStampByHash.browserName} Version ${userStampByHash.browserVersion}`,
        os: `${userStampByHash.osName} ${userStampByHash.osVersion}`,
        ip: userStampByHash.ipAddress,
      },
    };

    this.setState({ certificate });
  }

  render() {
    const { classes, loading } = this.props;
    const { certificate } = this.state;
    if (loading || !certificate) return <Loading message="Loading..." />;

    const { device, ...rest } = certificate;
    const mainInfo = { ...rest };
    const deviceInfo = { ...device };

    return (
      <div className={classes.certificateContent}>
        {Object.keys(mainInfo).map(infoKey => (
          <div key={infoKey} className={classes.infoBlock}>
            <div className={classes.infoTitle}>
              {labels[infoKey]}
            </div>
            <div className={classes.infoValue}>
              {infoKey !== 'signature' && mainInfo[infoKey]}
              {infoKey === 'signature' && <img src={mainInfo[infoKey]} alt="" />}
            </div>
          </div>
        ))}
        <div className={classes.divider} />
        {Object.keys(deviceInfo).map(infoKey => (
          <div key={infoKey} className={classes.infoBlock}>
            <div className={classes.infoTitle}>
              {labels[infoKey]}
            </div>
            <div className={classes.infoValue}>
              {deviceInfo[infoKey]}
            </div>
          </div>
        ))}
      </div>
    );
  }

}

export default compose(
  withUserStampByHash,
  withStyles(styles, { withTheme: true }),
)(CertificateC);
