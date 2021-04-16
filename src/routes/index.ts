import { Router } from 'express';
import { create, get, update } from './Profile';


// profile-route
const profileRouter = Router();
profileRouter.post('/create', create);
profileRouter.get('/get/:nickname', get);
profileRouter.put('/update', update);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/profile', profileRouter);
export default baseRouter;
