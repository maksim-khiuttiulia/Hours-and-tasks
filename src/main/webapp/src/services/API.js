import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  responseType: "json",
  headers: {'Content-Type': 'application/json'},
});

api.interceptors.request.use(
    config => {
      let token = getAuthenticationToken();
      if (token) {
        config.headers.Authorization = token;
      }
      return config
    }
)

function getAuthenticationToken() {
  let token = sessionStorage.getItem('token');
  if (token) {
    return token;
  }
  token = localStorage.getItem('token')
  if (token){
    return token;
  }
  return null;
}

export default api;
