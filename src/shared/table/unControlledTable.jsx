import React from 'react';
import BaseTable from './baseTable';

const UnControlledTable = (props: any) => (
  <BaseTable
    {...props}
    manual={false}
    totalAmount={props.data && props.data.length}
  />
);

export default UnControlledTable;
