import { combineReducers } from "redux";
import answerInQuestionReducer from "./reducer/answerInQuestionReducer";
import currentUserReducer from "./reducer/currentUserReducer";
import homeQuestionReducer from "./reducer/homeQuestionReducer";
import userInfoReducer from "./reducer/userInfoReducer";

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  homeQuestion: homeQuestionReducer,
  userInfo: userInfoReducer,
  answerInQuestion: answerInQuestionReducer,
});

export default rootReducer;
