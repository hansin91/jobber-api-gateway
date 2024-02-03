import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

class AuthController {

  public refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username } = req.params;
      const response: AxiosResponse = await authService.getRefreshToken(username);
      req.session = { jwt: response.data.token };
      res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
  };

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, email, password, country, profilePicture } = req.body;
      const payload = { username, email, password, country, profilePicture, action: 'signup' };
      const response: AxiosResponse = await authService.signUp(payload);
      req.session = { jwt: response.data.token };
      res.status(StatusCodes.CREATED).json({ message: response.data.message, user: response.data.user });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
  };

  public signIn = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password } = req.body;
      const payload = { username, password, action: 'signin' };
      const response: AxiosResponse = await authService.signIn(payload);
      req.session = { jwt: response.data.token };
      res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
  };

  public verifyEmail = async (req: Request, res: Response): Promise<void> => {
    try {
      const { token  } = req.body;
      const response: AxiosResponse = await authService.verifyEmail(token);
      res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
  };
}

export const authController = new AuthController();