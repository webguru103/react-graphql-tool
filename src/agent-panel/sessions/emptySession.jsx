import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withRouter } from 'react-router';
import type { RouterHistory } from 'react-router';
import styles from './emptySession.styles';
import NoteAdd from '../../assets/note-add.svg';
import PenIcon from '../../assets/pen.svg';
import Button from '../../shared/button/button';
import { compose } from '../../utility';
import { messages } from './constants';

type Props = {
  classes: Object,
  history: RouterHistory,
};

class EmptySessionC extends React.PureComponent<Props, null> {

  render() {
    const {
      classes,
      history,
    } = this.props;
    return (
      <Card className={classes.card}>
        <NoteAdd className={classes.screenIcon} />
        <CardContent className={classes.cardContent}>
          <div>
            {messages.NO_SIGNING_SESSIONS}
          </div>
        </CardContent>
        <CardActions className={classes.button}>
          <Button
            color="primary"
            disableFocusRipple
            onClick={() => history.push('/agent/sessions/new')}
          >
            <PenIcon className={classes.startSigningIcon} />
            {messages.START_SIGNING}
          </Button>
        </CardActions>
      </Card>
    );
  }

}

export default compose(withStyles(styles, { withTheme: true }), withRouter)(EmptySessionC);
