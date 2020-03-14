import * as React from 'react';
import { withRouter } from 'react-router-dom';
import Tabs from './tabs';
import withOreaVerification from '../oreaValidation/withOreaVerification';
import { compose } from '../../utility';

const AccountSettingsC = () => (
  <React.Fragment>
    <Tabs />
  </React.Fragment>
);

export default compose(
  withRouter,
  withOreaVerification,
)(AccountSettingsC);
