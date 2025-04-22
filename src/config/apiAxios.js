/**
 * src/config/apiAxios.js
 */

import Axios from "axios";
const URL = process.env.REACT_APP_BASE_URL; 

const api = Axios.create({
  baseURL: URL,
  headers: {
    'Content-Type':'application/json',
    'Accept': '*/*'
  }
});

export default api;
