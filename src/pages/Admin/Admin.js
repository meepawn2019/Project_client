import React, { useState, useEffect } from "react";
import DrawerMenu from "../../components/Drawer/DrawerMenu";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Statistics from "./Statistics/Statistics";
import User from "./Users/User";
import Question from "./Questions/Questions";
import jwt from "jsonwebtoken";
import LoadingDialog from "../../components/Modal/LoadingDialog";

export default function Admin(props) {
  let { path } = useRouteMatch();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [adminAuth, setAdminAuth] = useState(false);
  useEffect(() => {
    if (token) {
      try {
        jwt.verify(token, "Graphql_Hoova", function (err, decoded) {
          if (decoded.role === "Admin") {
            setLoading(false);
            setAdminAuth(true);
          } else {
            setLoading(false);
          }
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      setLoading(false);
    }
  }, [token]);
  if (loading) {
    return <LoadingDialog show={loading} />;
  }
  if (adminAuth) {
    return (
      <div>
        <DrawerMenu />
        <Switch>
          <Route exact path={path}>
            <Statistics />
          </Route>
          {/* <Route path={`${path}/statistics`}>
            <Statistics />
          </Route> */}
          <Route path={`${path}/users`}>
            <User />
          </Route>
          <Route path={`${path}/questions`}>
            <Question />
          </Route>
        </Switch>
      </div>
    );
  }
  return <h1>You are not authen as admin</h1>;
}
