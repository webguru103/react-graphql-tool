import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import type { Location, RouterHistory } from 'react-router';
import { withRouter } from 'react-router';
import styles from './tabs.styles';
import TabContentWrapper from './tabContentWrapper';
import Personal from './personal';
import Affiliation from './affiliation';
import BrokerageAssociation from './brokerageAssociation';
import { withAppUser, withUpdateUserState } from '../../shared/authorization/userConsumer';
import { compose, get } from '../../utility';
import type { AppUser } from '../../shared/authorization';
import { ROLE_CATEGORY } from '../../constants';

type Props = {
  classes: Object,
  user: AppUser,
  location: Location,
  history: RouterHistory,
  refetchUser: Function,
};

function TabContainer({ title, children }: { title: string, children: React.Element }) {
  return (
    <TabContentWrapper title={title}>{children}</TabContentWrapper>
  );
}

const findBrokerageInUserRoles = user => get(
  get(user, 'brokerageAclsByUserId.nodes', [])
    .find(acl => acl.roleCategory === ROLE_CATEGORY.AGENT),
  'brokerageByBrokerageId',
  null,
);

class TabsC extends React.Component<Props, *> {

  componentDidMount() {
    const { location, history } = this.props;
    if (!location.hash) {
      history.push('/account-settings#personal');
    }
  }

  handleChange = (event, value) => {
    this.props.history.push(`/account-settings${value}`);
  };

  updateInvites = async () => {
    await this.props.refetchUser();
  };

  render() {
    const {
      classes, user, location,
    } = this.props;

    const agentRole = user.isAgent;
    return (
      <div>
        <div
          className={agentRole ? classes.agentTabs : classes.tabs}
        >
          <Tabs
            value={location.hash}
            onChange={this.handleChange}
            fullWidth
            classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
          >
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label="Personal Information"
              value="#personal"
            />
            {
              agentRole
              && (
              <Tab
                disableRipple
                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                label="Affiliation"
                value="#affiliation"
              />
              )
            }
            {
              agentRole
              && (
              <Tab
                disableRipple
                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                label="Brokerage Office Association"
                value="#association"
              />
              )
            }
          </Tabs>
        </div>
        {location.hash === '#personal'
          && (
            <TabContainer title="Personal Information">
              <Personal user={user} />
            </TabContainer>
          )
        }
        {agentRole && location.hash === '#affiliation'
          && (
            <TabContainer title="Affiliation">
              <Affiliation affiliated={user.oreaVerified} />
            </TabContainer>
          )
        }
        {agentRole && location.hash === '#association'
          && (
            <React.Fragment>
              <TabContainer title="Brokerage Association">
                <BrokerageAssociation
                  invites={get(user, 'invitesByUserId.nodes', [])}
                  brokerage={findBrokerageInUserRoles(user)}
                  updateInvites={this.updateInvites}
                />
              </TabContainer>
            </React.Fragment>
          )
        }
      </div>
    );
  }

}

export default compose(
  withAppUser,
  withUpdateUserState,
  withStyles(styles, { withTheme: true }),
  withRouter,
)(TabsC);
