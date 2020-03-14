import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import { Navbar } from './navbar';
import styles from './landing.styles';

type LandingProps = {
  classes: Object,
  children: React.Element,
};

class Landing extends React.PureComponent<LandingProps, null> {

  render() {
    const {
      children, classes,
    } = this.props;
    return (
      <div className={classes.landing}>
        <Helmet titleTemplate="%s - DealTap" defaultTitle="DT40">
          <meta name="description" content="Agent Panel" />
          <title>Agent Panel</title>
        </Helmet>
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
