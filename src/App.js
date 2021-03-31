import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
// import styles from "/styles/Home.module.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./pages/Home/Profile/Profile";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-brands-svg-icons";
import {
  faInfoCircle,
  faVenusMars,
  faBirthdayCake,
  faCalenderAlt,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/profile" component={Profile}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
