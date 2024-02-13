import { config } from '@gateway/config';
import { sellerService } from '@gateway/services/api/seller.service';
import { winstonLogger } from '@hansin91/jobber-shared';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Logger } from 'winston';

class SellerController {

  private log: Logger;
  constructor() {
    this.log = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'apiGatewayBuyerController', 'debug');
  }

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { data }: AxiosResponse = await sellerService.createSeller(req.body);
      res.status(StatusCodes.CREATED).json({ message: data.message, seller: data.seller });
    } catch (error) {
      this.log.log('error', 'GatewayService SellerController create() error method:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { data }: AxiosResponse = await sellerService.updateSeller(req.params.sellerId, req.body);
      res.status(StatusCodes.OK).json({ message: data.message, seller: data.seller });
    } catch (error) {
      this.log.log('error', 'GatewayService SellerController update() error method:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  };

  public getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { data }: AxiosResponse = await sellerService.getSellerById(req.params.sellerId);
      res.status(StatusCodes.OK).json({ message: data.message, seller: data.seller });
    } catch (error) {
      this.log.log('error', 'GatewayService SellerController getById() error method:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  };

  public getByUsername = async (req: Request, res: Response): Promise<void> => {
    try {
      const { data }: AxiosResponse = await sellerService.getSellerByUsername(req.params.username);
      res.status(StatusCodes.OK).json({ message: data.message, seller: data.seller });
    } catch (error) {
      this.log.log('error', 'GatewayService SellerController getByUsername() error method:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  };

  public getRandomSellers = async (req: Request, res: Response): Promise<void> => {
    try {
      const { data }: AxiosResponse = await sellerService.getRandomSellers(req.params.size);
      res.status(StatusCodes.OK).json({ message: data.message, sellers: data.sellers });
    } catch (error) {
      this.log.log('error', 'GatewayService SellerController getRandomSellers() error method:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  };

  public seedSellers = async (req: Request, res: Response): Promise<void> => {
    try {
      const { data }: AxiosResponse = await sellerService.seed(req.params.count);
      res.status(StatusCodes.OK).json({ message: data.message });
    } catch (error) {
      this.log.log('error', 'GatewayService SellerController seedSellers() error method:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  };
}

export const sellerController: SellerController = new SellerController();