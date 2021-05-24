export const AUTH = "AUTH";

const userAction = {
  login: (user) => ({
    type: AUTH,
    payload: user,
  }),
};

export default userAction;
