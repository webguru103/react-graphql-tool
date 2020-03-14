import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';
import ConstructionIcon from './construction.svg';

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
  },
  content: {
    color: '#FF9A7A',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    minWidth: '681px',
    minHeight: '244px',
    justifyContent: 'center',
  },
  header: {
    fontSize: '36px',
    fontWeight: 'normal',
    marginBottom: '2px',
  },
  primaryText: {
    fontSize: '16px',
  },
  secondaryText: {
    fontSize: '12px',
  },
};

const UnderConstructionC = ({ primaryText, secondaryText, classes }: { primaryText?: string, secondaryText?: string, classes: Object }) => (
  <div className={classes.container}>
    <Paper elevation={0} className={classes.content}>
      <ConstructionIcon />
      <h1 className={classes.header}>Under Construction</h1>
      <div className={classes.primaryText}>{primaryText}</div>
      <div className={classes.secondaryText}>{secondaryText}</div>
    </Paper>
  </div>
);

UnderConstructionC.defaultProps = {
  primaryText: '',
  secondaryText: '',
};

export default withStyles(styles)(UnderConstructionC);
