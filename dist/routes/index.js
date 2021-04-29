"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProfileRoute_1 = require("./ProfileRoute");
// profile-route
const profileRouter = express_1.Router();
profileRouter.post('/login', ProfileRoute_1.login);
profileRouter.get('/get/:nickname', ProfileRoute_1.get);
profileRouter.put('/update', ProfileRoute_1.update);
// Export the base-router
const baseRouter = express_1.Router();
baseRouter.use('/profile', profileRouter);
exports.default = baseRouter;
