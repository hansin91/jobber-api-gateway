import { sellerController } from '@gateway/controllers/users/seller';
import express, { Router } from 'express';

class SellerRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/seller/id/:sellerId', sellerController.getById);
    this.router.get('/seller/username/:username', sellerController.getByUsername);
    this.router.get('/seller/random/:size', sellerController.getRandomSellers);
    this.router.post('/seller/create', sellerController.create);
    this.router.put('/seller/:sellerId', sellerController.update);
    this.router.put('/seller/seed/:count', sellerController.seedSellers);
    return this.router;
  }
}

export const sellerRoutes: SellerRoutes = new SellerRoutes();