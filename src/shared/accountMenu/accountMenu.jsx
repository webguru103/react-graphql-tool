import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core';

import TriangleDown from './icons/ic-triangle-down.svg';
import TriangleUp from './icons/ic-triangle-up.svg';

import styles from './accountMenu.styles';
import { withAppUser } from '../authorization/userConsumer';
import { compose } from '../../utility';
import type { AppUser } from '../authorization';

type PropType = {
  classes: Object,
  user: AppUser,
}

class AccountMenu extends React.PureComponent<PropType, { open: boolean }> {

  state = {
    open: false,
  };

  anchorEl = null;

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = (event) => {
    if (this.anchorEl && this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { user, classes } = this.props;

    return (
      <div>
        <Button
          buttonRef={(ref) => {
            this.anchorEl = ref;
          }}
          aria-owns={this.state.open ? 'menu-list-grow' : null}
          aria-haspopup="true"
          onClick={this.handleToggle}
          disableRipple
        >
          <span className={classes.userName}>{`${user.firstName || ''} ${user.lastName || ''}`}</span>
          <Avatar
            className={classes.avatar}
            src=""
            // TODO get user image from user object
          />
          {
            (user.datzUserId || user.isAdmin || user.isCpAdmin)
            && (this.state.open ? <TriangleUp className={classes.icon} /> : <TriangleDown className={classes.icon} />)
          }
        </Button>
        <Popper open={this.state.open} anchorEl={this.anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="account-menu"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList
                    className={classes.dropDownMenu}
                  >
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.menuItemLink}
                      component={Link}
                      to="/account-settings"
                    >
                        Account Settings
                    </MenuItem>
                    {
                        user.isAgent && (user.isAdmin || user.isCpAdmin)
                        && (
                          <MenuItem
                            onClick={this.handleClose}
                            className={classes.menuItemLink}
                            component={Link}
                            to="/agent/sessions"
                          >
                            Agent Panel
                          </MenuItem>
                        )
                      }
                    {
                        user.isAdmin && (user.isAgent || user.isCpAdmin)
                        && (
                          <MenuItem
                            onClick={this.handleClose}
                            className={classes.menuItemLink}
                            component={Link}
                            to="/admin"
                          >
                            Admin Panel
                          </MenuItem>
                        )
                      }
                    {
                        user.isCpAdmin && (user.isAgent || user.isAdmin)
                        && (
                          <MenuItem
                            onClick={this.handleClose}
                            className={classes.menuItemLink}
                            component={Link}
                            to="/cp-user"
                          >
                            Control Panel
                          </MenuItem>
                        )
                      }
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.menuItemLink}
                      component={Link}
                      to="/logout"
                    >
                        Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }

}

export default compose(withAppUser, withStyles(styles, { withTheme: true }))(AccountMenu);
