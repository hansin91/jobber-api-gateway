import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

class SeedController {

  public create = async (req: Request, res: Response): Promise<void> => {
    const response: AxiosResponse = await authService.seed(req.params.count);
    res.status(StatusCodes.OK).json({ message: response.data.message });
  };

}

export const seedController = new SeedController();