import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';

import resolvers from './resolvers';
import defaults from './defaults';

const inMemoryCache = new InMemoryCache();

const stateLink = withClientState({
  cache: inMemoryCache,
  resolvers,
  defaults,
});

const httpLink = new HttpLink({});

const link = ApolloLink.from([
  stateLink,
  httpLink,
]);

const clientBuild = new ApolloClient({
  link,
  cache: inMemoryCache,
});

export default clientBuild;
