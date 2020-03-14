import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import styles from './personalInfoScreen.styles';
import Button from '../../shared/button/button';
import PhoneNumberInput from '../../shared/maskedInputs/phoneNumberInput';
import { KEY_CODE } from '../../constants';

type PropType = {
  classes: Object,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  setFirstName: Function,
  setLastName: Function,
  setPhoneNumber: Function,
  proceed: Function,
  moveBack: Function,
}

class PersonalInfoScreenC extends React.PureComponent<PropType, null> {

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyboard);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyboard);
  }

  handleKeyboard = (e) => {
    const { proceed, firstName, lastName } = this.props;
    if (e.keyCode === KEY_CODE.ENTER && (firstName && lastName)) {
      proceed();
    }
  };

  render() {
    const {
      classes, firstName, lastName, phoneNumber, setFirstName, setLastName, setPhoneNumber, proceed, moveBack,
    } = this.props;
    return (
      <div className={classes.screenContainer}>
        <p className={classes.screenTitle}>Personal Information</p>
        <TextField
          id="FirstName"
          label="First Name"
          margin="normal"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          fullWidth
          required
          data-testid="first-name"
          autoFocus
        />
        <TextField
          id="LastName"
          label="Last Name"
          margin="normal"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          required
          data-testid="last-name"
          fullWidth
        />
        <TextField
          id="phone-number"
          label="Phone Number"
          autoComplete="current-phone"
          margin="normal"
          value={phoneNumber}
          InputProps={{
            inputComponent: PhoneNumberInput,
          }}
          onChange={e => setPhoneNumber(e.target.value)}
          fullWidth
          className={classes.phoneNumber}
        />
        <div className={classes.controlButtons}>
          <span className={classes.requiredText}>* Required</span>
          <Button
            classes={{ button: classes.controlButton }}
            text="Back"
            onClick={moveBack}
            secondary
          />
          <Button
            testId="button-next"
            classes={{ button: classes.controlButton }}
            text="Next"
            disabled={!lastName || !firstName}
            onClick={proceed}
          />
        </div>
      </div>
    );
  }

}

export default withStyles(styles, { withTheme: true })(PersonalInfoScreenC);
