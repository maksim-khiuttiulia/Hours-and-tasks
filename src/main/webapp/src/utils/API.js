import axios from "axios";

export default axios.create({
  baseURL: "http://hours-and-tasks.herokuapp.com/api/",
  responseType: "json"
});
