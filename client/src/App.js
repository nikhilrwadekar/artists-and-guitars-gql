import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ApolloClient } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import Container from "@material-ui/core/Container";
import "./App.css";

import AddArtist from "./components/forms/AddArtist";
import Artists from "./components/lists/Artists";
import Title from "./components/layout/Title";
import AddInstrument from "./components/forms/AddInstrument";
import Artist from "./components/listItems/Artist";

const client = new ApolloClient({
  link: createHttpLink({ uri: "http://localhost:4000/graphql" }),
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      {/* Switch According to the Browser Link */}
      <Switch>
        {/* Main Route */}
        <Route exact path="/">
          <Container className="App">
            <Title />
            <AddArtist />
            <AddInstrument />
            <Artists />
          </Container>
        </Route>

        {/* Internal route */}
        <Route
          exact
          path="/artists/:id/"
          render={({ id }) => <Artist key={id} id={id} />}
        ></Route>
      </Switch>
    </Router>
  </ApolloProvider>
);

export default App;
