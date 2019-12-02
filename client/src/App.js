import React from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import Home from './Pages/Home';
import logo from './logo.svg';
import './App.css';
const httpLink = new HttpLink({
  uri: "http://graphqlserver:4000/graphql"
});
const wsLink = new WebSocketLink({
  uri: `ws://graphqlserver:4001/subscriptions`,
  options: {
    reconnect: true
  }
});
const link= split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
}

export default App;
