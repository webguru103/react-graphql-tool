import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import styles from './emailValidateInput.styles';
import { withEmail } from '../api/accountService';
import { compose } from '../../utility';

const isEmailValid = (input) => {
  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(String(input).toLowerCase());
};

type PropType = {
  classes: Object,
  onSuccess: Function,
  onFailure: Function,
  value: string,
}

class EmailValidateInputC extends React.PureComponent<PropType, { value: string }> {

  state = {
    value: '',
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ value });
    const validEmail = isEmailValid(value);
    if (validEmail) {
      this.props.onSuccess(value);
    }

    if (!validEmail) {
      this.props.onFailure(value);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <TextField
        label="Email"
        className={classes.emailInput}
        value={this.state.value || this.props.value}
        onChange={this.handleChange}
        margin="normal"
        fullWidth
      />
    );
  }

}

export default compose(
  withStyles(styles),
  withEmail,
)(EmailValidateInputC);
