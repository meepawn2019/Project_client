// var user = {id, answer, question, friend, topic};

export function loadQuestion(data) {
  return {
    type: "LOAD_QUESTION",
    payload: {
      id: data._id,
      content: data,
    },
  };
}
export function deleteAQuestion(data) {
  return {
    type: "DELETE_QUESTION",
    payload: {
      id: data._id,
    },
  };
}

export function loadAnswerInQuestion(data) {
  return {
    type: "LOAD_ANSWER_IN_QUESTION",
    payload: {
      id: data.id,
      content: data.content,
      isLast: data.isLast,
      total: data.total,
    },
  };
}

export function writeAnAnswer(data) {
  return {
    type: "WRITE_AN_ANSWER",
    payload: {
      id: data.id,
      content: data.content,
    },
  };
}

export function deleteAnAnswer(data) {
  return {
    type: "DELETE_AN_ANSWER",
    payload: {
      id: data.id,
      content: data.answerId,
    },
  };
}

export function likeAnAnswer(data) {
  return {
    type: "LIKE_AN_ANSWER",
    payload: {
      id: data.id,
      content: data.content,
    },
  };
}

export function dislikeAnAnswer(data) {
  return {
    type: "DISLIKE_AN_ANSWER",
    payload: {
      id: data.id,
      content: data.content,
    },
  };
}

export function clearAllQuestionAnswer() {
  return {
    type: "CLEAR_ALL_QUESTION_ANSWER",
    payload: {
      id: "null",
      content: [],
      isLast: false,
    },
  };
}
