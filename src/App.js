import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import NavBar from "./components/NavBar/NavBar";
import Setting from "./pages/Setting";
import Question from "./pages/Question/Question";
import AuthContext from "./appContext";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import Tempp from "./components/Modal/Tempp";
import QuestionModal from './components/Modal/QuestionModal';
import AnswerBox from './components/AnswerBox/AnswerBox';
import QuestionModal from "./components/Modal/QuestionModal";
import Answer from "./pages/Answer/Answer";

function App() {
  const [id, setId] = useState("");
  // if (!id) return <Tempp setId={setId} />;
  return (
    // <AuthContext.Provider>

    <Router>
      {/* <NavBar id={id}/> */}

      <Switch>
        {/* <Route exact path="/" component={Home}></Route>
        <Route path="/profile/:id" component={Profile}></Route>
        <Route path="/setting" component={Setting}></Route>
        <Route path="/question/:id" component={Question}></Route>
        <Route path="/changepassword" component={ChangePassword}></Route>
        <Route path="/postquestion" component={QuestionModal}></Route> */}
        <Route path="/soso" component={Tempp}></Route>
        <Route path="/soso2" component={QuestionModal}></Route>
        <Route path="/soso3" component={AnswerBox}></Route>
        <Route path="/postquestion" component={QuestionModal}></Route>
        <Route path="/answer/:question" component={Answer}></Route>
      </Switch>
    </Router>

    // </AuthContext.Provider>
  );
}

export default App;
