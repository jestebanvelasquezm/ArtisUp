"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const express_1 = require("express");
const router = (0, express_1.Router)();
const Authorization_1 = __importDefault(require("../../Middlewares/Authorization"));
const user_controller_1 = __importDefault(require("../../controllers/user.controller"));
const body_parser_1 = __importDefault(require("body-parser"));
// router.get('/users', [Authorization.User],userController.getUsers);
router.get('/users/profile', [Authorization_1.default.User], user_controller_1.default.getProfile);
router.get('/users', user_controller_1.default.getUsers);
router.get('/users/:id', user_controller_1.default.getUserId);
router.patch('/users/update/:id', [Authorization_1.default.User], user_controller_1.default.avaliableUser);
router.post('/user/create-order', [Authorization_1.default.User], user_controller_1.default.generateOrder);
router.post('/webhook', body_parser_1.default.raw({ type: "*/*" }), user_controller_1.default.hooksStripe);
router.get('/user/payments/success/:id', [Authorization_1.default.User], user_controller_1.default.succesPayment);
router.get('/user/payments', [Authorization_1.default.User], user_controller_1.default.payments);
router.post('/user/email', user_controller_1.default.email);
exports.default = router;
