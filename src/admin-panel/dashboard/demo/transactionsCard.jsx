import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Doughnut } from 'react-chartjs-2';
import { withStyles } from '@material-ui/core';
import styles from './transactionsCard.styles';
import TimePicker from './timePicker';
import withCollapse from './animationHoc';
import { compose } from '../../../utility';

const data = {
  labels: [
    'Draft',
    'Negotiating',
    'Firm',
    'Closed',
  ],
  datasets: [{
    data: [23, 40, 125, 18],
    backgroundColor: [
      '#FF5879',
      '#F3A254',
      '#F8CD6B',
      '#6BBEBF',
    ],
    hoverBackgroundColor: [
      '#FF5879',
      '#F3A254',
      '#F8CD6B',
      '#6BBEBF',
    ],
  }],
};

const options = {
  animation: {
    easing: 'easeOutQuart',
    duration: '2000',
  },
};

const TransactionsCardC = ({ classes }: { classes: Object }) => (
  <Paper className={classes.root} elevation={0}>
    <div className={classes.header}>Transactions</div>
    <TimePicker dateStart="Dec 1 2018" dateEnd="Dec 31 2018" />
    <div className={classes.content}>
      <div className={classes.chart}>
        <Doughnut data={data} options={options} />
      </div>
      <div className={classes.textColumn}>
        <p className={classes.number}>206</p>
        <p className={classes.text}>Transactions</p>
      </div>
    </div>
  </Paper>
);

export default compose(withCollapse(200), withStyles(styles))(TransactionsCardC);
