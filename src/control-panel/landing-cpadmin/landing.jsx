import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import Helmet from 'react-helmet';
import { Navbar } from './navbar';
import Drawer from './drawer';
import styles from './landing.styles';

class LandingC extends React.Component<{children: React.Element, classes: Object}, { open: boolean }> {

  state = {
    open: true,
  };

  handleToggleDrawer = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

  render() {
    const { children, classes } = this.props;
    return (
      <div className={classes.root}>
        <Helmet titleTemplate="%s - DealTap" defaultTitle="Dealtap">
          <meta name="description" content="Control Panel Dashboard" />
          <title>Control Panel</title>
        </Helmet>
        <div className={classNames(classes.drawer, !this.state.open && classes.drawerClosed)}>
          <Drawer
            handleToggleDrawer={this.handleToggleDrawer}
            open={this.state.open}
          />
        </div>
        <div className={classes.view}>
          <Navbar />
          <div className={classes.viewContent}>
            {children}
          </div>
        </div>
      </div>
    );
  }

}

export default withStyles(styles)(LandingC);
