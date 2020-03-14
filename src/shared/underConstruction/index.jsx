import React from 'react';
import UnderConstruction from './underConstruction';

export default {
  Admin: () => <UnderConstruction primaryText="Meanwhile, try out the account system related pages." />,
  Agent: () => (
    <UnderConstruction
      primaryText="Meanwhile, try out the Admin panel and Control Panel features."
      secondaryText="(If you don't have access to those, request the devs)"
    />
  ),
};
