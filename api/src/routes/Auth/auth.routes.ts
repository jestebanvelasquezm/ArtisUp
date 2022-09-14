import express from "express";// ESModules
const router = express.Router();
import  authController from '../../controllers/auth.controller';
import Authorization from '../../Middlewares/Authorization'



//http://localhost:4000/...
router.post('/signup' , authController.signUp )
router.post('/signin' , authController.signIn )
router.get('/soloadmin', [Authorization.Admin], authController.Admin)
router.get('/soloartist', [Authorization.Artist], authController.Artist)
router.get('/solocontractor' , [Authorization.User],  authController.User )






export default router;