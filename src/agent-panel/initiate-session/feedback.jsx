import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Helmet from 'react-helmet';
import { withRouter, Link } from 'react-router-dom';
import type { RouterHistory } from 'react-router';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { CheckCircleOutlineRounded } from '@material-ui/icons';
import { compose } from '../../utility';
import AccountMenu from '../../shared/accountMenu/accountMenu';
import Logo from '../../assets/gfx-logo-dt-full.svg';
import styles from './feedback.styles';
import Button from '../../shared/button/button';
import { withAppUser } from '../../shared/authorization/userConsumer';
import type { AppUser } from '../../shared/authorization';
import { messages } from './constants';

type PropType = {
  classes: Object,
  history: RouterHistory,
  user: AppUser,
  isCurrentUserSoleSignee: boolean,
}

class FeedbackC extends React.PureComponent<PropType, null> {

  handleClick = () => {
    this.props.history.push('/agent/sessions');
  }

  render() {
    const { classes, user, isCurrentUserSoleSignee } = this.props;
    return (
      <div className={classes.landing}>
        <Helmet titleTemplate="%s - DealTap" defaultTitle="DT40">
          <meta name="description" content="Agent Panel" />
          <title>New Session</title>
        </Helmet>
        <div className={classes.view}>
          <AppBar
            classes={{ root: classes.root }}
            elevation={0}
          >
            <Link to="/agent/sessions">
              <Logo className={classes.logo} />
            </Link>
            <p className={classes.screenTitle}>{messages.CONFIRMATION}</p>
            <AccountMenu
              user={user}
            />
          </AppBar>
          <div className={classes.viewContent}>
            <Card className={classes.card}>
              <CheckCircleOutlineRounded className={classes.screenIcon} />
              <div className={classes.titleContainer}>
                <div className={classes.cardTitle}>
                  {isCurrentUserSoleSignee
                    ? messages.DOCUMENTS_COMPLETED
                    : messages.DOCUMENTS_SENT
                  }
                </div>
              </div>
              <CardContent className={classes.cardContent}>
                <div>
                  {isCurrentUserSoleSignee
                    ? messages.DOCUMENTS_COMPLETED_NOTICE
                    : messages.DOCUMENTS_SENT_FOR_SIGNING
                  }
                </div>
              </CardContent>
              <CardActions className={classes.button}>
                <Button
                  color="primary"
                  disableFocusRipple
                  onClick={this.handleClick}
                >
                  {messages.VIEW_SIGNING_SESSIONS}
                </Button>
              </CardActions>
            </Card>
          </div>
        </div>
      </div>
    );
  }

}

export default compose(withStyles(styles, { withTheme: true }), withRouter, withAppUser)(FeedbackC);
