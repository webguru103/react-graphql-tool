import * as React from 'react';
import { withRouter } from 'react-router';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import Button from '../../shared/button/button';
import { messages } from '../constants';

type PropType = {
  history: Object,
  brokerageName: string,
};

const JoinedBrokerageC = ({ history, brokerageName }: PropType) => (
  <div>
    <Typography variant="title" gutterBottom>
      {messages.JOINED_BROKERAGE_OFFICE}
    </Typography>
    <Typography variant="body1" paragraph>
      <FormattedMessage
        id="joined-brokerage-message"
        defaultMessage="You have successfully joined {brokerageName} as an agent. Please log in to continue."
        values={{
          brokerageName,
        }}
      />
    </Typography>
    <Button testId="button-next" text="Login" onClick={() => history.push('/login?url=account-settings')} />
  </div>
);

export default (withRouter(JoinedBrokerageC): React.Element);
