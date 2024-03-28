import axios from "axios";

const api_endpoint = import.meta.env.VITE_REACT_APP_API_URL;

axios.defaults.baseURL = api_endpoint;

export default axios;

export const baseAxios = axios.create();