import React from 'react';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { Line } from 'react-chartjs-2';
import styles from './monthlyActiveCard.styles';
import TimePicker from './timePicker';
import { compose } from '../../../utility';
import withAnimation from './animationHoc';

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
      data: [1560, 1734, 1451, 2341, 2455, 2757, 3900, 3451, 4123, 4312, 4567, 4700],
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
  maintainAspectRatio: false,
};

const RevenueCardC = ({ classes }: { classes: Object }) => (
  <Paper className={classes.root} elevation={0}>
    <div className={classes.header}>Monthly Active Users</div>
    <TimePicker dateStart="Jan 2018" dateEnd="Dec 2018" />
    <div className={classes.chartContainer}>
      <Line data={data} options={options} />
    </div>
  </Paper>
);

export default compose(withAnimation(300), withStyles(styles))(RevenueCardC);
