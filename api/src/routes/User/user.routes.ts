// @ts-nocheck
import { Router, Request, Response, NextFunction } from 'express';
const router = Router();
import Authorization from '../../Middlewares/Authorization'
import userController from "../../controllers/user.controller";
import bodyParser from 'body-parser'





// router.get('/users', [Authorization.User],userController.getUsers);
router.get('/users/profile', [Authorization.User], userController.getProfile);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserId)
router.patch('/users/update/:id', [Authorization.User], userController.avaliableUser);
router.post('/user/create-order', [Authorization.User], userController.generateOrder)
router.post('/webhook', bodyParser.raw({ type: "*/*" }), userController.hooksStripe);
router.get('/user/payments/success/:id', [Authorization.User], userController.succesPayment)
router.get('/user/payments', [Authorization.User], userController.payments)


router.post('/user/email',  userController.email)









export default router;