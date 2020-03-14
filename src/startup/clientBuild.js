import * as React from 'react';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
// import { getMainDefinition } from 'apollo-utilities';
import { HttpLink } from 'apollo-link-http';
// import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import Cookies from 'js-cookie';

import resolvers from './resolvers';
import defaults from './defaults';
import { HTTP_ENDPOINT } from '../configurations';
import { logger } from '../logger';
import { get } from '../utility';

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  resolvers,
  defaults,
});

const httpLink = new HttpLink({
  uri: HTTP_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  const params = (new URL(String(document.location))).searchParams;
  const urlToken = params.get('token') || '';
  const cookieToken = Cookies.get('jwt') || '';

  // url token has higher priority
  return {
    headers: {
      authorization: urlToken || cookieToken ? `JWT ${urlToken || cookieToken}` : '',
      ...headers,
    },
  };
});

// const wsLink = new WebSocketLink({
//   uri: WS_ENDPOINT,
//   options: {
//     reconnect: false,
//   },
// });

// const transportLink = split(
//   ({ query }) => {
//     const { kind, operation } = getMainDefinition(query);
//     return kind === 'OperationDefinition' && operation === 'subscription';
//   },
//   // wsLink,
//   httpLink,
// );

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, key, status }) => logger.log(`[GraphQL error]: Message: ${message}, Key: ${key}, Status: ${status}`));

    // If user isn't authenticated or their auth token has expired, redirect them to login
    if (get(graphQLErrors[0], 'extensions.key') === 'not.authenticated' || get(graphQLErrors[0], 'extensions.key') === 'auth.token.expired') {
      Cookies.remove('jwt');
      window.location.href = '/login';
    }

    // If any other token expires, redirect user to special link expired screen
    if (get(graphQLErrors[0], 'extensions.key') === 'token.expired') {
      Cookies.remove('jwt');
      window.location.href = '/link-expired';

    }
  }

  if (networkError) logger.log(`[Network error]: ${networkError}`);
});

const link = ApolloLink.from([
  authLink,
  stateLink,
  errorLink,
  httpLink,
]);

const clientBuild = (new ApolloClient({
  link,
  cache,
}): React.Element);

export default clientBuild;
