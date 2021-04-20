import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import PrimarySearchAppBar from "./components/NavBar/NavBar";
import Setting from "./pages/Setting";
import Question from "./pages/Question/Question";
import AuthContext from "./appContext";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import QuestionModal from "./components/Modal/QuestionModal";
import Answer from "./pages/Answer/Answer";

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
        <Route path="/changepassword" component={ChangePassword}></Route>
        <Route path="/postquestion" component={QuestionModal}></Route>
        <Route path="/answer/:question" component={Answer}></Route>
      </Switch>
    </Router>
    // </AuthContext.Provider>
  );
}

export default App;
