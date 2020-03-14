import * as React from 'react';
import MaskedInput from 'react-text-mask';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import styles from './idInput.styles';

type Props = {
  classes: Object,
  defaultSignatureID: String,
  setSignatureID: Function,
}

type State = {
  signatureID: string
}

const SignatureIDMask = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[/^[A-Za-z0-9]/, /^[A-Za-z0-9]/, /^[A-Za-z0-9]/, /^[A-Za-z0-9]/, '-', /^[A-Za-z0-9]/, /^[A-Za-z0-9]/, /^[A-Za-z0-9]/, /^[A-Za-z0-9]/]}
      guide={false}
      showMask
    />
  );
};

export class SignatureIDInputC extends React.PureComponent<Props, State> {

  state = {
    signatureID: '',
  }

  componentDidMount(): void {
    const { defaultSignatureID, setSignatureID } = this.props;
    if (defaultSignatureID) {
      this.setState({ signatureID: defaultSignatureID.toUpperCase() });
      setSignatureID(defaultSignatureID.toUpperCase());
    }
  }

  handleSignatureID = (ev: SyntheticInputEvent<HTMLInputElement>) => {
    const { value: signatureID } = ev.target;
    const { setSignatureID } = this.props;
    this.setState({ signatureID: signatureID.toUpperCase() });
    setSignatureID(signatureID.toUpperCase());
  };

  render() {
    const { classes } = this.props;
    const { signatureID } = this.state;

    return (
      <FormControl className={classes.idInput}>
        <InputLabel htmlFor="signatureId" className={classes.labelText}>Signature ID</InputLabel>
        <Input
          value={signatureID}
          onChange={this.handleSignatureID}
          id="signatureId"
          placeholder="eg.ABCD-1234"
          startAdornment={<InputAdornment position="start">ID: </InputAdornment>}
          required
          fullWidth
          className={classes.inputText}
          inputComponent={SignatureIDMask}
          inputProps={{
            style: {
              width: 'auto',
            },
          }}

        />
      </FormControl>
    );
  }

}
export default withStyles(styles, { withTheme: true })(SignatureIDInputC);
