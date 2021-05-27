import jwt from "jsonwebtoken";

const AUTH_TOKEN = "auth-token";

export const getToken = () => localStorage.getItem(AUTH_TOKEN);
export const setToken = (token) => localStorage.setItem(AUTH_TOKEN, token);
export const deleteToken = () => localStorage.removeItem(AUTH_TOKEN);

export const decodeToken = (token) => {
  try {
    jwt.verify(token, "Graphql_Hoova", function (err, decoded) {
      return decoded.userId;
    });
  } catch (err) {
    console.log(err);
  }
};
