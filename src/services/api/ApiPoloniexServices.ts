import { APIServices } from "./ApiServices";

class ApiPoloniexServices extends APIServices {
  constructor() {
    super({ baseURL: process.env.BASE_URL_API_POLONIEX });
  }

  async returnTicker() {
    const { data: ticker } = await this.connection.get<{}>(
      "/public?command=returnTicker"
    );
    return ticker;
  }
}

export { ApiPoloniexServices };
