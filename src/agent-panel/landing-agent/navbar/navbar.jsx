import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withRouter, Link } from 'react-router-dom';
import type { Match, RouterHistory } from 'react-router';
import { compose } from '../../../utility';
import AccountMenu from '../../../shared/accountMenu/accountMenu';
import Logo from '../../../assets/gfx-logo-dt-full.svg';
import styles from './navbar.styles';
import { withAppUser } from '../../../shared/authorization/userConsumer';
import type { AppUser } from '../../../shared/authorization';

type PropType = {
  classes: Object,
  match: Match,
  history: RouterHistory,
  user: AppUser,
}

/* eslint quote-props: ["error", "always"] */
const tabs = {
  '0': 'agent/transactions',
  '1': 'agent/clients',
};

class Navbar extends React.PureComponent<PropType, null> {

  getTabFromRoute = () => {
    if (this.props.match) {
      const tabNumber = Object.values(tabs).indexOf(this.props.match.url.slice(1));
      if (tabNumber !== -1) {
        return tabNumber;
      }
      return false;
    }
    return false;
  };

  handleTabSwitch = (e, value) => {
    this.props.history.push(`/${tabs[value]}`);
  };

  render() {
    const { classes, user } = this.props;
    return (
      <AppBar
        classes={{ 'root': classes.root }}
        elevation={0}
      >
        <Link to="/agent/transactions">
          <Logo className={classes.logo} />
        </Link>
        <div
          className={classes.tabsContainer}
        >
          <Tabs
            value={this.getTabFromRoute()}
            onChange={this.handleTabSwitch}
            centered
            className={classes.tabs}
            classes={{
              'indicator': classes.tabIndicator,
              'flexContainer': classes.tabs,
            }}
          >
            <Tab
              disableRipple
              classes={{ 'root': classes.tabRoot, 'labelContainer': classes.tabLabelContainer }}
              label="Transactions"
            />
            <Tab
              disableRipple
              classes={{ 'root': classes.tabRoot, 'labelContainer': classes.tabLabelContainer }}
              label="Clients"
            />
          </Tabs>
        </div>
        <AccountMenu
          user={user}
        />
      </AppBar>
    );
  }

}

export default compose(withStyles(styles, { 'withTheme': true }), withRouter, withAppUser)(Navbar);
