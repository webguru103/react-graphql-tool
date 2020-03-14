import * as React from 'react';

const Filter = (withRef: (React.Element, string) => void) => ({ onChange, column }: { onChange: (string) => void, column: Object }) => (
  <input ref={r => withRef(r, column.id)} onChange={e => onChange(e.target.value)} />
);

export default Filter;
