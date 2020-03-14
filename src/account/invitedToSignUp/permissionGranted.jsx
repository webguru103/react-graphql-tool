import * as React from 'react';
import { withRouter } from 'react-router';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import Button from '../../shared/button/button';
import { messages } from '../constants';

type PropType = {
  history: Object,
  roleName: string,
  brokerageName: string,
};

const PermissionGrantedC = ({ history, roleName, brokerageName }: PropType) => (
  <div>
    <Typography variant="title" gutterBottom>
      {messages.PERMISSION_GRANTED}
    </Typography>
    <Typography variant="body1" paragraph>
      <FormattedMessage
        id="permission-granted-message"
        defaultMessage="You have now been granted {roleName} role of {brokerageName}. Please log in instead."
        values={{
          roleName,
          brokerageName,
        }}
      />
    </Typography>
    <Button testId="button-next" text="Login" onClick={() => history.push('/login?url=/admin/admin-management')} />
  </div>
);

export default (withRouter(PermissionGrantedC): React.Element);
