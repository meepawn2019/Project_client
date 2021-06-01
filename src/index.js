import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";

import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./redux/store";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { setContext } from "@apollo/client/link/context";

axios.defaults.baseURL = "http://localhost:3002/";

async function main() {
  const token = localStorage.getItem("token");
  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  const httpLink = createHttpLink({
    uri: "http://localhost:3001/graphql",
  });
  const tokenAuth = localStorage.getItem("tokenAuth");
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: tokenAuth ? `Bearer ${tokenAuth}` : "",
      },
    };
  });
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({ addTypename: false }),
  });
  if (token) {
    let auth = await axios
      .get("/checkAuthState", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((e) => {
        console.log(e);
        return { data: { user: {} } };
      });
    let user = auth.data.user;
    store.dispatch({
      type: "LOAD_CURRENT_USER",
      payload: {
        user: user || {},
      },
    });
  }

  ReactDOM.render(
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />,
      </ApolloProvider>
    </Provider>,
    document.getElementById("root")
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
}

main();
