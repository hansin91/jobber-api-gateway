import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

class PasswordController {
  public forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;
      const response: AxiosResponse = await authService.forgotPassword(email);
      res.status(StatusCodes.OK).json({ message: response.data.message });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
  };

  public resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { password, confirmPassword } = req.body;
      const { token } = req.params;
      const response: AxiosResponse = await authService.resetPassword(token, password, confirmPassword);
      res.status(StatusCodes.OK).json({ message: response.data.message });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
  };

  public changePassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { currentPassword, newPassword } = req.body;
      const response: AxiosResponse = await authService.changePassword(currentPassword, newPassword);
      res.status(StatusCodes.OK).json({ message: response.data.message });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
  };
}

export const passwordController = new PasswordController();