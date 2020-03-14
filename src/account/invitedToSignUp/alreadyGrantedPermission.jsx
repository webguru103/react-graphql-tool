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

const AlreadyGrantedPermissionC = ({ history, brokerageName }: PropType) => (
  <div>
    <Typography variant="title" gutterBottom>
      {messages.ALREADY_GRANTED_PERMISSION}
    </Typography>
    <Typography variant="body1" paragraph>
      <FormattedMessage
        id="already-granted-permission-message"
        defaultMessage="It appears you have already been granted the admin permission of {brokerageName}. Please log in instead."
        values={{
          brokerageName,
        }}
      />
    </Typography>
    <Button testId="button-next" text="Login" onClick={() => history.push('/login?url=/admin/admin-management')} />
  </div>
);

export default (withRouter(AlreadyGrantedPermissionC): React.Element);
