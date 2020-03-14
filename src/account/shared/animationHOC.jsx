import * as React from 'react';
import Fade from '@material-ui/core/Fade';

const duration = 1000;

const withFade = (Component: React.Element) => {
  class AnimationHOC extends React.Component<*, {in: boolean}> {

    state = {
      in: false,
    };

    componentDidMount() {
      this.setState({ in: true });
    }

    render() {
      return (
        <Fade in={this.state.in} timeout={duration}>
          <div>
            <Component {...this.props} />
          </div>
        </Fade>
      );
    }

  }

  return AnimationHOC;
};

export default withFade;
