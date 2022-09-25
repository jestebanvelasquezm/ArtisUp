import { Router } from 'express';
const router = Router();

import eventController from "../../controllers/event.controller";
import Authorization from '../../Middlewares/Authorization'

//http://localhost:4000/...
// router.get('/events', eventController.getShowsByArtist);
router.get('/events/eventName', eventController.getEventbyName);
router.get('/events/:id',[Authorization.User], eventController.getEventById);
router.post('/events/create',[Authorization.Artist], eventController.createEvent);


export default router;



