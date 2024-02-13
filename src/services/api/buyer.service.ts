import axios, { AxiosResponse } from 'axios';
import { config } from '@gateway/config';
import { AxiosService } from '@gateway/services/axios';

export let axiosBuyerInstance: ReturnType<typeof axios.create>;

class BuyerService {
  constructor() {
    const axiosService: AxiosService = new AxiosService(`${config.USERS_BASE_URL}/api/v1/buyer`, 'buyer');
    axiosBuyerInstance = axiosService.axios;
  }

  public getCurrentBuyerByUsername = async (): Promise<AxiosResponse> => {
    const response: AxiosResponse = await axiosBuyerInstance.get('/username');
    return response;
  };

  public getBuyerByUsername = async (username: string): Promise<AxiosResponse> => {
    const response: AxiosResponse = await axiosBuyerInstance.get(`/${username}`);
    return response;
  };

  public getBuyerByEmail = async (): Promise<AxiosResponse> => {
    const response: AxiosResponse = await axiosBuyerInstance.get('/email');
    return response;
  };
}

export const buyerService: BuyerService = new BuyerService();