/**
 * src/config/apiAxios.js
 */

import Axios from "axios";
const URL = "http://localhost:3357"; //"http://192.168.0.9:3357";  //process.env.REACT_APP_BASE_URL; 

const api = Axios.create({
  baseURL: URL,
  headers: {
    'Content-Type':'application/json',
    'Accept': '*/*'
  }
});

export default api;
