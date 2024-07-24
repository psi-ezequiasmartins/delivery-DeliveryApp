/**
* src/config/apiAxios.js
*/

import Axios from "axios";

const URL = "https://srv.deliverybairro.com"; // "http://localhost:3359"; // 

const api = Axios.create({
  baseURL: URL,
  headers: {
    'Content-Type':'application/json',
    'Accept': '*/*'
  }
});

export default api;
