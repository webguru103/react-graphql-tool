import * as React from 'react';
import { withRouter } from 'react-router';
import Typography from '@material-ui/core/Typography';
import Button from '../../shared/button/button';
import { messages } from '../constants';

type PropType = {
  history: Object,
  error: React.Node,
};

const FailedToJoinBrokerageC = ({ history, error }: PropType) => (
  <div>
    <Typography variant="title" gutterBottom>
      {messages.FAILED_TO_JOIN_BROKERAGE}
    </Typography>
    <Typography variant="body1" paragraph>
      {error}
    </Typography>
    <Button testId="button-next" text="Login" onClick={() => history.push('/login?url=account-settings')} />
  </div>
);

export default (withRouter(FailedToJoinBrokerageC): React.Element);
