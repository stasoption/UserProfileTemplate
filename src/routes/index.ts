import { Router } from 'express';
import { login, get, update } from './ProfileRoute';


// profile-route
const profileRouter = Router();
profileRouter.post('/login', login);
profileRouter.get('/get/:nickname', get);
profileRouter.put('/update', update);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/profile', profileRouter);
export default baseRouter;
