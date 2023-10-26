//create API class to handle all the API calls , use axios to make the calls
import axios, { AxiosError } from "axios";

axios.defaults.withCredentials = true;

// configure request interceptor to remove duplicate slahsed from url and add timeout of 30 seconds
axios.interceptors.request.use(
  (config: any) => {
    config.url = config.url.replace(/([^:]\/)\/+/g, "$1");
    config.timeout = 30000;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// add axios interceptors to handle errors
// check all available return objects
axios.interceptors.response.use(
  (response) => {
    console.log("RESPONSE:", response.status);
    if (response.status === 401) {
      window.location.href = "/login";
    }
    return response;
  },
  (error: AxiosError) => {
    console.error("API ERROR:", error);
    if (error.response?.status === 401) {
      window.location.href = "/login";
    } else {
      return Promise.reject(error.message);
    }
  }
);

//set axios withCredentials to true to send cookies with every request
axios.defaults.withCredentials = false;

class Api {
  private baseUrl: string;
  constructor() {
    this.baseUrl = "http://localhost:3000/";
  }
  public async get(path: string) {
    return await axios.get(`${this.baseUrl}${path}`);
  }
  public async post(path: string, data: any) {
    return await axios.post(`${this.baseUrl}${path}`, data);
  }
  public async put(path: string, data: any) {
    return await axios.put(`${this.baseUrl}${path}`, data);
  }
  public async delete(path: string) {
    return await axios.delete(`${this.baseUrl}${path}`);
  }
}

export default new Api();
