var initStore = {};

export default function answerInQuestionReducer(state = initStore, action) {
  if (!action.payload) return { ...state };
  const id = action.payload.id;
  const content = action.payload.content;
  const isLast = action.payload.isLast;

  switch (action.type) {
    case "LOAD_QUESTION":
      return {
        ...state,
        [id]: {
          question: content,
          qFinished: true,
        },
      };
    case "DELETE_QUESTION": {
      let temp = { ...state };
      delete temp[id];
      return {
        ...temp,
      };
    }

    case "LOAD_ANSWER_IN_QUESTION":
      return {
        ...state,
        [id]: {
          ...state[id],
          answer: state[id].answer ? state[id].answer.concat(content) : content,
          total: action.payload.total,
          aFinished: true,
          isLast: isLast,
        },
      };
    case "WRITE_AN_ANSWER":
      return {
        ...state,
        [id]: {
          ...state[id],
          question: {
            ...state[id].question,
            commentCount: state[id].question.commentCount + 1,
          },
          answer: state[id].answer
            ? [content].concat(state[id].answer)
            : [content],
        },
      };

    case "DELETE_AN_ANSWER":
      return {
        ...state,
        [id]: {
          ...state[id],
          question: {
            ...state[id].question,
            commentCount: state[id].question.commentCount - 1,
          },
          answer: state[id].answer.filter((a) => a._id != content),
        },
      };

    case "LIKE_AN_ANSWER": {
      let userId = content.userId;
      let answerId = content.answerId;
      if (!state[id]) return { ...state };
      if (!state[id].answer) return { ...state };
      let newAnswerList = [...state[id].answer];

      let answerIndex = newAnswerList.findIndex((a) => a._id == answerId);
      let answer = { ...newAnswerList[answerIndex] };

      let like = [...answer.like];
      let dislike = [...answer.dislike];

      let likeCount = answer.likeCount || 0;
      let dislikeCount = answer.dislikeCount || 0;
      let likeIndex = like.findIndex((id) => id == userId);
      let dislikeIndex = dislike.findIndex((id) => id == userId);

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
          answer: newAnswerList,
        },
      };
    }

    case "DISLIKE_AN_ANSWER": {
      let userId = content.userId;
      let answerId = content.answerId;
      if (!state[id]) return { ...state };
      if (!state[id].answer) return { ...state };
      let newAnswerList = [...state[id].answer];

      let answerIndex = newAnswerList.findIndex((a) => a._id == answerId);
      let answer = { ...newAnswerList[answerIndex] };

      let like = [...answer.like];
      let dislike = [...answer.dislike];

      let likeCount = answer.likeCount || 0;
      let dislikeCount = answer.dislikeCount || 0;
      let likeIndex = like.findIndex((id) => id == userId);
      let dislikeIndex = dislike.findIndex((id) => id == userId);

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
          answer: newAnswerList,
        },
      };
    }

    case "CLEAR_ALL_QUESTION_ANSWER":
      return {};

    default:
      return {
        ...state,
      };
  }
}
