import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import AuthPage from "./pages/AuthPage";
import { connect } from "react-redux";
import {
  loadCurrentUser,
  clearCurrentUser,
} from "./redux/action/currentUserAction";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";

import Setting from "./pages/Setting";
import Question from "./pages/Question/Question";
import ChangePassword from "./pages/ChangePassword";

function App(props) {
  const user = props.user.user;
  if (!user) return <AuthPage />;
  if (!user._id) return <AuthPage />;
  return (
    <Router>
      <NavBar user={user} />

      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/profile/:id" component={Profile}></Route>
        <Route path="/setting" component={Setting}></Route>

        <Route path="/changepassword" component={ChangePassword}></Route>
        <Route path="/question/:id" component={Question}></Route>
        {/* <Route path="/soso2" component={ImageCrop}></Route> */}
      </Switch>
    </Router>
  );
}
function mapStateToProps(state) {
  return {
    user: state.currentUser,
  };
}

const mapDispatchToProps = {
  loadCurrentUser,
  clearCurrentUser,
};
export default connect(mapStateToProps)(App);
