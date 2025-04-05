/**
 * src/config/apiAxios.js
 */

import Axios from "axios";

const URL = "http://192.168.0.7:3357"; // "https://srv.deliverybairro.com"; // 

const api = Axios.create({
  baseURL: URL,
  headers: {
    'Content-Type':'application/json',
    'Accept': '*/*'
  }
});

export default api;
