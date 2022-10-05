import Axios from "axios";

// const URL = "https://srv.deliverybairro.com";
const URL = "http://localhost:3333";

const api = Axios.create({
  baseURL: URL,
  headers: {
    //  "Authorization":"Bearer '+jwt",
    'Content-Type':'application/json',
    // 'Accept-Encoding': 'gzip,deflate',
    // 'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
    // 'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Accept': '*/*'
  }
});

export default api;
