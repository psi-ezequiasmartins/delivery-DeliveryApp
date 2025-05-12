/**
 * src/config/apiAxios.js
 */

import Axios from "axios";

const URL_API = process.env.REACT_APP_BASEURL || "https://srv.deliverybairro.com" || "http://localhost:3357" ;

const api = Axios.create({
  baseURL: URL_API,
  headers: {
    'Content-Type':'application/json',
    'Accept': '*/*'
  }
});

export default api;
