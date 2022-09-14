import express from "express";// ESModules
const router = express.Router();
import adminController from '../../controllers/admin.controller';
import Authorization from '../../Middlewares/Authorization'



//http://localhost:4000/...
router.get('/admin' , [Authorization.Admin], adminController.profileAdmin  )
router.get('//admin/all', [Authorization.Admin] , adminController.getAdmins )
router.post('/admin/create' , [Authorization.Admin], adminController.registerAdmin )
router.get('/admin/:id', [Authorization.Admin] , adminController.getAdminId )


export default router;
