import axios, { AxiosResponse } from 'axios';
import { config } from '@gateway/config';
import { AxiosService } from '@gateway/services/axios';
import { ISellerDocument } from '@hansin91/jobber-shared';

export let axiosSellerInstance: ReturnType<typeof axios.create>;

class SellerService {
  constructor() {
    const axiosService: AxiosService = new AxiosService(`${config.USERS_BASE_URL}/api/v1/seller`, 'seller');
    axiosSellerInstance = axiosService.axios;
  }

  public getSellerById = async (sellerId: string): Promise<AxiosResponse> => {
    const response: AxiosResponse = await axiosSellerInstance.get(`/id/${sellerId}`);
    return response;
  };

  public getSellerByUsername = async (username: string): Promise<AxiosResponse> => {
    const response: AxiosResponse = await axiosSellerInstance.get(`/username/${username}`);
    return response;
  };

  public getRandomSellers = async (size: string): Promise<AxiosResponse> => {
    const response: AxiosResponse = await axiosSellerInstance.get(`/random/${size}`);
    return response;
  };

  public createSeller = async (body: ISellerDocument): Promise<AxiosResponse> => {
    const response: AxiosResponse = await axiosSellerInstance.post('/create', body);
    return response;
  };

  public updateSeller = async (sellerId: string, body: ISellerDocument): Promise<AxiosResponse> => {
    const response: AxiosResponse = await axiosSellerInstance.put(`/${sellerId}`, body);
    return response;
  };

  public seed = async (count: string): Promise<AxiosResponse> => {
    const response: AxiosResponse = await axiosSellerInstance.put(`/seed/${count}`);
    return response;
  };
}

export const sellerService: SellerService = new SellerService();