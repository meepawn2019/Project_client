// var user = {id, answer, question, friend, topic};

export function loadHomeQuestion(data) {
  return {
    type: "LOAD_HOME_QUESTION",
    payload: {
      content: data.question,
      total: data.total,
      isLast: data.isLast,
    },
  };
}

export function addHomeQuestion(data) {
  return {
    type: "ADD_HOME_QUESTION",
    payload: {
      content: data.question,
    },
  };
}

export function deleteHomeQuestion(data) {
  return {
    type: "DELETE_HOME_QUESTION",
    payload: {
      content: data.id,
    },
  };
}

export function clearAllHomeQuestion() {
  return {
    type: "CLEAR_ALL_HOME_QUESTION",
    payload: {},
  };
}
