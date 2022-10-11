"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // ESModules
const router = express_1.default.Router();
const admin_controller_1 = __importDefault(require("../../controllers/admin.controller"));
const Authorization_1 = __importDefault(require("../../Middlewares/Authorization"));
//http://localhost:4000/...
router.get('/admin', [Authorization_1.default.Admin], admin_controller_1.default.profileAdmin);
router.get('//admin/all', [Authorization_1.default.Admin], admin_controller_1.default.getAdmins);
router.post('/admin/create', [Authorization_1.default.Admin], admin_controller_1.default.registerAdmin);
router.get('/admin/:id', [Authorization_1.default.Admin], admin_controller_1.default.getAdminId);
exports.default = router;
