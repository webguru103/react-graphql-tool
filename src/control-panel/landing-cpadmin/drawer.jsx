import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DescriptionIcon from '@material-ui/icons/Description';
import SubjectIcon from '@material-ui/icons/Subject';
import SupervisedUserIcon from '@material-ui/icons/SupervisedUserCircle';
import LabelIcon from '@material-ui/icons/Label';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import KeyIcon from '@material-ui/icons/VpnKey';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import HomeIcon from '@material-ui/icons/Home';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { withRouter } from 'react-router';
import type { Location, RouterHistory } from 'react-router';

import { compose } from '../../utility';
import LogoSmall from '../../assets/dtlogo-small.svg';
import Logo from '../../assets/dtlogo.svg';

import styles from './drawer.styles';

const pushIfDifferent = (history, path) => {
  if (history.location.pathname !== path) {
    history.push(path);
  }
};

type PropType = {
  classes: Object,
  theme: Object,
  handleToggleDrawer: () => void,
  open: boolean,
  history: RouterHistory,
  location: Location,
}

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
        <Typography variant="subheading" classes={{ root: classes.headerText }}>Control Panel</Typography>
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
        <Typography variant="caption" classes={{ root: classes.headerText }}>Control Panel</Typography>
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
            classes={{ root: classes.listItem, divider: classes.divider }}
            button
            disableGutters
            divider
            selected={location.pathname === '/cp-user'}
            onClick={() => pushIfDifferent(history, '/cp-user')}
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
                {open ? 'Customer management' : 'CM'}
              </ListSubheader>
            )}
          >
            <ListItem
              button
              disableGutters
              className={classes.listItem}
              selected={location.pathname === '/cp-user/brokerage-management'}
              onClick={() => pushIfDifferent(history, '/cp-user/brokerage-management')}
            >
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <LocationCityIcon />
              </ListItemIcon>
              {open && <ListItemText classes={{ root: classes.listItemText, primary: classes.listItemContent }} primary="Brokerage Offices" /> }
            </ListItem>
            <ListItem
              button
              disableGutters
              className={classes.listItem}
              selected={location.pathname === '/cp-user/agent-management'}
              onClick={() => pushIfDifferent(history, '/cp-user/agent-management')}
            >
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <AccountBoxIcon />
              </ListItemIcon>
              {open && <ListItemText classes={{ root: classes.listItemText, primary: classes.listItemContent }} primary="Agent Users" /> }
            </ListItem>
            <ListItem
              button
              disableGutters
              divider
              selected={location.pathname === '/cp-user/admin-management'}
              classes={{ root: classes.listItem, divider: classes.divider }}
              onClick={() => pushIfDifferent(history, '/cp-user/admin-management')}
            >
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <ContactPhoneIcon />
              </ListItemIcon>
              {open && <ListItemText classes={{ root: classes.listItemText, primary: classes.listItemContent }} primary="Admin Users" /> }
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
                {open ? 'Data management' : 'DM'}
              </ListSubheader>
            )}
          >
            <ListItem
              classes={{ root: classes.listItem }}
              button
              disableGutters
              onClick={() => history.push('/cp-user/form-manager')}
            >
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <DescriptionIcon />
              </ListItemIcon>
              {open && <ListItemText classes={{ root: classes.listItemText, primary: classes.listItemContent }} primary="Form Manager" /> }
            </ListItem>
            <ListItem
              classes={{ root: classes.listItem }}
              button
              disableGutters
              onClick={() => history.push('/cp-user/under-construction')}
            >
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <SubjectIcon />
              </ListItemIcon>
              {open && <ListItemText classes={{ root: classes.listItemText, primary: classes.listItemContent }} primary="Clause Manager" /> }
            </ListItem>
            <ListItem
              classes={{ root: classes.listItem }}
              button
              disableGutters
              onClick={() => history.push('/cp-user/under-construction')}
            >
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <SupervisedUserIcon />
              </ListItemIcon>
              {open && <ListItemText classes={{ root: classes.listItemText, primary: classes.listItemContent }} primary="Transaction Roles" /> }
            </ListItem>
            <ListItem
              classes={{ root: classes.listItem }}
              button
              disableGutters
              onClick={() => history.push('/cp-user/under-construction')}
            >
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <LabelIcon />
              </ListItemIcon>
              {open && <ListItemText classes={{ root: classes.listItemText, primary: classes.listItemContent }} primary="Smart Labels" /> }
            </ListItem>
            <ListItem
              classes={{ root: classes.listItem, divider: classes.divider }}
              button
              disableGutters
              divider
              onClick={() => history.push('/cp-user/under-construction')}
            >
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <SettingsIcon />
              </ListItemIcon>
              {open && <ListItemText classes={{ root: classes.listItemText, primary: classes.listItemContent }} primary="Global Settings" /> }
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
                {open ? 'System management' : 'SM'}
              </ListSubheader>
            )}
          >
            <ListItem
              button
              disableGutters
              className={classes.listItem}
              selected={location.pathname === '/cp-user/cp-user-management'}
              onClick={() => pushIfDifferent(history, '/cp-user/cp-user-management')}
            >
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                <PersonIcon />
              </ListItemIcon>
              {open && <ListItemText classes={{ root: classes.listItemText, primary: classes.listItemContent }} primary="CP Users" /> }
            </ListItem>
            <ListItem
              button
              disableGutters
              divider
              classes={{ root: classes.listItem, divider: classes.divider }}
              onClick={() => history.push('/cp-user/under-construction')}
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
