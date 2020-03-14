import React from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import BrokerageTable from './brokerageTable';
import styles from './adminDetails.styles';
import { compose } from '../../../utility';
import { withSnackbar } from '../../../shared/snackbar/withSnackbar';
import {
  withGetUser, withGetUserBrokerages, withGetAllBrokerages, withRemoveAdminAccess, withGrantAdminAccess,
} from '../api/admins.service';
import type { BrokerageType } from '../flowTypes';
import { AddAccessForAdmin } from '../../../shared/adminDetails';
import c from '../constants';

type PropTypes = {
  classes: Object,
  user: Object,
  refetch: Function,
  totalCount: number,
  userBrokerageAcls: Array<Object>,
  loading: boolean,
  brokerages: Array<BrokerageType>,
  grantAdminAccess: Function,
  removeAdminAccess: Function,
  createSnackbar: Function,
};

class AdminDetails extends React.PureComponent<PropTypes, null> {

  getBrokerages = () => {
    const { userBrokerageAcls, brokerages } = this.props;

    const userBrokerages = userBrokerageAcls.reduce((acc, brokerageAcl) => [...acc, brokerageAcl.brokerageByBrokerageId], []);

    const brokeragesToShow = [];

    if (userBrokerages && brokerages) {
      for (let i = 0; i < brokerages.length; i += 1) {
        let brokerageToAdd = brokerages[i];

        for (let j = 0; j < userBrokerages.length; j += 1) {
          if (brokerageToAdd.id === userBrokerages[j].id) {
            brokerageToAdd = null;
            break;
          }
        }

        if (brokerageToAdd) {
          brokeragesToShow.push(brokerageToAdd);
        }
      }
    }

    return brokeragesToShow;
  };

  onRemoveAccess = async ({ brokerageAclId }) => {
    try {
      await this.props.removeAdminAccess({ brokerageAclId });
      this.props.refetch();
      const { user: { firstName, lastName } } = this.props;
      this.props.createSnackbar(<FormattedMessage
        id="success-removed-access"
        defaultMessage="Admin {firstName} {lastName} has been removed from this brokerage office."
        values={{ firstName, lastName }}
      />);
    } catch (e) {
      this.props.createSnackbar(c.REQUEST_ERROR);
    }
  };

  grantAdminAccess = async ({ brokerageId, brokerageName }) => {
    try {
      await this.props.grantAdminAccess({
        brokerageId,
      });
      this.props.refetch();
      const { user: { firstName, lastName } } = this.props;
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
      classes, user, userBrokerageAcls, totalCount, loading,
    } = this.props;
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
            { user && `${user.firstName} ${user.lastName}` }
          </p>
          <p>
            Email
          </p>
          <p>
            { user && user.email}
          </p>
          <p>
            Phone
          </p>
          <p>
            { user && user.phone }
          </p>
          <p>
          Address
          </p>
          <p>
            {user && `${(user.unit || '')} ${(user.streetNumber || '')} ${(user.streetName || '')}
            ${(user.city || '')} ${(user.province || '')} ${(user.country || '')} ${(user.postalCode || '')}`}
          </p>
        </div>
        <Typography className={classes.header} variant="title" gutterBottom>
          Brokerage Offices
        </Typography>
        <div
          className={classes.addAccessForAdmin}
        >
          {user
          && (
            <AddAccessForAdmin
              brokerages={this.getBrokerages()}
              handleSubmit={this.grantAdminAccess}
            />
          )}
        </div>
        <BrokerageTable
          data={userBrokerageAcls}
          loading={loading}
          totalCount={totalCount}
          onRemoveAccess={this.onRemoveAccess}
          adminName={user && `${user.firstName} ${user.lastName}`}
        />
      </React.Fragment>
    );
  }

}

export default compose(
  withStyles(styles),
  withGetUser,
  withGetUserBrokerages,
  withGetAllBrokerages,
  withGrantAdminAccess,
  withRemoveAdminAccess,
  withSnackbar,
  // TODO: add withUser to get app user id
)(AdminDetails);
