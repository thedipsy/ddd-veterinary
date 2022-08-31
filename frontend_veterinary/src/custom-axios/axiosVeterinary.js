import axios from "axios";

const instance = axios.create({
    baseURL : 'http://localhost:9092/api',
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Content-type': 'application/json'
    }
})

export default instance;
