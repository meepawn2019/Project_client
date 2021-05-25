export function loadAnUser(newUser) {
  return {
    type: "LOAD_AN_USER",
    payload: {
      id: newUser._id,
      content: newUser,
    },
  };
}

export function loadAnUserAnswer(data) {
  return {
    type: "LOAD_AN_USER_ANSWER",
    payload: {
      id: data.id,
      content: data.content,
      isLast: data.isLast,
      total: data.total,
    },
  };
}
export function addAnUserAnswer(data) {
  return {
    type: "ADD_AN_USER_ANSWER",
    payload: {
      id: data.id,
      content: data.content,
      isLast: data.isLast,
    },
  };
}
export function likeAnUserAnswer(data) {
  return {
    type: "LIKE_AN_USER_ANSWER",
    payload: {
      id: data.id,
      content: data.content,
    },
  };
}

export function dislikeAnUserAnswer(data) {
  return {
    type: "DISLIKE_AN_USER_ANSWER",
    payload: {
      id: data.id,
      content: data.content,
    },
  };
}
export function deleteAnUserAnswer(data) {
  return {
    type: "DELETE_AN_USER_ANSWER",
    payload: {
      id: data.id,
      content: data.content,
      isLast: data.isLast,
    },
  };
}
export function loadAnUserQuestion(data) {
  return {
    type: "LOAD_AN_USER_QUESTION",
    payload: {
      id: data.id,
      content: data.content,
      isLast: data.isLast,
      total: data.total,
    },
  };
}
export function addAnUserQuestion(data) {
  return {
    type: "ADD_AN_USER_QUESTION",
    payload: {
      id: data.id,
      content: data.content,
      isLast: data.isLast,
    },
  };
}
export function deleteAnUserQuestion(data) {
  return {
    type: "DELETE_AN_USER_QUESTION",
    payload: {
      id: data.id,
      content: data.content,
      isLast: data.isLast,
    },
  };
}
export function loadAnUserFriend(data) {
  return {
    type: "LOAD_AN_USER_FRIEND",
    payload: {
      id: data.id,
      content: data.content,
      isLast: data.isLast,
    },
  };
}
export function loadAnUserTopic(data) {
  return {
    type: "LOAD_AN_USER_TOPIC",
    payload: {
      id: data.id,
      content: data.content,
      isLast: data.isLast,
    },
  };
}

export function changeUserAvatar(data) {
  return {
    type: "CHANGE_USER_AVATAR",
    payload: {
      id: data.id,
      content: data.content,
    },
  };
}

export function changeUserCoverImage(data) {
  return {
    type: "CHANGE_USER_COVER_IMAGE",
    payload: {
      id: data.id,
      content: data.content,
    },
  };
}

export function clearAllUserInfo() {
  console.log("call");
  return {
    type: "CLEAR_ALL_USER_INFO",
    payload: {
      id: "null",
      content: [],
      isLast: true,
    },
  };
}
