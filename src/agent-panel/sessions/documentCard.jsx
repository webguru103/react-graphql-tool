import React from 'react';
import { withStyles } from '@material-ui/core';
import classNames from 'classnames';
import DocIcon from '@material-ui/icons/Description';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Cookies from 'js-cookie';
import { withSnackbar } from '../../shared/snackbar/withSnackbar';
import DownloadIcon from '../../assets/download.svg';
import { stringTruncateWithEllipsis, compose } from '../../utility';
import type { DocBasic } from '../api/fragments/doc';
import { messages } from './constants';
import { DOWNLOAD_ENDPOINT } from '../../configurations';

type Props = {
  classes: Object,
  sessionId: number,
  document: DocBasic,
  isEven: boolean,
  createSnackbar: Function,
}

type State = {
  currentlyDownloading: boolean,
}

const DOC_NAME_LENGTH = 50;
const styles = theme => ({
  document: {
    display: 'flex',
    width: '100%',
    '&:hover $dlIcon': {
      opacity: 1,
    },
    height: 36,
    alignItems: 'center',
  },
  isEven: {
    backgroundColor: theme.palette.backgrounds.main,
  },
  docIcon: {
    width: '30px',
    float: 'left',
    opacity: 0.7,
    padding: '0 10px',
    color: theme.palette.neutrals.tertiaryGrey,
  },
  docTitle: {
    color: theme.palette.neutrals.mainText,
    fontSize: '12px',
    margin: 'auto 0',
    textDecoration: 'none',
  },
  dlIcon: {
    width: '30px',
    float: 'right',
    marginRight: '5px',
    marginLeft: 'auto',
    opacity: 0,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  tooltip: {
    minWidth: 'fit-content',
    overflowWrap: 'break-word',
    wordBreak: 'break-all',
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: theme.palette.primary.main,
  },
  hide: {
    display: 'none',
  },
  loader: {
    color: theme.palette.primary.main,
    float: 'right',
    marginRight: '5px',
    marginLeft: 'auto',
  },
});

// TODO: Replace usage of tooltip in codebase with ellipsis component.
class DocumentCardC extends React.PureComponent<Props, State> {

  state = {
    currentlyDownloading: false,
  }

  downloadDocument = () => {
    if (this.state.currentlyDownloading) {
      return;
    }
    const data = {
      documentID: this.props.document.id,
    };
    const fileName = this.props.document.name || '';
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
              if (!fileName.includes('.pdf')) {
                ext = '.pdf';
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
      sessionId,
      document,
      classes,
      isEven,
    } = this.props;

    return (
      <div key={document.id} className={classNames(classes.document, { [classes.isEven]: isEven })}>
        <Tooltip
          title={document.name}
          classes={{
            tooltip: (document.name && document.name.length > DOC_NAME_LENGTH) ? classes.tooltip : classes.hide,
          }}
        >
          <div className={classes.document}>
            <DocIcon className={classes.docIcon} />
            <Link
              to={
                `/view/${sessionId}/${document.id}`
              }
              target="_blank"
              className={classes.docTitle}
            >
              { document.name && stringTruncateWithEllipsis(document.name, DOC_NAME_LENGTH) }
            </Link>
            { !this.state.currentlyDownloading
              ? <DownloadIcon className={classes.dlIcon} onClick={this.downloadDocument} />
              : (
                <CircularProgress
                  variant="indeterminate"
                  value={100}
                  size={30}
                  thickness={2}
                  className={classes.loader}
                />
              )}
          </div>
        </Tooltip>
      </div>
    );
  }

}

export default compose(withSnackbar, withStyles(styles))(DocumentCardC);
