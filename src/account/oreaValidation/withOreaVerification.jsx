import * as React from 'react';
import type { RouterHistory, Location, Match } from 'react-router';
import OREAValidationDialog from './index';
import { withDialog } from '../../shared/dialog/withDialog';

type PropType = {
  match: Match,
  closeDialog: Function,
  createDialog: Function,
  location: Location,
  history: RouterHistory,
  props: any,
};

export function withOreaVerificationC(Component: React.Element) {
  class OreaVerificationHOC extends React.Component<PropType> {

    componentDidMount() {
      const {
        match,
        closeDialog,
        createDialog,
        location,
        history,
      } = this.props;

      const dialogLaunch = (initialDialog) => {
        createDialog({
          dialogContent: <OREAValidationDialog
            match={match}
            initialDialog={initialDialog}
            closeDialog={closeDialog}
          />,
        });
        history.push(match.path);
      };

      if (location.search !== '') {
        const params = new URLSearchParams(location.search);
        if (params.get('Response') === 'Yes') {
          dialogLaunch('verification-success');
        } else if (params.get('Response') === 'No') {
          dialogLaunch('verification-failed');
        }
      }
    }

    oreaDialog = ({ firstLogin } = { firstLogin: false }) => {
      this.props.createDialog({
        dialogContent: <OREAValidationDialog
          match={this.props.match}
          closeDialog={this.props.closeDialog}
          firstLogin={firstLogin}
        />,
        disableClickOutside: true,
      });
    };

    render() {
      return (
        <Component {...this.props} oreaDialog={this.oreaDialog} />
      );
    }

  }
  return withDialog(OreaVerificationHOC);
}

export default withOreaVerificationC;
