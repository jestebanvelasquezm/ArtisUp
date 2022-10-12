"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
//Importar todos los routers
const auth_routes_1 = __importDefault(require("./Auth/auth.routes"));
const admin_routes_1 = __importDefault(require("./Admin/admin.routes"));
const artist_routes_1 = __importDefault(require("./Artist/artist.routes"));
const user_routes_1 = __importDefault(require("./User/user.routes"));
const event_routes_1 = __importDefault(require("./Events/event.routes"));
const category_routes_1 = __importDefault(require("./Category/category.routes"));
const buy_routes_1 = __importDefault(require("./Shopping/buy.routes"));
router.use('/', auth_routes_1.default);
router.use('/', admin_routes_1.default);
router.use('/', artist_routes_1.default);
router.use('/', user_routes_1.default);
router.use('/', event_routes_1.default);
router.use('/', category_routes_1.default);
router.use('/', buy_routes_1.default);
// exports.default = router;
module.exports = {router};
