import express from "express";// ESModules
const router = express.Router();
import artistController from '../../controllers/artist.controller';
import  Authorization  from '../../Middlewares/Authorization'



//http://localhost:4000/...
// router.post('/signup' , signUp )
// router.get('/artist/all' , [Authorization.Artist] , artistController.all )//todos los artistas
router.get('/artist/all'  , artistController.all )//todos los artistas
router.get('/artist',[Authorization.Artist]  , artistController.name )//proteger para el ruteo// por nombre
router.get('/artist/profile' , [Authorization.Artist] , artistController.profile )
router.post('/artist/create' , [Authorization.Artist] , artistController.createEvent )




// router.get('/soloadmin', [Admin], soloAdmin)
// router.get('/soloartist', [Artist], soloArtist)
// router.get('/solocontractor' , [Contractor],  soloContractror )






export default router;