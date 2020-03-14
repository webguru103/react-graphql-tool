import React from 'react';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router';
import SummaryCard from './summaryCard';
import ContactIcon from './contact.svg';
import HouseIcon from './house.svg';
import PersonIcon from './person.svg';
import MonthlyActiveCard from './monthlyActiveCard';
import UserSignupCard from './userSignupCard';
import styles from './demo.styles';
import { compose } from '../../../utility';

const DemoC = ({ classes, history }: { classes: Object, history: Object }) => (
  <div className={classes.container}>
    <div className={classes.content}>
      <SummaryCard icon={HouseIcon} number={53} text="Brokerage Offices" onClick={() => history.push('/cp-user/brokerage-management')} />
      <SummaryCard icon={ContactIcon} number={75} text="Admins" onClick={() => history.push('/cp-user/admin-management')} />
      <SummaryCard icon={PersonIcon} number={64} text="Agents" onClick={() => history.push('/cp-user/agent-management')} />
      <UserSignupCard />
      <MonthlyActiveCard />
    </div>
  </div>
);

export default compose(withStyles(styles), withRouter)(DemoC);
