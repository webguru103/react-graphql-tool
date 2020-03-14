import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import { Navbar } from './navbar';
import styles from './landing.styles';
import Drawer from './drawer';

type LandingProps = {
  classes: Object,
  children: React.Element,
};

class Landing extends React.PureComponent<LandingProps, {open: boolean}> {

  state = {
    open: true,
  };

  handleToggleDrawer = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

  render() {
    const {
      children, classes,
    } = this.props;
    return (
      <div className={classes.landing}>
        <Helmet titleTemplate="%s - DealTap" defaultTitle="DT40">
          <meta name="description" content="Admin Panel" />
          <title>Admin Panel</title>
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

export default withStyles(styles, { withTheme: true })(Landing);
