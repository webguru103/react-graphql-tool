import * as React from 'react';
import moment from 'moment';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import type { RouterHistory } from 'react-router';
import { withGetUser, withRemoveCpUser } from '../api/cpUsers.service';
import styles from './cpUsersDetails.styles';
import { compose, get } from '../../../utility';
import { withDialog } from '../../../shared/dialog/withDialog';
import { withSnackbar } from '../../../shared/snackbar/withSnackbar';
import Button from '../../../shared/button/button';
import RemoveCPUserDialog from '../removeCpUserDialog';
import c from '../constants';

type PropType = {
  classes: Object,
  user: Object,
  createDialog: Function,
  closeDialog: Function,
  createSnackbar: Function,
  removeCpUserAccess: Function,
  history: RouterHistory,
}

type StateType = {
  error: React.Node,
}

class CpUserDetails extends React.PureComponent<PropType, StateType> {

  state = {
    error: '',
  }

  removeCpUser = async (id: string, systemAclId: String) => {
    const {
      createSnackbar, removeCpUserAccess, closeDialog, history,
    } = this.props;
    try {
      await removeCpUserAccess(id, systemAclId);
      createSnackbar(c.CP_USER_REMOVED);
      closeDialog();
      history.push('/cp-user/cp-user-management');
    } catch (err) {
      this.setState({ error: c.REQUEST_ERROR });
    }
  };

  render() {
    const { classes, user, createDialog } = this.props;
    return (
      <React.Fragment>
        <div className={classes.header}>
          <Typography variant="title">
          Basic info
          </Typography>
          <span className={classes.button}>
            <Button
              text="Remove"
              onClick={() => createDialog({
                dialogContent: <RemoveCPUserDialog
                  removeUser={this.removeCpUser}
                  userId={user && user.id}
                  systemAclId={user && get(user, 'systemAclsByUserId.nodes.0.id')}
                  error={this.state.error}
                />,
              })}
            />
          </span>
        </div>
        <div className={classes.table}>
          <p>
            Name
          </p>
          <p>
            { user && `${user.firstName} ${user.lastName}` }
          </p>
          <p>
            Email
          </p>
          <p>
            { user && user.email}
          </p>
          <p>
            Invited by
          </p>
          <p>
            <span>
              {
                user && get(user, 'invitesByUserId.nodes.0.userByRequestedById')
                  ? (`${get(user, 'invitesByUserId.nodes.0.userByRequestedById.firstName')}
                  ${get(user, 'invitesByUserId.nodes.0.userByRequestedById.lastName')}`)
                  : 'N/A'
              }
            </span>
          </p>
          <p>
            Invited At
          </p>
          <p>
            {
              user && get(user, 'invitesByUserId.nodes.0.createdAt')
                ? moment(get(user, 'invitesByUserId.nodes.0.createdAt')).format('MMMM Do YYYY, h:mm A')
                : 'N/A'
            }
          </p>
          <p>
            Last Logged In At
          </p>
          <p>
            {
              user && get(user, 'loggedInAt')
                ? moment(get(user, 'loggedInAt')).format('MMMM Do YYYY, h:mm A')
                : 'N/A'
            }
          </p>
        </div>
      </React.Fragment>
    );
  }

}

export default compose(withStyles(styles), withDialog, withSnackbar, withGetUser, withRemoveCpUser, withRouter)(CpUserDetails);
