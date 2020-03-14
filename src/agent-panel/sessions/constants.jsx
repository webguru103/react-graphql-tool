import { FormattedMessage } from 'react-intl';
import * as React from 'react';

export const messages = {
  DOWNLOAD_ERROR: <FormattedMessage id="download-error" defaultMessage="Failed to download document(s)" />,
  NO_SIGNING_SESSIONS: <FormattedMessage id="no-signing-sessions" defaultMessage="You have no signing sessions yet." />,
  START_SIGNING: <FormattedMessage id="start-signing" defaultMessage="Start Signing" />,
  STARTED_AT: <FormattedMessage id="started-at" defaultMessage="Started" />,
  COMPLETED: <FormattedMessage id="card-completed" defaultMessage="Completed" />,
  VIEWED: <FormattedMessage id="card-viewed" defaultMessage="Viewed" />,
  NOT_VIEWED: <FormattedMessage id="card-not-viewed" defaultMessage="Not Viewed" />,
};
