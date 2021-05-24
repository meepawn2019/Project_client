import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
// import { ApolloProvider } from "react-apollo";
import { ApolloProvider } from "@apollo/client/react";
import { setContext } from "@apollo/client/link/context";
import { Provider } from "react-redux";
import store from "./store";

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});
const token = localStorage.getItem("token");
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ addTypename: false }),
});

axios.defaults.baseURL = "http://localhost:3001/";
ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
