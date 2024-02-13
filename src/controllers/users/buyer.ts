import { config } from '@gateway/config';
import { buyerService } from '@gateway/services/api/buyer.service';
import { winstonLogger } from '@hansin91/jobber-shared';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Logger } from 'winston';

class BuyerController {

  private log: Logger;
  constructor() {
    this.log = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'apiGatewayBuyerController', 'debug');
  }

  public getByEmail = async (_req: Request, res: Response): Promise<void> => {
    try {
      const { data }: AxiosResponse = await buyerService.getBuyerByEmail();
      res.status(StatusCodes.OK).json({ message: data.message, buyer: data.buyer });
    } catch (error) {
      this.log.log('error', 'GatewayService BuyerController getByEmail() error method:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  };

  public getByCurrentUsername = async (_req: Request, res: Response): Promise<void> => {
    try {
      const { data }: AxiosResponse = await buyerService.getCurrentBuyerByUsername();
      res.status(StatusCodes.OK).json({ message: data.message, buyer: data.buyer });
    } catch (error) {
      this.log.log('error', 'GatewayService BuyerController getByCurrentUsername() error method:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  };

  public getByUsername = async (req: Request, res: Response): Promise<void> => {
    try {
      const { data }: AxiosResponse = await buyerService.getBuyerByUsername(req.params.username);
      res.status(StatusCodes.OK).json({ message: data.message, buyer: data.buyer });
    } catch (error) {
      this.log.log('error', 'GatewayService BuyerController getByUsername() error method:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  };
}

export const buyerController: BuyerController = new BuyerController();