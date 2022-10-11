"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // ESModules
const router = express_1.default.Router();
const artist_controller_1 = __importDefault(require("../../controllers/artist.controller"));
const Authorization_1 = __importDefault(require("../../Middlewares/Authorization"));
//http://localhost:4000/...
// router.post('/signup' , signUp )
// router.get('/artist/all' , [Authorization.Artist] , artistController.all )//todos los artistas
router.get('/artist/all', artist_controller_1.default.all); //todos los artistas
router.get('/artist', artist_controller_1.default.name); //proteger para el ruteo// por nombre
router.get('/artist/profile', [Authorization_1.default.Artist], artist_controller_1.default.profile);
router.post('/artist/create', [Authorization_1.default.Artist], artist_controller_1.default.createEvent);
// router.get('/soloadmin', [Admin], soloAdmin)
// router.get('/soloartist', [Artist], soloArtist)
// router.get('/solocontractor' , [Contractor],  soloContractror )
exports.default = router;
