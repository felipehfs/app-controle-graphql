import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes';
import ApolloClient  from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  connectToDevTools: true
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
}

export default App;
