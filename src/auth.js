import jwt from "jsonwebtoken";

export function isAdmin() {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  }
  return false;
  //   try {
  //     jwt.verify(token, "Graphql_Hoova", function (err, decoded) {
  //       console.log(decoded.role === "Admin");
  //       return decoded.role === "Admin";
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
}
