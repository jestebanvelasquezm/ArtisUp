const { Router } = require('express');
const router = Router();

//Importar todos los routers
import Auth from './Auth/auth.routes';
import Admin from './Admin/admin.routes';
import Artist from './Artist/artist.routes';
import User from './User/user.routes';
import Event from './Events/event.routes';
import Category from './Category/category.routes';
import shopping from './Shopping/buy.routes';




router.use('/', Auth)
router.use('/', Admin)
router.use('/', Artist)
router.use('/', User)
router.use('/', Event)
router.use('/', Category)
router.use('/',shopping)


export default router;