import * as React from 'react';
import { withStyles, AppBar, Button as MUIButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import Button from '../../shared/button/button';
import SendIcon from '../../assets/send.svg';
import styles from './navbar.styles';

type PropType = {
  classes: Object,
  onBack: () => void,
  onForward: () => void,
  title?: string,
  forwardButtonText?: string,
}

class Navbar extends React.PureComponent<PropType, null> {

  render() {
    const {
      classes, onBack, onForward, title, forwardButtonText,
    } = this.props;
    return (
      <AppBar
        classes={{ root: classes.root }}
        elevation={0}
      >
        {
          <React.Fragment>
            <MUIButton className={classes.back} onClick={onBack}>
              <ArrowBack />
            </MUIButton>
            { title && <h1 className={classes.title}>{title}</h1> }
          </React.Fragment>
        }
        <Button onClick={onForward} classes={{ button: classes.continue }}>
          {forwardButtonText === 'Send' && <SendIcon className={classes.send} />}
          {forwardButtonText || 'Continue'}
        </Button>
      </AppBar>
    );
  }

}

export default withStyles(styles, { withTheme: true })(Navbar);
