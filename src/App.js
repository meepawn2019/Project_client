import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Setting from "./pages/Setting";
import Question from "./pages/Question/Question";
import AuthContext from "./appContext";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import Tempp from "./components/Modal/Tempp";
import QuestionModal from "./components/Modal/QuestionModal";
import AnswerBox from "./components/AnswerBox/AnswerBox";
// import QuestionModal from "./components/Modal/QuestionModal";
import Answer from "./pages/Answer/Answer";
import Admin from "./pages/Admin/Admin";
import store from "./store";
import userAction from "./action/user";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { decodeToken } from "./token";
import jwt from "jsonwebtoken";
import PrivateRoute from "./PrivateRoute";

const USERBYID = gql`
  query GetUserById($id: ID!) {
    userByID(id: $id) {
      email
      userName
      id
      role
    }
  }
`;

function App() {
  // const [id, setId] = useState("");
  // if (!id) return <Tempp setId={setId} />;
  const [userInformation, setUserInformation] = useState(null);
  const providerUser = useMemo(
    () => ({ userInformation, setUserInformation }),
    [userInformation, setUserInformation]
  );
  const token = window.localStorage.getItem("token");

  const [fetchQuery, { loading, data, error }] = useLazyQuery(USERBYID);
  useEffect(() => {
    if (token) {
      try {
        jwt.verify(token, "Graphql_Hoova", function (err, decoded) {
          fetchQuery({ variables: { id: decoded.userId } });
        });
      } catch (err) {
        console.log(err);
      }
      if (data) {
        store.dispatch(userAction.login(data.userByID));
        console.log(data.userByID);
      }
    }
  }, [data, fetchQuery, loading, token]);
  return (
    <AuthContext.Provider value={providerUser}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/profile/:id" component={Profile}></Route>
          <Route path="/setting" component={Setting}></Route>
          <Route path="/question/:id" component={Question}></Route>
          <Route path="/changepassword" component={ChangePassword}></Route>
          <Route path="/postquestion" component={QuestionModal}></Route>
          <Route path="/soso" component={Tempp}></Route>
          <Route path="/soso2" component={QuestionModal}></Route>
          <Route path="/soso3" component={AnswerBox}></Route>
          <Route path="/postquestion" component={QuestionModal}></Route>
          <Route path="/answer/:question" component={Answer}></Route>
          <Route path="/admin" component={Admin}></Route>
          {/* <PrivateRoute path="/admin" component={Admin} exact></PrivateRoute> */}
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
