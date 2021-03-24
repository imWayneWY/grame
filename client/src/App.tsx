import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:5001",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route exact path='/' component={Home} />
        <Route exact path='/login'component={Login} />
      </Router>
    </ApolloProvider>
  );
}

export default App;
