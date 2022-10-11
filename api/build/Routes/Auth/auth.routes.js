"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // ESModules
const router = express_1.default.Router();
const auth_controller_1 = __importDefault(require("../../controllers/auth.controller"));
const Authorization_1 = __importDefault(require("../../Middlewares/Authorization"));
//http://localhost:4000/...
router.post('/signup', auth_controller_1.default.signUp);
router.post('/signin', auth_controller_1.default.signIn);
router.get('/soloadmin', [Authorization_1.default.Admin], auth_controller_1.default.Admin);
router.get('/soloartist', [Authorization_1.default.Artist], auth_controller_1.default.Artist);
router.get('/solocontractor', [Authorization_1.default.User], auth_controller_1.default.User);
exports.default = router;
