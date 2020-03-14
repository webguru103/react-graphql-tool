import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import { withRouter, Link } from 'react-router-dom';
import type { RouterHistory } from 'react-router';
import { compose } from '../../utility';
import Logo from '../../assets/dt-full-white.svg';
import Icon from '../../assets/Icon404.svg';
import styles from './pageNotFound.styles';
import Button from '../button/button';

type PropType = {
  classes: Object,
  history: RouterHistory,
}

class PageNotFoundC extends React.PureComponent<PropType, null> {

  handleClick = () => {
    this.props.history.push('/');
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.landing}>
        <Helmet titleTemplate="%s - DealTap" defaultTitle="DT40">
          <meta name="description" content="Agent Panel" />
          <title>Page Not Found</title>
        </Helmet>
        <Link to="/">
          <Logo className={classes.logo} />
        </Link>
        <div className={classes.content}>
          <Icon className={classes.screenIcon} />
          <div className={classes.text}>
            {"Oops, we couldn't find what you're looking for."}
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

export default compose(withStyles(styles, { withTheme: true }), withRouter)(PageNotFoundC);
