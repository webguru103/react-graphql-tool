import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DescriptionIcon from '@material-ui/icons/Description';
import SubjectIcon from '@material-ui/icons/Subject';
import PaymentIcon from '@material-ui/icons/Payment';
import KeyIcon from '@material-ui/icons/VpnKey';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListSubheader from '@material-ui/core/ListSubheader/ListSubheader';
import List from '@material-ui/core/List/List';
import React from 'react';
import { withRouter } from 'react-router';
import { compose } from 'react-apollo';
import type { Location, RouterHistory } from 'react-router';

import LogoSmall from '../../assets/dtlogo-small.svg';
import Logo from '../../assets/dtlogo.svg';

import styles from './drawer.styles';

type PropType = {
  classes: Object,
  theme: Object,
  handleToggleDrawer: () => void,
  open: boolean,
  history: RouterHistory,
  location: Location,
};

function DrawerC({
  classes,
  theme,
  history,
  open,
  handleToggleDrawer,
  location,
}: PropType) {
  const themeDirectionOpen = (theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />);
  const themeDirectionClosed = (theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />);
  const themeLogo = theme.custom === 'dt'
    ? (
      <div className={classes.header}>
        <Logo />
      </div>
    )
    : (
      <div className={classes.header}>
        <Typography variant="caption" classes={{ root: classes.headerText }}>DealTap 4.0</Typography>
        <Typography variant="subheading" classes={{ root: classes.headerText }}>Admin Panel</Typography>
      </div>
    );

  const themeLogoSmall = theme.custom === 'dt'
    ? (
      <div className={classes.headerClosed}>
        <LogoSmall />
      </div>
    )
    : (
      <div className={classes.headerClosed}>
        <Typography variant="caption" classes={{ root: classes.headerText }}>DT 4.0</Typography>
        <Typography variant="caption" classes={{ root: classes.headerText }}>Admin Panel</Typography>
      </div>
    );

  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.drawerInner}>
          {open ? themeLogo : themeLogoSmall}
          <ListItem
            button
            disableGutters
            divider
            classes={{ root: classes.listItem, divider: classes.divider }}
            onClick={() => history.push('/admin')}
            selected={location.pathname === '/admin'}
          >
            <ListItemIcon classes={{ root: classes.listItemIcon }}>
              <HomeIcon />
            </ListItemIcon>
            {open && <ListItemText classes={{ root: classes.listItemText, primary: classes.listItemContent }} primary="Dashboard" /> }
          </ListItem>
          <List
            component="nav"
            subheader={(
              <ListSubheader
                disableGutters
                component="div"
                className={classes.listSubheader}
              >
                {open ? 'Brokerage Management' : 'BM'}
              </ListSubheader>
            )}
          >
            <ListItem
              classes={{ root: classes.listItem }}
              button
              disableGutters
              onClick={() => history.push('/admin/brokerage-management')}
              selected={location.pathname === '/admin/brokerage-management'}
            >
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <LocationCityIcon />
              </ListItemIcon>
              {open && <ListItemText classes={{ root: classes.listItemText, primary: classes.listItemContent }} primary="Brokerage Offices" /> }
            </ListItem>
            <ListItem
              classes={{ root: classes.listItem }}
              button
              disableGutters
              onClick={() => history.push('/admin/agent-management')}
              selected={location.pathname === '/admin/agent-management'}
            >
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <AccountBoxIcon />
              </ListItemIcon>
              {open && <ListItemText classes={{ root: classes.listItemText, primary: classes.listItemContent }} primary="Agents" /> }
            </ListItem>
            <ListItem
              button
              disableGutters
              divider
              classes={{ root: classes.listItem, divider: classes.divider }}
              selected={location.pathname === '/admin/admin-management'}
              onClick={() => history.push('/admin/admin-management')}
            >
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <ContactPhoneIcon />
              </ListItemIcon>
              {open && <ListItemText classes={{ root: classes.listItemText, primary: classes.listItemContent }} primary="Admins" /> }
            </ListItem>
          </List>
          <List
            component="nav"
            subheader={(
              <ListSubheader
                disableGutters
                component="div"
                className={classes.listSubheader}
              >
                {open ? 'Data Management' : 'DM'}
              </ListSubheader>
            )}
          >
            <ListItem
              classes={{ root: classes.listItem }}
              button
              disableGutters
              onClick={() => history.push('/admin/under-construction')}
            >
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <DescriptionIcon />
              </ListItemIcon>
              {open && <ListItemText classes={{ root: classes.listItemText, primary: classes.listItemContent }} primary="Form Manager" /> }
            </ListItem>
            <ListItem
              button
              disableGutters
              classes={{ root: classes.listItem }}
              onClick={() => history.push('/admin/under-construction')}
            >
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <SubjectIcon />
              </ListItemIcon>
              {open && <ListItemText classes={{ root: classes.listItemText, primary: classes.listItemContent }} primary="Clause Manager" /> }
            </ListItem>
            <ListItem
              button
              disableGutters
              divider
              classes={{ root: classes.listItem, divider: classes.divider }}
              onClick={() => history.push('/admin/under-construction')}
            >
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <FileCopyIcon />
              </ListItemIcon>
              {open && <ListItemText classes={{ root: classes.listItemText, primary: classes.listItemContent }} primary="Template Manager" /> }
            </ListItem>
          </List>
          <List
            component="nav"
            subheader={(
              <ListSubheader
                disableGutters
                component="div"
                className={classes.listSubheader}
              >
                {open ? 'System Settings' : 'SS'}
              </ListSubheader>
            )}
          >
            <ListItem
              classes={{ root: classes.listItem }}
              button
              disableGutters
              onClick={() => history.push('/admin/under-construction')}
            >
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <PaymentIcon />
              </ListItemIcon>
              {open && <ListItemText classes={{ root: classes.listItemText, primary: classes.listItemContent }} primary="Payment & Billing" /> }
            </ListItem>
            <ListItem
              button
              disableGutters
              divider
              classes={{ root: classes.listItem, divider: classes.divider }}
              onClick={() => history.push('/admin/under-construction')}
            >
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <KeyIcon />
              </ListItemIcon>
              {open && <ListItemText classes={{ root: classes.listItemText, primary: classes.listItemContent }} primary="Permission Settings" /> }
            </ListItem>
          </List>
          <ListItem
            classes={{ root: classes.listItem }}
            button
            disableGutters
            onClick={handleToggleDrawer}
          >
            <ListItemIcon classes={{ root: classes.listItemIcon }}>
              {open ? themeDirectionOpen : themeDirectionClosed}
            </ListItemIcon>
            {open && <ListItemText classes={{ root: classes.listItemText, primary: classes.listItemContent }} primary="Hide Drawer" /> }
          </ListItem>
        </div>
      </Drawer>
    </div>
  );
}

export default compose(
  withStyles(styles, { withTheme: true }),
  withRouter,
)(DrawerC);
