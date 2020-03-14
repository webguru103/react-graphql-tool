import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import type { Location } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import AccountMenu from '../../../shared/accountMenu/accountMenu';
import { withAppUser } from '../../../shared/authorization/userConsumer';
import { compose } from '../../../utility';
import type { AppUser } from '../../../shared/authorization';

import styles from './navbar.styles';
import Breadcrumbs from '../../../shared/breadcrumbs/breadcrumbs';

type PropType = {
  classes: Object,
  user: AppUser,
  location: Location,
}

const Navbar = ({ classes, user, location }: PropType) => (
  <AppBar
    classes={{ root: classes.root }}
    elevation={0}
  >
    { location.pathname === '/cp-user'
      ? <span className={classes.welcomeHeader}>{`Welcome, ${user.firstName || ''}`}</span>
      : <Breadcrumbs />
    }
    <AccountMenu
      user={user}
      disableIdentitySwitch
    />
  </AppBar>
);

export default compose(withStyles(styles, { withTheme: true }), withAppUser, withRouter)(Navbar);
