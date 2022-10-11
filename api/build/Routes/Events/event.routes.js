"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const event_controller_1 = __importDefault(require("../../controllers/event.controller"));
const Authorization_1 = __importDefault(require("../../Middlewares/Authorization"));
//http://localhost:4000/...
// router.get('/events', eventController.getShowsByArtist);
router.get('/events/eventName', event_controller_1.default.getEventbyName);
router.get('/events/:id', [Authorization_1.default.User], event_controller_1.default.getEventById);
router.post('/events/create', [Authorization_1.default.Artist], event_controller_1.default.createEvent);
exports.default = router;
