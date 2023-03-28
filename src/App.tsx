import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Home from "./pages/home";
import Character from "./pages/charater";
import { POKE_GQL_URL } from "./const";

const client = new ApolloClient({
  uri: POKE_GQL_URL,
  cache: new InMemoryCache({ resultCaching: true })
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/character" component={Character} />
        </Router>
      </RecoilRoot>
    </ApolloProvider>
  );
};

export default App;
