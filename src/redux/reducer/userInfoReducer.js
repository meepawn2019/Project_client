var initStore = {};

export default function userInfoReducer(state = initStore, action) {
  if (!action.payload) return { ...state };
  const id = action.payload.id;
  const content = action.payload?.content;
  const isLast = action.payload?.isLast;
  switch (action.type) {
    case "LOAD_AN_USER":
      return {
        ...state,
        [id]: {
          user: content,
        },
      };

    case "LOAD_AN_USER_ANSWER":
      return {
        ...state,
        [id]: {
          ...state[id],
          answer: {
            ...state[id]?.answer,

            content: state[id]?.answer?.content
              ? state[id].answer.content.concat(content)
              : content,
            isLast: isLast,
            total: action.payload.total,
          },
        },
      };

    case "ADD_AN_USER_ANSWER":
      return {
        ...state,
        [id]: {
          ...state[id],
          answer: {
            ...state[id]?.answer,
            content: state[id]?.answer?.content
              ? [content].concat(state[id].answer.content)
              : null,
            isLast: isLast,
          },
        },
      };
    case "DELETE_AN_USER_ANSWER":
      return {
        ...state,
        [id]: {
          ...state[id],
          answer: {
            ...state[id]?.answer,
            content:
              state[id]?.answer?.content?.filter((a) => a._id !== content) ||
              null,
          },
        },
      };

    case "LIKE_AN_USER_ANSWER": {
      let userId = content.userId;
      let answerId = content.answerId;

      let newAnswerList = [...state[id].answer?.content];

      let answerIndex = newAnswerList.findIndex((a) => a._id === answerId);
      let answer = { ...newAnswerList[answerIndex] };

      let like = [...answer.like];
      let dislike = [...answer.dislike];

      let likeCount = answer.likeCount || 0;
      let dislikeCount = answer.dislikeCount || 0;
      let likeIndex = like.findIndex((id) => id === userId);
      let dislikeIndex = dislike.findIndex((id) => id === userId);

      if (likeIndex >= 0) {
        like.splice(likeIndex, 1);
        likeCount--;
      } else if (dislikeIndex >= 0) {
        dislike.splice(dislikeIndex, 1);
        like.push(userId);
        likeCount++;
        dislikeCount--;
      } else {
        like.push(userId);
        likeCount++;
      }

      let res = {
        ...answer,
        like: like,
        dislike: dislike,
        likeCount: likeCount,
        dislikeCount: dislikeCount,
      };

      newAnswerList[answerIndex] = res;

      // console.log(newAnswerList);

      return {
        ...state,
        [id]: {
          ...state[id],
          answer: {
            ...state[id].answer,
            content: newAnswerList,
          },
        },
      };
    }

    case "DISLIKE_AN_USER_ANSWER": {
      let userId = content.userId;
      let answerId = content.answerId;

      let newAnswerList = [...state[id].answer?.content];

      let answerIndex = newAnswerList.findIndex((a) => a._id === answerId);
      let answer = { ...newAnswerList[answerIndex] };

      let like = [...answer.like];
      let dislike = [...answer.dislike];

      let likeCount = answer.likeCount || 0;
      let dislikeCount = answer.dislikeCount || 0;
      let likeIndex = like.findIndex((id) => id === userId);
      let dislikeIndex = dislike.findIndex((id) => id === userId);

      if (dislikeIndex >= 0) {
        dislike.splice(dislikeIndex, 1);
        dislikeCount--;
      } else if (likeIndex >= 0) {
        like.splice(likeIndex, 1);
        dislike.push(userId);
        likeCount--;
        dislikeCount++;
      } else {
        dislike.push(userId);
        dislikeCount++;
      }

      let res = {
        ...answer,
        like: like,
        dislike: dislike,
        likeCount: likeCount,
        dislikeCount: dislikeCount,
      };

      newAnswerList[answerIndex] = res;

      // console.log(newAnswerList);

      return {
        ...state,
        [id]: {
          ...state[id],
          answer: { ...state[id].answer, content: newAnswerList },
        },
      };
    }

    case "LOAD_AN_USER_QUESTION":
      // console.log(action.payload.total);
      return {
        ...state,
        [id]: {
          ...state[id],
          question: {
            ...state[id]?.question,
            content: state[id]?.question?.content
              ? state[id].question.content.concat(content)
              : content,
            isLast: isLast,
            total: action.payload.total,
          },
        },
      };
    case "ADD_AN_USER_QUESTION":
      return {
        ...state,
        [id]: {
          ...state[id],
          question: {
            ...state[id]?.question,
            content: state[id]?.question.content
              ? [content].concat(state[id].question.content)
              : null,
            isLast: isLast,
          },
        },
      };
    case "DELETE_AN_USER_QUESTION":
      return {
        ...state,
        [id]: {
          ...state[id],
          question: {
            ...state[id]?.question,
            content:
              state[id]?.question?.content?.filter((q) => q._id !== content) ||
              null,
            isLast: isLast,
          },
        },
      };

    case "LOAD_AN_USER_FRIEND":
      return {
        ...state,
        [id]: {
          ...state[id],
          friend: {
            content: state[id].friend
              ? state[id].friend.concat(content)
              : content,
            isLast: isLast,
          },
        },
      };

    case "LOAD_AN_USER_TOPIC":
      return {
        ...state,
        [id]: {
          ...state[id],
          topic: {
            content: state[id].topic
              ? state[id].topic.concat(content)
              : content,
            isLast: isLast,
          },
        },
      };

    case "CHANGE_USER_AVATAR":
      return {
        ...state,
        [id]: {
          ...state[id],
          user: { ...state[id].user, avatar: content },
        },
      };

    case "CHANGE_USER_COVER_IMAGE":
      return {
        ...state,
        [id]: {
          ...state[id],
          user: { ...state[id].user, coverImage: content },
        },
      };

    case "CLEAR_ALL_USER_INFO":
      return {};

    default:
      return {
        ...state,
      };
  }
}
