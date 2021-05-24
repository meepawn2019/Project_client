import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import jwt from "jsonwebtoken";
import LoadingDialog from "./components/Modal/LoadingDialog";
import Error from "./Error";

export default function PrivateRoute(props) {
  const { user, component: Component, ...rest } = props;
  const token = window.localStorage.getItem("token");
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      try {
        jwt.verify(token, "Graphql_Hoova", function (err, decoded) {
          setLoading(false);
          if (decoded.role === "Admin") {
            setAuth(true);
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
  if (auth) {
    return <Route {...rest} component={Component} exact />;
  }
  return <Error />;
}
