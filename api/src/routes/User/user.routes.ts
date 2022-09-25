import { Router } from 'express';
const router = Router();
import Authorization from '../../Middlewares/Authorization'
import userController from "../../controllers/user.controller";

// router.get('/users', [Authorization.User],userController.getUsers);
router.get('/users/profile',[Authorization.User],userController.getProfile);
router.get('/users',userController.getUsers);
router.get('/users/:id',userController.getUserId)
router.patch('/users/update/:id', [Authorization.User],userController.avaliableUser);
router.post('/user/create-order' , [Authorization.User], userController.generateOrder )
// router.post('/user/buy/:id' ,[Authorization.User], userController.buy )
// router.post('/user/cancel/:id' ,[Authorization.User], userController.buy )//redireccionar 

// router.post('/users/register', userController.registerUser);


export default router;