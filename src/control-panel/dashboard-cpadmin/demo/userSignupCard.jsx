import React from 'react';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { Bar } from 'react-chartjs-2';
import styles from './userSignupCard.styles';
import TimePicker from './timePicker';
import { compose } from '../../../utility';
import withAnimation from './animationHoc';

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Sign up',
      data: [150, 270, 240, 320, 200, 250, 350, 300, 140, 290, 240, 245],
      backgroundColor: '#BDD8FF',
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
    <div className={classes.header}>User Sign Up</div>
    <TimePicker dateStart="Jan 2018" dateEnd="Dec 2018" />
    <div className={classes.chartContainer}>
      <Bar data={data} options={options} />
    </div>
  </Paper>
);

export default compose(withAnimation(200), withStyles(styles))(RevenueCardC);
