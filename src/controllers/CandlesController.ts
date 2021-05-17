import { Response, Request } from "express";
import { CandlesServices } from "../services/CandlesServices";

class CandlesController {
  async getCandles(request: Request, response: Response): Promise<Response> {
    try {
      const candlesServices = new CandlesServices();
      const { currencyPair, frequency } = request.query;

      const candles = await candlesServices.getCandlesByCurrencyAndFrequency({
        currencyPair,
        frequency,
      });

      return response.json(candles);
    } catch (error) {
      return response
        .json({
          message: error.message,
          file: error.file,
          line: error.line
        })
        .status(500);
    }
  }
}

export { CandlesController };
