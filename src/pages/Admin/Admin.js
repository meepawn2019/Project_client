import React from "react";
import DrawerMenu from "../../components/Drawer/DrawerMenu";
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Statistics from "./Statistics/Statistics";
import User from "./Users/User";

export default function Admin() {
  let { path } = useRouteMatch();
  return (
    <div>
      <DrawerMenu />
      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${path}/statistics`}>
          <Statistics />
        </Route>
        <Route path={`${path}/users`}>
          <User />
        </Route>
        <Route path={`${path}/questions`}>
          <h4>TEST</h4>
        </Route>
      </Switch>
    </div>
  );
}
