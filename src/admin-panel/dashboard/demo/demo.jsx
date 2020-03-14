import React from 'react';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router';
import SummaryCard from './summaryCard';
import ContactIcon from './contact.svg';
import DocumentIcon from './document.svg';
import HouseIcon from './house.svg';
import PersonIcon from './person.svg';
import TransactionsCard from './transactionsCard';
import TopAgentsCard from './topAgentsCard';
import RevenueCard from './revenueCard';
import styles from './demo.styles';
import { compose } from '../../../utility';

const DemoC = ({ classes, history }: { classes: Object, history: Object }) => (
  <div className={classes.container}>
    <div className={classes.content}>
      <SummaryCard icon={HouseIcon} number={50} text="Brokerage Offices" onClick={() => history.push('/admin/brokerage-management')} />
      <SummaryCard icon={ContactIcon} number={13} text="Admins" onClick={() => history.push('/admin/admin-management')} />
      <SummaryCard icon={PersonIcon} number={64} text="Agents" onClick={() => history.push('/admin/agent-management')} />
      <SummaryCard icon={DocumentIcon} number={15} text="New Submissions" />
      <TransactionsCard />
      <TopAgentsCard />
      <RevenueCard />
    </div>
  </div>
);

export default compose(withStyles(styles), withRouter)(DemoC);
