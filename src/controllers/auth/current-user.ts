import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

class CurrentUserController {

  public read = async (_req: Request, res: Response): Promise<void> => {
    try {
      const response: AxiosResponse = await authService.getCurrentUser();
      res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  };

  public resendEmail = async (req: Request, res: Response): Promise<void> => {
    try {
      const response: AxiosResponse = await authService.resendEmail(req.body);
      res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  };
}

export const currentUserController:CurrentUserController = new CurrentUserController();