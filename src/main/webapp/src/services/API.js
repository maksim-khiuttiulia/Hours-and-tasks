import axios from "axios";

const localport = 3000
const localhost = "localhost"
const remotehost = "hours-and-tasks.herokuapp.com"
const apiPath = "/api"

const api = axios.create({
  baseURL: getURL(),
  responseType: "json",
  headers: {'Content-Type': 'application/json'},
});

api.interceptors.request.use(
    config => {
      let token = getAuthenticationToken();
      getURL()
      if (token) {
        config.headers.Authorization = token;
      }
      return config
    }
)

function getURL(){
  let location = window.location;
  let hostname = location.hostname;
  let port = location.port ? ':'+ location.port: ''
  let protocol = location.protocol

  if (hostname === localhost && port === ':' + localport){
    port = ''
    hostname = remotehost
    protocol = "https:"
  }
  console.error(protocol+'//'+ hostname + port + apiPath)
  return protocol+'//'+ hostname + port + apiPath;
}

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
