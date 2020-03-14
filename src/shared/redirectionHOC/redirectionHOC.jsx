import * as React from 'react';

export const withRedirection = (Component: React.Element) => {
  class RedirectionHOC extends React.Component<*, *> {

    componentWillUnmount() {
      clearTimeout(this.timeout);
    }

    startRedirectTimer = (timerDuration: number, url: string, history: Object) => {
      this.timeout = setTimeout(() => {
        history.push(url);
      }, timerDuration);
    }

    timeout: TimeoutID;

    render() {
      return (
        <React.Fragment>
          <Component startRedirectTimer={this.startRedirectTimer} {...this.props} />
        </React.Fragment>
      );
    }

  }

  return RedirectionHOC;
};
