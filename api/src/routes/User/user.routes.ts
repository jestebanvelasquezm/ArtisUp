// @ts-nocheck
import { Router, Request, Response, NextFunction } from 'express';
const router = Router();
import Authorization from '../../Middlewares/Authorization'
import userController from "../../controllers/user.controller";
import express from 'express';//stripe raw!
import Stripe from 'stripe';
import bodyParser from 'body-parser'



// const  Stripe  = stripe() 


// router.get('/users', [Authorization.User],userController.getUsers);
router.get('/users/profile', [Authorization.User], userController.getProfile);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserId)
router.patch('/users/update/:id', [Authorization.User], userController.avaliableUser);
router.post('/user/create-order', [Authorization.User], userController.generateOrder)
// router.post('/user/buy/:id' ,[Authorization.User], userController.buy )
// router.post('/user/cancel/:id' ,[Authorization.User], userController.buy )//redireccionar 

// router.post('/users/register', userController.registerUser);



// stripe webhook:
router.use("/webhook", bodyParser.raw({ type: "*/*" }));

// let endpointSecret;
const endpointSecret = "whsec_9b28ee5a84f7fe2021f24da3debda2e499c69af4ac14250433df30f24264f03c";



router.post('/webhook',  (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'];

    let event;
    let data;

    if(endpointSecret) {
        try {
            event = Stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
            // console.log('done' ,event);
        } catch (err) {
            console.log('error', err.message);
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }
        data = event.data.object;
        event = event.type;
    }

    console.log(data,'data');
    console.log(event, 'evento');
    res.send().end();
});



export default router;