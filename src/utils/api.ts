import axios from "axios";

//export const baseURL = "http://196.188.235.248:5000";
// export const baseURL = "https://196.188.235.248/crm-back-end"; //test server
//export const baseURL = "https://74.208.130.148/crm-back-end";
//export const baseURL = "https://portal.zemeninsurance.com/crm-back-end";
export const baseURL = "http://localhost:8000"; // local
export const api = axios.create({
  baseURL: baseURL,
  // withCredentials: true,
});
// axios.defaults.xsrfHeaderName = localStorage.getItem("x-csrf-token")!;
// axios.defaults.xsrfCookieName = "csrftoken";
// const fetchCsrfToken = async () => {
//   try {
//     const response = await axios.get('/api/csrf-token');
//     setCsrfToken(response.data.csrfToken);
//   } catch (error) {
//     console.log('Error fetching CSRF token:', error);
//   }
// };

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
