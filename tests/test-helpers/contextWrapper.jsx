import React from 'react';
import { IntlProvider, intlShape } from 'react-intl';
import { shape } from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../src/startup/theme';
import client from './test-apollo-client/clientBuild';
import languages from '../../src/lang/languageSetup';

// Instantiate a single IntlProvider instance for each language
const intl = (() => {
  const providers = {};
  Object.keys(languages).forEach((item) => {
    const intlProvider = new IntlProvider({
      locale: item,
      messages: languages[item],
      textComponent: React.Fragment,
    }, {});
    providers[item] = intlProvider.getChildContext().intl;
  });

  return providers;
})();

// Instantiate router context
const router = {
  history: new BrowserRouter().history,
  route: {
    location: {},
    match: {},
  },
};

const createContext = lang => ({
  context: {
    intl: intl[lang], client, router,
  },
  childContextTypes: {
    intl: intlShape, client: shape({}), router: shape({}),
  },
});

export function shallowWrap(node, lang) {
  return shallow(node, createContext(lang));
}

export function mountWrap(node, lang) {
  const MuiWrap = () => <MuiThemeProvider theme={theme}>{node}</MuiThemeProvider>;
  return mount(<MuiWrap />, createContext(lang));
}

export const withContext = (Component) => {
  function ContextWrapperHOC(props) {
    return (
      <IntlProvider
        locale="en"
        messages={languages.en}
      >
        <MockedProvider>
          <BrowserRouter>
            <MuiThemeProvider theme={theme}>
              <Component {...props} />
            </MuiThemeProvider>
          </BrowserRouter>
        </MockedProvider>
      </IntlProvider>
    );
  }
  return ContextWrapperHOC;
};
