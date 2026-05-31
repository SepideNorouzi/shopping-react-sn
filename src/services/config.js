import axios from "axios";

const api = axios.create({ baseURL: "https://fakestoreapi.com" });

api.interceptors.response.use(
  (response) => response.data,
  // This line takes that full response object and returns only the response.data property. 
  // This is a massive convenience because in most cases, data is the only part you care about. 
  // It means you don't have to type .data every time you handle a response.
  (error) => Promise.reject(error)
);
// An interceptor is a function that can "intercept" requests or responses before they are 
// handled by your main application code. This specific code intercepts responses coming back from the API.

// api.interceptors.response.use(...): This method attaches a function that will run for every response. 
// It takes two arguments: a function for successful responses and a function for failed responses.

export default api;
