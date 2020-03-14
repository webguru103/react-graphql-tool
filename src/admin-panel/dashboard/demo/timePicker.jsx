import React from 'react';
import ArrowDownIcon from './arrowDown.svg';

const TimePicker = ({ dateStart, dateEnd }: { dateStart: string, dateEnd: string }) => (
  <span style={{ float: 'right' }}>
    {`${dateStart} ~ ${dateEnd}`}
    <ArrowDownIcon style={{ height: '10px', width: '10px', marginLeft: '5px' }} />
  </span>
);

export default TimePicker;
