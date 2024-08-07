import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  const token = localStorage.getItem("token")!;
  const { sub } = jwtDecode(token);

  return sub;
};
