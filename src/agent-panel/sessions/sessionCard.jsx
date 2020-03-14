import * as React from 'react';
import ContentLoader from 'react-content-loader';
import Cookies from 'js-cookie';
import { Card, withStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withSnackbar } from '../../shared/snackbar/withSnackbar';
import { withDialog } from '../../shared/dialog/withDialog';
import DownloadIcon from '../../assets/download.svg';
import styles from './sessionCard.styles';
import { compose } from '../../utility';
import { messages } from './constants';
import { DOWNLOAD_ENDPOINT } from '../../configurations';
import TimeCard from './timeCard';
import type { TransactionSession } from '../api/fragments/transactionSession';
import SigneeCard from './signeeCard';
import DocumentCard from './documentCard';
import EmailContentDialog from './emailContentDialog';

type Props = {
  classes: Object,
  session: TransactionSession,
  loading: boolean,
  createDialog: ({ dialogContent: React.Element }) => any,
  createSnackbar: Function,
}

type State = {
  currentlyDownloading: boolean,
}

const SessionCardLoader = () => (
  <div style={{ height: '220px', width: '746px' }}>
    <ContentLoader
      height={220}
      width={746}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="0" y="7" rx="0" ry="0" width="137" height="17" />
      <circle cx="37" cy="63" r="20" />
      <circle cx="37" cy="112" r="20" />
      <circle cx="37" cy="159" r="20" />
      <rect x="72" y="101" rx="0" ry="0" width="235" height="22" />
      <rect x="72" y="148" rx="0" ry="0" width="235" height="22" />
      <rect x="72" y="55" rx="0" ry="0" width="235" height="22" />
      <rect x="378" y="53" rx="0" ry="0" width="25" height="32" />
      <rect x="378" y="97" rx="0" ry="0" width="25" height="32" />
      <rect x="378" y="140" rx="0" ry="0" width="25" height="32" />
      <rect x="422" y="60" rx="0" ry="0" width="297" height="20" />
      <rect x="422" y="105" rx="0" ry="0" width="297" height="20" />
      <rect x="422" y="145" rx="0" ry="0" width="297" height="20" />
    </ContentLoader>
  </div>
);

class SessionCardC extends React.PureComponent<Props, State> {

  state = {
    currentlyDownloading: false,
  }

  handleClickTitle = (e) => {
    e.stopPropagation();
    this.props.createDialog({
      dialogContent: <EmailContentDialog session={this.props.session} />,
    });
  };

  downloadDocuments = () => {
    if (this.state.currentlyDownloading) {
      return;
    }
    const data = {
      transactionSessionID: this.props.session.id,
    };
    let fileName = '';
    const documents = this.props.session.docsByTransactionSessionId.nodes;
    // Downloading a .zip
    if (documents.length > 1) {
      fileName = this.props.session.emailTitle || '';
    } else if (documents[0]) {
      // Downloading just one .pdf
      fileName = documents[0].name || '';
    }

    const authToken = Cookies.get('jwt');

    if (DOWNLOAD_ENDPOINT && authToken) {
      this.toggleCurrentlyDownloading();
      fetch(DOWNLOAD_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Authorization: `JWT ${authToken}`,
        },
      })
        .then((resp) => {
          if (resp.status === 200) {
            resp.blob().then((blob) => {
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              let ext = '';
              if (blob.type.includes('pdf') && !fileName.includes('.pdf')) {
                ext = '.pdf';
              } else if (blob.type.includes('zip')) {
                ext = '.zip';
              }
              link.setAttribute('download', `${fileName}${ext}`);
              if (document.body) document.body.appendChild(link);
              link.click();
              if (document.body) document.body.removeChild(link);
            });
          } else {
            this.props.createSnackbar(messages.DOWNLOAD_ERROR, {
              timer: 5000,
            });
          }
          this.toggleCurrentlyDownloading();
        })
        .catch(() => {
          this.toggleCurrentlyDownloading();
          this.props.createSnackbar(messages.DOWNLOAD_ERROR, {
            timer: 5000,
          });
        });
    } else {
      this.toggleCurrentlyDownloading();
      this.props.createSnackbar(messages.DOWNLOAD_ERROR, {
        timer: 5000,
      });
    }
  }

  toggleCurrentlyDownloading = () => {
    this.setState({ currentlyDownloading: !this.state.currentlyDownloading });
  }

  render() {
    const {
      loading,
      classes,
      session,
    } = this.props;

    if (loading) {
      return (
        <div className={classes.cardContainer}>
          <TimeCard
            date={session.createdAt}
            loading={loading}
          />
          <Card className={classes.card}>
            <SessionCardLoader />
          </Card>
        </div>
      );
    }
    return (
      <div className={classes.cardContainer}>
        <TimeCard
          date={session.createdAt}
          loading={loading}
        />
        <Card className={classes.card}>
          <header className={classes.cardHeader}>
            <span className={classes.label}>Signing Session</span>

            { !this.state.currentlyDownloading
              ? <DownloadIcon className={classes.downloadIcon} onClick={() => this.downloadDocuments()} />
              : (
                <CircularProgress
                  variant="indeterminate"
                  value={100}
                  size={30}
                  thickness={2}
                  className={classes.loader}
                />
              )}
          </header>
          <button
            className={classes.cardTitle}
            onClick={this.handleClickTitle}
            type="button"
          >
            {session.emailTitle}
          </button>
          <div className={classes.cardContent}>
            <div className={classes.signeeContainer}>
              {
              session.sessionSigneesByTransactionSessionId.nodes.map(signee => (
                <SigneeCard
                  key={signee && signee.id}
                  signee={signee}
                />
              ))
            }
            </div>
            <div className={classes.documentContainer}>
              {
              session.docsByTransactionSessionId.nodes.map((document, idx) => (
                <DocumentCard
                  key={document && document.id}
                  sessionId={session.id}
                  document={document}
                  isEven={idx % 2 === 0}
                />
              ))
            }
            </div>
          </div>
        </Card>
      </div>
    );
  }

}

export default compose(withDialog, withSnackbar, withStyles(styles))(SessionCardC);
