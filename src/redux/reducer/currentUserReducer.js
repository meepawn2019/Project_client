var initStore = {};
export default function currentUserReducer(state = initStore, action) {
  switch (action.type) {
    case "LOAD_CURRENT_USER": {
      return {
        user: action.payload.user,
      };
    }

    case "CHANGE_CURRENT_USER_AVATAR":
      return {
        ...state,
        user: {
          ...state.user,
          avatar: action.payload.content,
        },
      };

    case "CHANGE_CURRENT_USER_COVER_IMAGE":
      return {
        ...state,
        user: {
          ...state.user,
          coverImage: action.payload.content,
        },
      };

    case "CLEAR_CURRENT_USER":
      return {};
    default:
      return {
        ...state,
      };
  }
}
