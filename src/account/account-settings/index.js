import { withAppUser } from '../../shared/authorization/userConsumer';
import LandingCpAdmin from '../../control-panel';
import LandingAdmin from '../../admin-panel';
import LandingAgent from '../../agent-panel';

const AccountSettingsIndex = ({ user }, ...rest) => {
  if (user.isCpAdmin) {
    return LandingCpAdmin.AccountSettings(rest);
  }

  if (user.isAdmin) {
    return LandingAdmin.AccountSettings(rest);
  }

  return LandingAgent.AccountSettings(rest);

};

export default withAppUser(AccountSettingsIndex);
