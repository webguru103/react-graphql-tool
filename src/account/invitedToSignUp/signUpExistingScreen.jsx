import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '../../shared/button/button';
import withFade from '../shared/animationHOC';
import styles from './signUpExistingScreen.styles';
import { compose } from '../../utility';
import SignUpAs from '../shared/signUpAs';
import type { RoleType } from '../../flowTypes';
import { messages } from '../constants';
import { KEY_CODE } from '../../constants';

type PropType = {
  role: RoleType,
  brokerageName: string,
  proceed: Function,
  classes: Object,
}

class SignUpExistingScreenC extends React.PureComponent<PropType, *> {

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyboard);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyboard);
  }

  handleKeyboard = (e) => {
    if (e.keyCode === KEY_CODE.ENTER) {
      this.handleSubmit();
    }
  };

  handleSubmit = async () => {
    this.props.proceed();
  };

  render() {
    const {
      classes, role, brokerageName,
    } = this.props;
    // TODO Switch to role category id???
    return (
      <div className={classes.screenContainer}>
        <div className={classes.headerSection}>
          <Typography variant="title" gutterBottom>{messages.SIGN_UP}</Typography>
          <Typography className={classes.headerTitle}>{messages.INVITED_TO_SIGN_UP_AS}</Typography>
          <Typography className={classes.headerContent}>
            {
              <SignUpAs role={role} brokerageName={brokerageName} />
            }
          </Typography>
        </div>
        <div className={classes.controlButtons}>
          <Button classes={{ button: classes.controlButton }} text="Continue" onClick={this.handleSubmit} />
        </div>
      </div>
    );
  }

}

export default compose(withFade, withStyles(styles, { withTheme: true }))(SignUpExistingScreenC);
