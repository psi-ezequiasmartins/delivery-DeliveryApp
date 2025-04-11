/**
 * src/config/apiAxios.js
 */

import Axios from "axios";

const URL = "https://srv.deliverybairro.com"; // "http://192.168.0.7:3357"; // 

const api = Axios.create({
  baseURL: URL,
  headers: {
    'Content-Type':'application/json',
    'Accept': '*/*'
  }
});

export default api;
