import axios from "axios";
export const baseURL = "http://localhost:8000"; // local
export const api = axios.create({
  baseURL: baseURL,
  // withCredentials: true,
});


export let config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "x-csrf-token": localStorage.getItem("x-csrf-token")!,
    'Content-Type': 'application/json',

  },
};

export const setConfig = (token: string, csrfToken?: string) => {
  config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "x-csrf-token": csrfToken!,
      'Content-Type': 'application/json',
    },
  };
};
