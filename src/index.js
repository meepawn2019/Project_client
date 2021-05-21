import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";

import { Provider } from "react-redux";
import { createStore } from "redux";

import rootReducer from "./redux/store";

axios.defaults.baseURL = "http://localhost:3001/";

async function main() {
  const token = localStorage.getItem("token");
  const store = createStore(rootReducer);

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
      <App />,
    </Provider>,
    document.getElementById("root")
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
}

main();
