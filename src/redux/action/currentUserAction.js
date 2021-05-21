// var user = {id, answer, question, friend, topic};

export function loadCurrentUser(user) {
  return {
    type: "LOAD_CURRENT_USER",
    payload: {
      user: user,
    },
  };
}

export function changeCurrentUserAvatar(data) {
  return {
    type: "CHANGE_CURRENT_USER_AVATAR",
    payload: {
      content: data.content,
    },
  };
}

export function changeCurrentUserCoverImage(data) {
  return {
    type: "CHANGE_CURRENT_USER_COVER_IMAGE",
    payload: {
      content: data.content,
    },
  };
}

export function clearCurrentUser() {
  return {
    type: "CLEAR_CURRENT_USER",
  };
}
