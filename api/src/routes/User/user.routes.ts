import { Router } from 'express';
const router = Router();

import userController from "../../controllers/user.controller";

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserId)
router.put('/users/update/:id', userController.avaliableUser);
// router.post('/users/register', userController.registerUser);


export default router;