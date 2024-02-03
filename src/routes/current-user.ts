import { authController } from '@gateway/controllers/auth/auth';
import { currentUserController } from '@gateway/controllers/auth/current-user';
import { authMiddleware } from '@gateway/services/auth-middleware';
import express, { Router } from 'express';

class CurrentUserRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/auth/refresh-token/:username', authMiddleware.checkAuthentication, authController.refreshToken);
    this.router.get('/auth/currentuser', authMiddleware.checkAuthentication, currentUserController.read);
    this.router.post('/auth/resend-email', authMiddleware.checkAuthentication, currentUserController.resendEmail);
    return this.router;
  }
}

export const currentUserRoutes: CurrentUserRoutes = new CurrentUserRoutes();