import React from 'react';
import type { Location } from 'react-router';
import UnderConstruction from '../../shared/underConstruction';
import withOreaVerification from '../../account/oreaValidation/withOreaVerification';
import { withAppUser } from '../../shared/authorization/userConsumer';
import type { AppUser } from '../../shared/authorization';
import { compose } from '../../utility';

type PropType = {
  oreaDialog: Function,
  location: Location,
  user: AppUser,
}

class TransactionsUnderConstructionC extends React.PureComponent<PropType, null> {

  componentDidMount() {
    const { oreaDialog, location: { search }, user: { oreaVerified } } = this.props;

    const urlParams = new URLSearchParams(search);
    const popup = urlParams.get('popup');

    if (popup === 'true' && !oreaVerified) {
      oreaDialog({ firstLogin: true });
    }
  }

  render() {
    return UnderConstruction.Agent();
  }

}

export default compose(withAppUser, withOreaVerification)(TransactionsUnderConstructionC);
