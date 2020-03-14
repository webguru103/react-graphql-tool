import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import type { Match } from 'react-router';
import uuidv1 from 'uuid/v1';
import { compose, pro } from '../../utility';
import styles from './index.styles';
import MakeRequest from './makeRequest';
import CannotReach from './cannotReach';
import DoItLater from './doItLater';
import VerificationFailed from './verificationFailed';
import VerificationSuccess from './verificationSuccess';
import { withSendOREAGuid } from '../api/accountService';
import { withAppUser } from '../../shared/authorization/userConsumer';
import { OREA_VALIDATION_ENDPOINT } from '../../configurations';
import type { UserType } from '../../flowTypes';

type PropType = {
  classes: Object,
  closeDialog: Function,
  match: Match,
  initialDialog?: string,
  sendOreaGuid: Function,
  user: UserType,
  firstLogin: boolean,
}

type StateType = {
  view: string,
}

export class OREAValidationC extends React.Component<PropType, StateType> {

  static defaultProps = {
    initialDialog: 'make-request',
  };

  state = {
    view: this.props.initialDialog ? this.props.initialDialog : 'make-request',
  };

  fetchOREA = () => {
    // Test if page is live before sending POST request.
    fetch('https://www.orea.com/member-validation', { mode: 'no-cors' })
      .then(() => {
        // If page responds, assume page is live.
        // No information is returned with no-cors request to OREA.
        this.sendGuid();
      })
      .catch(() => {
        // If page cannot be fetched, send to 'cannot reach OREA' page.
        this.changeView('cannot-reach');
      });
  };

  sendGuid = async () => {
    // Send GUID to user object in our DB. Only current user has permissions to store it there.
    // Then the guid will be sent to OREA in oreaRequest POST form request, then sent back from OREA to orion.
    // When it comes back from OREA along with status of OREA membership, we can compare it to the one stored on user object.
    const guid = uuidv1();
    // TODO: Placeholder ID used - update with current user's ID (and also validate access to updateUser with JWT)
    const [err, res] = await pro(this.props.sendOreaGuid({ id: this.props.user.id, guid }));

    if (err || !res) {
      this.changeView('cannot-reach');
      return;
    }

    // Make the OREA POST request with stored guid and user ID
    this.oreaRequest(res.data.updateUser.id, guid);
  };

  testOREADown = () => {
    this.changeView('cannot-reach');
  };

  oreaRequest = (userId: string, guid: string) => {
    const { match } = this.props;

    const formData = {
      Guid: guid,
      ReturnURL: `${OREA_VALIDATION_ENDPOINT}?redirectPath=${match.path}&userId=${userId}`,
      SecurityKey: 'orea#4498',
      PartnerName: 'DealTap',
    };

    const form = document.createElement('form');
    form.style.visibility = 'hidden';
    form.method = 'post';
    form.action = 'https://www.orea.com/member-validation';
    Object.keys(formData).forEach((item) => {
      const input = document.createElement('input');
      input.style.visibility = 'hidden';
      input.name = item;
      input.value = formData[item];
      form.appendChild(input);
    });
    if (document.body) {
      document.body.appendChild(form);
    }
    form.submit();
  };

  changeView = (view: string) => {
    this.setState({
      view,
    });
  };

  renderView = (view: string) => {
    switch (view) {
      case 'make-request':
        return (
          <MakeRequest
            firstLogin={this.props.firstLogin}
            fetchOREA={this.fetchOREA}
            testOREADown={this.testOREADown}
            closeDialog={this.props.closeDialog}
            changeView={this.changeView}
          />
        );
      case 'cannot-reach':
        return <CannotReach changeView={this.changeView} />;
      case 'do-it-later':
        return <DoItLater closeDialog={this.props.closeDialog} />;
      case 'verification-failed':
        return <VerificationFailed changeView={this.changeView} />;
      case 'verification-success':
        return <VerificationSuccess closeDialog={this.props.closeDialog} />;
      default:
        return null;
    }
  };

  render() {
    const { classes } = this.props;
    const { view } = this.state;

    return (
      <div className={classes.dialogContainer}>
        {this.renderView(view)}
      </div>
    );
  }

}

export default compose(
  withStyles(styles),
  withSendOREAGuid,
  withAppUser,
)(OREAValidationC);
