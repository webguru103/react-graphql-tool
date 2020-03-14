import * as React from 'react';
import { withStyles, AppBar } from '@material-ui/core';
import classNames from 'classnames';
import Button from '../../../shared/button/button';
import Logo from '../../../assets/gfx-logo-dt-full.svg';
import styles from './signingNavbar.styles';

type PropType = {
  classes: Object,
  onClick: () => void,
  sessionStarted: boolean,
  sessionFinished: boolean,
}

const Navbar = ({
  classes, onClick, sessionStarted, sessionFinished,
}: PropType) => (
  <AppBar
    classes={{ root: classes.root }}
    elevation={0}
  >
    <Logo className={classes.logo} />
    <Button
      onClick={onClick}
      classes={{
        button: classNames(classes.button, { [classes.buttonPulsing]: !sessionStarted || sessionFinished }),
      }}
    >
      {sessionStarted ? 'Done' : 'Start'}
    </Button>
  </AppBar>
);

export default withStyles(styles, { withTheme: true })(Navbar);
