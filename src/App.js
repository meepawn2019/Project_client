import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import PrimarySearchAppBar from "./components/NavBar/NavBar";
import Setting from "./pages/Setting";
import Question from "./pages/Question/Question";
import AuthContext from "./appContext";
import ForgotPasswords from "./pages/ForgotPassword/ForgotPassword";

function App() {
  return (
    // <AuthContext.Provider>
    <Router>
      <PrimarySearchAppBar />

      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/profile" component={Profile}></Route>
        <Route path="/setting" component={Setting}></Route>
        <Route path="/question/:id" component={Question}></Route>
        <Route path="/forgot" component={ForgotPasswords}></Route>
      </Switch>
    </Router>
    // </AuthContext.Provider>
  );
}

export default App;
