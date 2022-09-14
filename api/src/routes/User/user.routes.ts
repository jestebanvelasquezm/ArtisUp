import { Router } from 'express';
const router = Router();
import Authorization from '../../Middlewares/Authorization'
import userController from "../../controllers/user.controller";

// router.get('/users', [Authorization.User],userController.getUsers);
router.get('/users',userController.getUsers);
router.get('/users/:id', [Authorization.User],userController.getUserId)
router.patch('/users/update/:id', [Authorization.User],userController.avaliableUser);
// router.post('/users/register', userController.registerUser);


export default router;