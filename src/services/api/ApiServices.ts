import axios, { AxiosInstance } from "axios";

class APIServices {
  private _clientAPI: AxiosInstance;

  constructor({ baseURL }) {
    this._clientAPI = axios.create({ baseURL: baseURL });
  }

  get connection(): AxiosInstance {
    return this._clientAPI;
  }
}

export { APIServices };
