import * as React from 'react';
import { withStyles, AppBar } from '@material-ui/core';
import styles from './navbar.styles';

type PropType = {
  classes: Object,
  title?: string,
}

class Navbar extends React.PureComponent<PropType, null> {

  render() {
    const {
      classes, title,
    } = this.props;
    return (
      <AppBar
        classes={{ root: classes.root }}
        elevation={0}
      >
        <h1 className={classes.title}>{title}</h1>
      </AppBar>
    );
  }

}

export default withStyles(styles, { withTheme: true })(Navbar);
