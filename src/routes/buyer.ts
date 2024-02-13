import { buyerController } from '@gateway/controllers/users/buyer';
import express, { Router } from 'express';

class BuyerRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/buyer/email', buyerController.getByEmail);
    this.router.get('/buyer/username', buyerController.getByCurrentUsername);
    this.router.get('/buyer/:username', buyerController.getByUsername);
    return this.router;
  }
}

export const buyerRoutes: BuyerRoutes = new BuyerRoutes();