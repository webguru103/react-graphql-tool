import * as React from 'react';
import { withRouter } from 'react-router';
import Typography from '@material-ui/core/Typography';
import Button from '../../shared/button/button';
import { messages } from '../constants';

type PropType = {
  history: Object,
};

const AlreadyHaveAccessC = ({ history }: PropType) => (
  <div>
    <Typography variant="title" gutterBottom>
      {messages.ALREADY_HAVE_ACCESS}
    </Typography>
    <Typography variant="body1" paragraph>
      {messages.ALREADY_HAVE_ACCESS_MESSAGE}
    </Typography>
    <Button testId="button-next" text="Login" onClick={() => history.push('/login?url=cp-user/brokerage-management')} />
  </div>
);

export default (withRouter(AlreadyHaveAccessC): React.Element);
