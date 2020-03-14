import React from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import BrokerageTable from './brokerageTable';
import styles from './adminDetails.styles';
import {
  withGetUser, withGetAdminUserBrokerages, withRemoveAdminAccess, withGrantAdminAccess,
} from '../../api/admin.service';
import type { BrokerageType } from '../../flowTypes';
import c from '../constants';
import { withAppUser } from '../../../shared/authorization/userConsumer';
import { compose, get } from '../../../utility';
import { withSnackbar } from '../../../shared/snackbar/withSnackbar';
import { withDialog } from '../../../shared/dialog/withDialog';
import { AddAccessForAdmin } from '../../../shared/adminDetails';
import { ROLE_CATEGORY } from '../../../constants';

type PropType = {
  classes: Object,
  targetUser: Object,
  refetch: Function,
  brokerageAclsCount: number,
  adminUserBrokerageAcls: Array<Object>,
  loading: boolean,
  grantAdminAccess: Function,
  removeAdminAccess: Function,
  createSnackbar: Function,
  user: Object,
};

type StateType = {
  brokerages: Array<BrokerageType>,
};

export class AdminDetailsC extends React.PureComponent<PropType, StateType> {

  state = {
    brokerages: [],
  };

  componentDidMount() {
    if (this.props.adminUserBrokerageAcls.length) {
      this.setState({ brokerages: this.getBrokeragesDiff() });
    }
  }

  componentDidUpdate(prevProps: PropType) {
    if (prevProps.adminUserBrokerageAcls !== this.props.adminUserBrokerageAcls
      || get(prevProps, 'user.brokerageAclsByUserId.nodes') !== get(this.props, 'user.brokerageAclsByUserId.nodes')
    ) {
      this.setState({
        brokerages: this.getBrokeragesDiff(),
      });
    }
  }

  getBrokeragesDiff = () => {
    const { adminUserBrokerageAcls, user: appUser } = this.props;

    const brokeragesToShow = [];

    if (
      adminUserBrokerageAcls
      && appUser && get(appUser, 'brokerageAclsByUserId.nodes')
    ) {

      const appUserBrokerages = get(appUser, 'brokerageAclsByUserId.nodes', [])
        .filter(brokerageAcl => brokerageAcl.roleCategory === ROLE_CATEGORY.ADMIN)
        .reduce((acc, brokerageAcl) => [...acc, brokerageAcl.brokerageByBrokerageId], []);

      // TODO get only the brokerages which the app user is admin of?
      // TODO Or will the backend know to return just the ones the app user has permission to see?
      const adminUserBrokerages = adminUserBrokerageAcls.reduce((acc, brokerageAcl) => [...acc, brokerageAcl.brokerageByBrokerageId], []);

      if (appUserBrokerages && adminUserBrokerages) {
        for (let i = 0; i < appUserBrokerages.length; i += 1) {
          let brokerageToAdd = appUserBrokerages[i];

          for (let j = 0; j < adminUserBrokerages.length; j += 1) {
            if (get(brokerageToAdd, 'id') === get(adminUserBrokerages[j], 'id')) {
              brokerageToAdd = null;
              break;
            }
          }

          if (brokerageToAdd) {
            brokeragesToShow.push(brokerageToAdd);
          }
        }
      }
    }

    return brokeragesToShow;
  };

  onRemoveAccess = async ({ brokerageAclId }: { brokerageAclId: number } = {}) => {
    try {
      await this.props.removeAdminAccess({ brokerageAclId });
      await this.props.refetch();

      const { targetUser: { firstName, lastName } } = this.props;
      this.props.createSnackbar(<FormattedMessage
        id="success-removed-access"
        defaultMessage="Admin {firstName} {lastName} has been removed from this brokerage office."
        values={{ firstName, lastName }}
      />);

    } catch (e) {
      this.props.createSnackbar(c.REQUEST_ERROR);
    }
  };

  grantAdminAccess = async ({ brokerageId, brokerageName }: { brokerageId: number, brokerageName: string } = {}) => {
    try {
      await this.props.grantAdminAccess({
        brokerageId,
      });
      await this.props.refetch();
      const { targetUser: { firstName, lastName } } = this.props;
      this.props.createSnackbar(<FormattedMessage
        id="success-added-access"
        defaultMessage="Admin access to {brokerageName} granted to {firstName} {lastName}."
        values={{ brokerageName, firstName, lastName }}
      />);
    } catch (e) {
      this.props.createSnackbar(c.REQUEST_ERROR);
    }
  };

  render() {
    const {
      classes, targetUser, adminUserBrokerageAcls, brokerageAclsCount, loading,
    } = this.props;
    const { brokerages } = this.state;
    return (
      <React.Fragment>
        <Typography className={classes.header} variant="title" gutterBottom>
          Basic info
        </Typography>
        <div className={classes.basicInfo}>
          <p>
            Name
          </p>
          <p>
            { targetUser && `${targetUser.firstName} ${targetUser.lastName}` }
          </p>
          <p>
            Email
          </p>
          <p>
            { targetUser && targetUser.email}
          </p>
          <p>
            Phone
          </p>
          <p>
            { targetUser && targetUser.phone }
          </p>
        </div>
        <Typography className={classes.header} variant="title" gutterBottom>
          Brokerage Offices
        </Typography>
        <div
          className={classes.addAccessForAdmin}
        >
          {targetUser && !!brokerages.length
          && (
            <AddAccessForAdmin
              brokerages={brokerages}
              handleSubmit={this.grantAdminAccess}
            />
          )}
        </div>
        <BrokerageTable
          data={adminUserBrokerageAcls}
          loading={loading}
          totalCount={brokerageAclsCount}
          onRemoveAccess={this.onRemoveAccess}
          adminName={targetUser && `${targetUser.firstName} ${targetUser.lastName}`}
        />
      </React.Fragment>
    );
  }

}

export default compose(
  withStyles(styles),
  withAppUser,
  withGetUser,
  withGetAdminUserBrokerages,
  withGrantAdminAccess,
  withRemoveAdminAccess,
  withDialog,
  withSnackbar,
)(AdminDetailsC);
