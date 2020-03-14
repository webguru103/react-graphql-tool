import * as React from 'react';
import MaskedInput from 'react-text-mask';

type Props = {
  inputRef: React.Ref<any>,
}
const PhoneNumberInput = ({ inputRef, ...rest }: Props) => (
  <MaskedInput
    {...rest}
    ref={inputRef}
    mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
  />
);

export default PhoneNumberInput;
