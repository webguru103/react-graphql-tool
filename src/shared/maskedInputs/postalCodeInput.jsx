import * as React from 'react';
import MaskedInput from 'react-text-mask';

type Props = {
  inputRef: React.Ref<any>,
}
const PostalCodeInput = ({ inputRef, ...rest }: Props) => (
  <MaskedInput
    {...rest}
    ref={inputRef}
    mask={[/[A-Z]/i, /\d/, /[A-Z]/i, ' ', /\d/, /[A-Z]/i, /\d/]}
  />
);

export default PostalCodeInput;
