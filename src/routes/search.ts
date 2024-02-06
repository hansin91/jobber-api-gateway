import { searchController } from '@gateway/controllers/auth/search';
import express, { Router } from 'express';

class SearchRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/auth/search/gig/:from/:size/:type', searchController.gigs);
    this.router.get('/auth/search/gig/:gigId', searchController.gigById);
    return this.router;
  }
}

export const searchRoutes: SearchRoutes = new SearchRoutes();