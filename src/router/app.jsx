import React from 'react';
import Helmet from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import styles from './app.styles';
import Routes from './routes';
import { GTMID, ENVIRONMENT } from '../configurations';
import Footer from '../shared/footer/footer';
import { compose } from '../utility';
import { ENVIRONMENTS } from '../constants';

type PropType = {
  gtmId: string,
}

const GoogleTagManager = ({ gtmId }: PropType) => (
  <noscript>
    <iframe
      title="google-tag-manager"
      src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
      height="0"
      width="0"
      style={{ display: 'none', visibility: 'hidden' }}
    />
  </noscript>
);

const App = () => (
  <React.Fragment>
    <Helmet>
      <script type="text/javascript">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTMID}');
        `}
      </script>
      <meta charSet="utf-8" />
      <meta name="description" content="Customer Site" />
      <title>DealTap </title>
    </Helmet>
    <GoogleTagManager
      gtmId={GTMID}
    />
    <Routes />
    { ((ENVIRONMENT !== ENVIRONMENTS.PROD) && (ENVIRONMENT !== ENVIRONMENTS.DEV)) && <Footer />}
  </React.Fragment>
);

export default compose(
  withStyles(styles, { withTheme: true }),
  DragDropContext(HTML5Backend),
)(App);
