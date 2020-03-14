import React from 'react';
import type { RouterHistory } from 'react-router';
import { withRouter } from 'react-router';
import { withUpdateUserState } from '../shared/authorization/userConsumer';
import { compose } from '../utility';

type PropType = {
  clearUser: () => {},
  history: RouterHistory
}

class Logout extends React.PureComponent<PropType, null> {

  componentDidMount() {
    this.props.clearUser();
    this.props.history.push('/login');
  }

  render() {
    return null;
  }

}

export default compose(withRouter, withUpdateUserState)(Logout);
