var initStore = {
  question: [],
};

export default function homeQuestionReducer(state = initStore, action) {
  if (!action.payload) return { ...state };

  switch (action.type) {
    case "LOAD_HOME_QUESTION":
      return {
        ...state,
        question: state.question.concat(action.payload.content),
        finished: true,
        isLast: action.payload.isLast,
        total: action.payload.total,
      };

    case "ADD_HOME_QUESTION":
      return {
        ...state,
        question: [action.payload.content].concat(state.question),
      };

    case "DELETE_HOME_QUESTION":
      return {
        ...state,
        question: state.question.filter(
          (q) => q._id !== action.payload.content
        ),
      };

    case "CLEAR_ALL_HOME_QUESTION":
      return {
        question: [],
        finished: false,
        isLast: false,
      };

    default:
      return {
        ...state,
      };
  }
}
