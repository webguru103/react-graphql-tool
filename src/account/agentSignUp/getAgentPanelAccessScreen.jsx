import * as React from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { compose, get } from '../../utility';
import Button from '../../shared/button/button';
import { messages } from '../constants';
import { withUpdateUser } from '../api/accountService';
import {
  ROLE_ID, ROLE_CATEGORY, RESOURCE_CATEGORY, SYSTEM_ID, KEY_CODE,
} from '../../constants';
import styles from './getAgentPanelAccessScreen.styles';
import { errParser } from '../../api-error-parser';
import { withUpdateUserState } from '../../shared/authorization/userConsumer';

type PropType = {
  classes: Object,
  updateUser: Function,
  proceed: Function,
  existingUserId: boolean,
  refetchUser: Function,
};

type StateType = {
  error: React.Node,
};

class GetAgentPanelAccessScreenC extends React.PureComponent<PropType, StateType> {

  state = {
    error: '',
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyboard);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyboard);
  }

  handleKeyboard = (e) => {
    if (e.keyCode === KEY_CODE.ENTER) {
      this.props.proceed();
    }
  };

  handleConfirm = async () => {

    try {
      await this.props.updateUser({
        id: this.props.existingUserId,
        user: {
          systemAcls: [
            {
              roleId: ROLE_ID.AGENT,
              roleCategory: ROLE_CATEGORY.AGENT,
              resourceCategory: RESOURCE_CATEGORY.SYSTEM,
              systemId: SYSTEM_ID.AGENT_PANEL,
            },
          ],
        },
      });
      this.props.proceed();
    } catch (err) {
      const parsedErr = errParser.parse(err);
      this.setState({ error: get(parsedErr, 'global') });
    }

    this.props.refetchUser();

  };

  render() {
    const { classes } = this.props;
    const { error } = this.state;
    return (
      <div className={classes.screenContainer}>
        <Typography variant="title" gutterBottom>
          {messages.GET_AGENT_PANEL_ACCESS}
        </Typography>
        <Typography variant="body1" paragraph>
          {messages.GET_AGENT_PANEL_ACCESS_MESSAGE}
        </Typography>
        {
          Boolean(error)
          && (
            <FormControl classes={{ root: classes.errorWrapper }} error={Boolean(error)}>
              <FormHelperText classes={{ root: classes.helperText, error: classes.errorMessage }}>{error}</FormHelperText>
            </FormControl>
          )
        }
        <Button testId="button-confirm" text="Confirm" onClick={this.handleConfirm} />
      </div>
    );
  }

}

export default compose(
  withStyles(styles, { withTheme: true }),
  withUpdateUser,
  withUpdateUserState,
)(GetAgentPanelAccessScreenC);
