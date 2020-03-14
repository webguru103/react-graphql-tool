import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { withRouter } from 'react-router-dom';
import type { RouterHistory } from 'react-router';
import { compose } from '../../utility';
import Logo from '../../assets/gfx-logo-dt-full.svg';
import styles from './navbar.styles';
import Button from '../../shared/button/button';
import Signature from '../../assets/signature.svg';

type PropType = {
  classes: Object,
  history: RouterHistory,
}

class Navbar extends React.PureComponent<PropType, null> {

  render() {
    const { classes, history } = this.props;
    return (
      <AppBar
        classes={{ root: classes.root }}
        elevation={0}
      >
        <Logo className={classes.logo} />
        <h1 className={classes.title}>Signing Sessions</h1>
        <Button
          color="primary"
          classes={{
            button: classes.button,
          }}
          disableFocusRipple
          onClick={() => history.push('/agent/sessions/new')}
        >
          <Signature className={classes.startSigningIcon} />
          Start Signing
        </Button>
      </AppBar>
    );
  }

}

export default compose(withStyles(styles, { withTheme: true }), withRouter)(Navbar);
