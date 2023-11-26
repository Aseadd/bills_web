import jwt from "jwt-decode";
import { User } from "../features/auth/UsersSlice";

export const tokenToUser = () => {
    const token = localStorage.getItem("token");
  
    // if (!token) return undefined;
    // const decoded = jwt(token);
    // return decoded as User;
  };