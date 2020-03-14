import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = () => ({
  root: {
    fontSize: '50px',
  },
});

class CounterC extends React.PureComponent<{ classes: Object, number: number }, { value: number }> {

  state = {
    value: 0,
  };

  componentDidMount() {
    this.ticker();
  }

  ticker = () => {
    for (let i = this.props.number >= 50 ? this.props.number - 50 : 0; i < this.props.number + 1; i += 1) {
      setTimeout(() => this.setState({ value: i }), i * 30);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>{this.state.value}</div>
    );
  }

}

export default withStyles(styles)(CounterC);
