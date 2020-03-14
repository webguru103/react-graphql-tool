import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateRange from '@material-ui/icons/DateRange';
import styles from './dateInput.styles';

type Props = {
  classes: Object,
  setSigningDate: (signingDate: string) => void,
}

export class SigningDateInputC extends React.PureComponent<Props, null> {

  handleSigningDate = (ev: SyntheticInputEvent<HTMLInputElement>) => {
    const { value: signingDate } = ev.target;
    const { setSigningDate } = this.props;
    setSigningDate(signingDate);
  };

  render() {
    const { classes } = this.props;

    return (
      <TextField
        id="signingDate"
        label="Signing Date"
        InputLabelProps={{
          style: {
            color: '#3D3F43',
          },
        }}
        type="date"
        required
        margin="normal"
        fullWidth
        onChange={ev => this.handleSigningDate(ev)}
        className={classes.idInput}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DateRange />
            </InputAdornment>
          ),
          style: {
            color: '#3D3F43',
          },
        }}
      />
    );
  }

}
export default withStyles(styles, { withTheme: true })(SigningDateInputC);
