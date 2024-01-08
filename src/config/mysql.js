import Axios from "axios";

const URL = "https://srv.deliverybairro.com";
// const URL = "http://localhost:3333"; // teste local (08012024-1853)

const api = Axios.create({
  baseURL: URL,
  headers: {
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*',
    'Accept': '*/*'
  }
});

export default api;