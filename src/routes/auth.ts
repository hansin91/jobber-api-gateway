import { authController } from '@gateway/controllers/auth/auth';
import { passwordController } from '@gateway/controllers/auth/password';
import express, { Router } from 'express';

class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/auth/signup', authController.create);
    this.router.post('/auth/signin', authController.signIn);
    this.router.put('/auth/verify-email', authController.verifyEmail);
    this.router.put('/auth/forgot-password', passwordController.forgotPassword);
    this.router.put('/auth/reset-password/:token', passwordController.resetPassword);
    this.router.put('/auth/change-password', passwordController.changePassword);
    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();