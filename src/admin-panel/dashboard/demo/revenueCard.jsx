import React from 'react';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { Line } from 'react-chartjs-2';
import styles from './revenueCard.styles';
import TimePicker from './timePicker';
import withCollapse from './animationHoc';
import { compose } from '../../../utility';

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Revenue',
      fill: 'start',
      lineTension: 0.3,
      backgroundColor: '#d4ffd8',
      borderColor: '#7be37b',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
      data: [56000, 248000, 10000, 230000, 240000, 140000, 390000, 290000, 230000, 300000, 110000, 457000],
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
  responsive: true,
  maintainAspectRatio: false,
};

const RevenueCardC = ({ classes }: { classes: Object }) => (
  <Paper className={classes.root} elevation={0}>
    <div className={classes.header}>Revenue</div>
    <TimePicker dateStart="Jan 2018" dateEnd="Dec 2018" />
    <div className={classes.chartContainer}>
      <Line data={data} options={options} />
    </div>
  </Paper>
);

export default compose(withCollapse(300), withStyles(styles))(RevenueCardC);
