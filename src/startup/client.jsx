import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { ApolloProvider, Query } from 'react-apollo';
import moment from 'moment';
import 'regenerator-runtime/runtime';
import { create } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName, jssPreset, MuiThemeProvider } from '@material-ui/core/styles';
import defaultTheme from './theme';
import App from '../router/app';
import getUserSettings from '../api/getUserSettings.query.graphql';
import clientBuild from './clientBuild';
import languages from '../lang/languageSetup';
import ScrollToTop from '../router/scrollToTop';
import UserProvider from '../shared/authorization/userProvider';
import DialogProvider from '../shared/dialog/dialogProvider';
import SnackbarProvider from '../shared/snackbar/snackbarProvider';
import { get } from '../utility';

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());
jss.options.insertionPoint = 'jss-insertion-point';

const themeSelector = {
  default: defaultTheme,
};

type PropType = {
  currentTheme: string,
  currentLanguage: string,
};

const AppC = ({ currentTheme, currentLanguage }: PropType) => {
  moment.locale(currentLanguage);
  return (
    <IntlProvider
      locale={currentLanguage}
      messages={languages[currentLanguage]}
    >
      <BrowserRouter>
        <ScrollToTop>
          <JssProvider jss={jss} generateClassName={generateClassName}>
            <MuiThemeProvider theme={themeSelector[currentTheme]}>
              <UserProvider>
                <SnackbarProvider>
                  <DialogProvider>
                    <App />
                  </DialogProvider>
                </SnackbarProvider>
              </UserProvider>
            </MuiThemeProvider>
          </JssProvider>
        </ScrollToTop>
      </BrowserRouter>
    </IntlProvider>
  );

};

const Client = props => (
  <Query
    query={getUserSettings}
    policy="cache-only"
  >
    {
      ({ data }) => (
        <AppC
          {...props}
          currentLanguage={get(data, 'currentLanguage.language', 'en')}
          currentTheme={get(data, 'currentTheme.theme', 'default')}
        />
      )
    }
  </Query>
);

const element = document.getElementById('mainapp');

ReactDOM.render(
  <ApolloProvider client={clientBuild}>
    <Client />
  </ApolloProvider>,
  element,
);
