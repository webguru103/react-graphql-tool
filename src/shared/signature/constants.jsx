import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export const messages = {
  DISCLAIMER: ({ link1 }: { link1: React.Element }) => (
    <FormattedMessage
      id="disclaimer"
      defaultMessage="By clicking Confirm, I agree that have read, understood
      and agreed to {link1}. I hereby acknowledge and agree
      that my electronic signature and initials shall have the same force and
      effect as my written signature or initial."
      values={{
        link1,
      }}
    />
  ),
  DRAW_SIGNATURE: <FormattedMessage id="draw-signature" defaultMessage="Please draw your signature" />,
  DRAW_INITIALS: <FormattedMessage id="draw-initials" defaultMessage="Please draw your initials" />,
  NAME_TOO_LONG: <FormattedMessage id="full-name-too-long" defaultMessage="Name is too long" />,
  INITIALS_TOO_LONG: <FormattedMessage id="initials-too-long" defaultMessage="Initials too long" />,
  USE_THESE_STAMPS: <FormattedMessage id="use-these-stamp" defaultMessage="Use Current" />,
  CREATE_NEW_STAMPS: <FormattedMessage id="create-new-stamps" defaultMessage="Create New" />,
  DRAW_SIGNATURE_HERE: <FormattedMessage id="draw-signature-here" defaultMessage="Draw Signature Here" />,
  DRAW_INITIAL_HERE: <FormattedMessage id="draw-initial-here" defaultMessage="Draw Initial Here" />,
};
