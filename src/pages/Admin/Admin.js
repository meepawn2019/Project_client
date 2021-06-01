import React, { useState, useEffect } from "react";
import DrawerMenu from "../../components/Drawer/DrawerMenu";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import Statistics from "./Statistics/Statistics";
import User from "./Users/User";
import Question from "./Questions/Questions";
import LoadingDialog from "../../components/Modal/LoadingDialog";

export default function Admin(props) {
  let { path } = useRouteMatch();
  const history = useHistory();
  const { userInformation } = props;
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [adminAuth, setAdminAuth] = useState(false);
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (userInformation.role === "Admin") {
      setLoading(false);
      setAdminAuth(true);
    } else {
      console.log(userInformation.role);
      setLoading(false);
    }
  }, [token, userInformation]);

  const handleClose = () => {
    setShow(false);
    history.push("/");
  };

  if (loading) {
    return <LoadingDialog show={loading} type={"loading"} />;
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
  return (
    <LoadingDialog
      show={show}
      type={"alert"}
      content={"Your are not Authen as Admin"}
      handleClose={handleClose}
    />
  );
}
