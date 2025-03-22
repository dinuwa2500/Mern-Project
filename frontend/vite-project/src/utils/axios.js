import axios from 'axios';

const API_URL = 'http://localhost:5000/api/items';
const axiosInstance = axios.create({ baseURL: API_URL });

export default axiosInstance;
