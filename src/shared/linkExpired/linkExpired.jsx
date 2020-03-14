import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import { withRouter, Link } from 'react-router-dom';
import type { RouterHistory } from 'react-router';
import { compose } from '../../utility';
import Logo from '../../assets/dt-full-white.svg';
import Icon from '../../assets/link-expired.svg';
import styles from './linkExpired.styles';
import Button from '../button/button';

type PropType = {
  classes: Object,
  history: RouterHistory,
}

class LinkExpiredC extends React.PureComponent<PropType, null> {

  handleClick = () => {
    this.props.history.push('/');
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.landing}>
        <Helmet titleTemplate="%s - DealTap" defaultTitle="DT40">
          <meta name="description" content="Agent Panel" />
          <title>Link Expired</title>
        </Helmet>
        <Link to="/">
          <Logo className={classes.logo} />
        </Link>
        <div className={classes.content}>
          <Icon className={classes.screenIcon} />
          <div className={classes.text}>
            {'Oops, looks like the link you used has expired.'}
          </div>
          <Button
            classes={{ button: classes.button }}
            color="primary"
            disableFocusRipple
            onClick={this.handleClick}
          >
            Back to Home Page
          </Button>
        </div>
      </div>
    );
  }

}

export default compose(withStyles(styles, { withTheme: true }), withRouter)(LinkExpiredC);
