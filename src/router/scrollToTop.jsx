import * as React from 'react';
import type { Location } from 'react-router';
import { withRouter } from 'react-router';

type PropType = {
  children: React.Element,
  location: Location,
}

// React router does not automatically scroll to top on history.push.
// Wrapping MainApp in ScrollToTop ensures scroll comes back to top of window on page change.
class ScrollToTop extends React.Component<PropType, null> {

  componentWillUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }

}

export default (withRouter(ScrollToTop): React.Element);
