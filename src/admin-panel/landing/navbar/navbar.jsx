import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { withRouter } from 'react-router';
import type { Location } from 'react-router';
import AccountMenu from '../../../shared/accountMenu/accountMenu';
import styles from './navbar.styles';
import { compose } from '../../../utility';
import { withAppUser } from '../../../shared/authorization/userConsumer';
import type { AppUser } from '../../../shared/authorization';
import { BreadCrumbs } from '../../../shared/breadcrumbs';

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
    { location.pathname === '/admin'
      ? <span className={classes.welcomeHeader}>{`Welcome, ${user.firstName || ''}`}</span>
      : <BreadCrumbs />
    }
    <AccountMenu
      user={user}
    />
  </AppBar>
);

export default compose(withAppUser, withStyles(styles, { withTheme: true }), withRouter)(Navbar);
