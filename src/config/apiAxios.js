/**
* src/config/apiAxios.js
*/

import Axios from "axios";

const URL = "http://localhost:3333"; //  "https://srv.deliverybairro.com"; // 

const api = Axios.create({
  baseURL: URL,
  headers: {
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*',
    'Accept': '*/*'
  }
});

export default api;