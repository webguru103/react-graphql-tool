import * as React from 'react';
import { Transition } from 'react-transition-group';
import { withStyles } from '@material-ui/core';
import classNames from 'classnames';

const duration = 1000;

const styles = {
  defaultStyle: {
    transition: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
    opacity: 0,
    top: '100px',
    position: 'relative',
  },
  transitionStylesEntering: {
    opacity: 0,
    top: '50px',
  },
  transitionStyleEntered: {
    opacity: 1,
    top: 0,
  },
};

const withCollapse = (timeout: number) => (Component: React.Element) => {
  class AnimationHOC extends React.Component<*, {in: boolean}> {

    state = {
      in: false,
    };

    componentDidMount() {
      this.setState({ in: true });
    }

    render() {
      const { classes } = this.props;
      return (
        <Transition in={this.state.in} timeout={timeout}>
          {state => (
            <Component
              {...this.props}
              classes={{
                root: classNames(
                  classes.defaultStyle,
                  state === 'entering' && classes.transitionStylesEntering,
                  state === 'entered' && classes.transitionStyleEntered,
                ),
              }}
            />
          )}
        </Transition>
      );
    }

  }

  return withStyles(styles)(AnimationHOC);
};

export default withCollapse;
