export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

const userAction = {
  login: (user) => ({
    type: LOGIN,
    payload: user,
  }),
  logout: () => ({
    type: LOGOUT,
  }),
};

export default userAction;
