import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';
import styles from './summaryCard.styles';
import Counter from './counter';
import withAnimation from './animationHoc';
import { compose } from '../../../utility';

const SummaryCardC = ({
  classes, icon, number, text, onClick,
}: { classes: Object, icon: React.Element, number: number, text: string, onClick?: Function }) => (
  <Paper className={classes.root} elevation={0} onClick={onClick}>
    <div className={classes.icon}>
      {React.createElement(icon)}
    </div>
    <div className={classes.textColumn}>
      <Counter number={number} />
      <div className={classes.text}>{text}</div>
    </div>
  </Paper>
);

SummaryCardC.defaultProps = {
  onClick: () => {},
};

export default compose(withAnimation(0), withStyles(styles))(SummaryCardC);
