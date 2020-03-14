// @flow

import * as React from 'react';

export function InputFilter(inputRef: React.Element) {
  return ({ filter, onChange }: { filter: {id: string, value: string}, onChange: Function }) => (
    <input ref={inputRef} type="text" value={filter ? filter.value : ''} onChange={event => onChange(event.target.value)} />
  );
}
