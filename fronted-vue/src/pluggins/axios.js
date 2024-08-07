import  axios from 'axios';

// crear una instancias de axios
const instance = axios.create({
    baseURL: 'http://localhost:9000',
    withCredentials: true
});

export default instance;