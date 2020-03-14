import * as React from 'react';
import { withRouter } from 'react-router';
import Typography from '@material-ui/core/Typography';
import Button from '../../shared/button/button';
import { messages } from '../constants';

type PropType = {
  history: Object,
};

const AlreadyJoinedABrokerageC = ({ history }: PropType) => (
  <div>
    <Typography variant="title" gutterBottom>
      {messages.ALREADY_JOINED_A_BROKERAGE_OFFICE}
    </Typography>
    <Typography variant="body1" paragraph>
      {messages.ALREADY_JOINED_A_BROKERAGE_OFFICE_MESSAGE}
    </Typography>
    <Button testId="button-next" text="Login" onClick={() => history.push('/login?url=account-settings')} />
  </div>
);

export default (withRouter(AlreadyJoinedABrokerageC): React.Element);
