import Axios from "axios";

const URL = "http://127.0.0.1:3333";
// const URL = "https://srv.deliverybairro.com"; 

const api = Axios.create({
  baseURL: URL,
  mode: "no-cors",
  headers: {
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*',
    'Accept': '*'
  }
});

export default api;
