import * as React from 'react';
import Loadable from 'react-loadable';
import CircularProgress from '@material-ui/core/CircularProgress';
import Landing from './landing-agent/landing';
import InitiateSession from './initiate-session/initiateSession';
import SigningSession from './signing-session/signingSession';
import Feedback from './initiate-session/feedback';
import ViewDocuments from './viewDocuments/editorContainer';
import UnderConstruction from './landing-agent/underConstruction';

const Documents = Loadable({
  loader: () => import('./document/document'),
  loading: () => <CircularProgress />,
});
const AccountSettings = Loadable({
  loader: () => import('../account/account-settings/accountSettings'),
  loading: () => <CircularProgress />,
});
const Sessions = (Loadable({
  loader: () => import('./sessions/sessions'),
  loading: () => <CircularProgress />,
}): React.Element);

const withLayout = (Component: React.Element) => function LayoutWrapper(props: any) {
  return (
    <Landing>
      <Component {...props} />
    </Landing>
  );
};

export default {
  Documents: withLayout(Documents),
  Transactions: withLayout(UnderConstruction),
  Clients: withLayout(UnderConstruction),
  AccountSettings: withLayout(AccountSettings),
  Sessions,
  Feedback,
  InitiateSession,
  SigningSession,
  ViewDocuments,
};

export { default as TransactionBreadcrumb } from './document/breadCrumb';
