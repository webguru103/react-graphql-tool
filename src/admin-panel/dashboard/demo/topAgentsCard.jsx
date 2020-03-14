import React from 'react';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { HorizontalBar } from 'react-chartjs-2';
import styles from './topAgentsCard.styles';
import TimePicker from './timePicker';
import withCollapse from './animationHoc';
import { compose } from '../../../utility';

const data = {
  labels: ['John W', 'Sam M', 'Danny L', 'Ali Z', 'Meng T', 'Stan V', 'Rob P'],
  datasets: [
    {
      backgroundColor: [
        '#FFA6D1',
        '#E3E2FF',
        '#FEFFE2',
        '#58EFA7',
        '#F5B6FF',
        '#9EFF52',
        '#69DEE5',
      ],
      borderWidth: 1,
      data: [38, 23, 19, 18, 16, 12, 7],
    },
  ],
};

const options = {
  legend: {
    display: false,
  },
  animation: {
    easing: 'easeOutQuart',
    duration: '2000',
  },
};

const TopAgentsC = ({ classes }: { classes: Object }) => (
  <Paper className={classes.root} elevation={0}>
    <div className={classes.header}>Top Performing Agents (Transactions closed)</div>
    <TimePicker dateStart="Jan 1 2018" dateEnd="Dec 31 2018" />
    <HorizontalBar
      data={data}
      options={options}
    />
  </Paper>
);

export default compose(withCollapse(200), withStyles(styles))(TopAgentsC);
