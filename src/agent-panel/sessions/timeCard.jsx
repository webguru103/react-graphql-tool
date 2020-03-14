import React from 'react';
import ContentLoader from 'react-content-loader';
import { Card, withStyles } from '@material-ui/core';
import moment from 'moment';
import { messages } from './constants';

const styles = theme => ({
  timeCard: {
    width: '150px',
    margin: '10px 0',
    padding: ' 0 5px',
    fontSize: '12px',
    opacity: 0.5,
    font: `${theme.typography.fontFamily}`,
    backgroundColor: 'transparent',
    border: 'none',
    boxShadow: 'none',
  },
  time: {
    fontSize: '25px',
    fontWeight: 600,
  },
});

const TimeCardLoader = () => (
  <div style={{ height: '56px', width: '100px' }}>
    <ContentLoader
      height={56}
      width={100}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="0" y="8" rx="0" ry="0" width="90" height="8" />
      <rect x="0" y="28" rx="0" ry="0" width="90" height="20" />
    </ContentLoader>
  </div>
);

const TimeCardC = ({ classes, date, loading }) => {
  if (loading) {
    return (
      <Card className={classes.timeCard}>
        <TimeCardLoader />
      </Card>
    );
  }

  return (
    <Card className={classes.timeCard}>
      <div className={classes.timeTitle}>
        { messages.STARTED_AT }
      </div>
      <div className={classes.date}>
        {`${moment(date).local().format('MMMM Do YYYY (ddd)')}`}
      </div>
      <div className={classes.time}>
        {`${moment(date).local().format('h:mm A')}`}
      </div>
    </Card>
  );
};

export default withStyles(styles)(TimeCardC);
