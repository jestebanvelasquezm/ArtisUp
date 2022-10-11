"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({ log: ['query', 'info'] });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const authController = {
    signUp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield prisma.users.findFirst({
                where: {
                    email: req.body.email
                }
            });
            if (user) {
                return res.status(400).json({ succes: false, error: "User/Email Already Exists" });
            }
            const hashedPassword = yield bcrypt_1.default.hash(req.body.password, Number(process.env.SALT_ROUNDS));
            console.log(req.body.rol);
            //guardando el user
            try {
                const newUser = yield prisma.users.create({
                    data: {
                        image: req.body.image,
                        nickName: req.body.nickName,
                        userName: req.body.userName,
                        email: req.body.email,
                        password: hashedPassword,
                        phone: Number(req.body.phone),
                        city: req.body.city,
                        country: req.body.country,
                        rol: req.body.rol,
                    }
                });
                console.log(newUser, 'Usuarioooo');
                // if(!newUser) return res.status(400).json({error})
                // const fullName = `${newUser.userName}  ${newUser.lastName}`
                //creando  el token para el ADMIN:
                if (newUser.rol === 'ADMIN') {
                    const data = {
                        userName: newUser.userName,
                        email: newUser.email,
                        image: newUser.image
                    };
                    const adminToken = jsonwebtoken_1.default.sign({ user_id: newUser.id }, process.env.TOKEN_SECRET_ADMIN);
                    return res.status(200).json({ succes: true, data: data, token: adminToken, rol: newUser.rol });
                    // return res.header('auth-token', adminToken).json({ succes: true, data: newUser.email })
                }
                console.log(newUser.id);
                //creando  el token para el ARTIST:
                if (newUser.rol === 'ARTIST') {
                    const data = {
                        userName: newUser.userName,
                        email: newUser.email,
                        image: newUser.image
                    };
                    const artistToken = jsonwebtoken_1.default.sign({ user_id: newUser.id }, process.env.TOKEN_SECRET_ARTIST);
                    return res.status(200).json({ succes: true, data: data, token: artistToken, rol: newUser.rol });
                    // return res.header('auth-token', artistToken).json({ succes: true, data: newUser.email })
                }
                //creando  el token para el USER:
                if (newUser.rol === 'USER') {
                    const data = {
                        userName: newUser.userName,
                        email: newUser.email,
                        image: newUser.image
                    };
                    const accessToken = jsonwebtoken_1.default.sign({ user_id: newUser.id }, process.env.TOKEN_SECRET_USER);
                    return res.status(200).json({ succes: true, data: data, token: accessToken, rol: newUser.rol });
                    // return res.header('auth-token', accessToken).json({ succes: true, data: newUser.email })
                }
            }
            catch (error) {
                console.log(error);
                return res.status(400).json({ data: error, });
            }
            return res.status(200).json({ data: 'holaaaa' });
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }),
    // signUp : async (req: Request, res: Response) => {
    //     try {
    //         const user = await prisma.users.findFirst({
    //             where: {
    //                 email: req.body.email
    //             }
    //         })
    //         if (user) {
    //             return res.status(400).json({ succes: false, error: "User/Email Already Exists" })
    //         }
    //         const hashedPassword = await bcryp.hash(
    //             req.body.password,
    //             Number(process.env.SALT_ROUNDS)
    //         )
    //         //guardando el user
    //         const newUser = await prisma.users.create({
    //             data: {
    //                 image: req.body.image,
    //                 nickName: req.body.nickName,
    //                 userName: req.body.userName,
    //                 lastName: req.body.lastName,
    //                 email: req.body.email,
    //                 password: hashedPassword,//password cifrada
    //                 phone: req.body.phone,
    //                 city: req.body.city,
    //                 country: req.body.country,
    //                 rol: req.body.rol,
    //             }
    //         })
    //         //creando  el token para el ADMIN:
    //         if (newUser.rol === 'ADMIN') {
    //             const adminToken: string = Jwt.sign({ user_id: newUser.id }, process.env.TOKEN_SECRET_ADMIN!)
    //             const admin = {
    //                 fullName: `${user.userName}  ${user.lastName}`,
    //                 email: user.email,
    //                 image: user.image
    //             }
    //             return res.status(200).json({  data: admin, token: adminToken, rol: newUser.rol })
    //             // res.status(200).json({data:User, token: adminToken})
    //             // return res.header('auth-token', adminToken).json({ succes: true, data: newUser.email })
    //         }
    //         //creando  el token para el ARTIST:
    //         if (newUser.rol === 'ARTIST') {
    //             const artistToken: string = Jwt.sign({ user_id: newUser.id }, process.env.TOKEN_SECRET_ARTIST!)
    //             const artist = {
    //                 fullName: `${user.userName}  ${user.lastName}`,
    //                 email: user.email,
    //                 image: user.image
    //             }
    //             return res.status(200).json({  data: artist, token: artistToken, rol: newUser.rol })
    //             // return res.header('auth-token', artistToken).json({ succes: true, data: newUser.email })
    //         }
    //         //creando  el token para el USER:
    //         if (newUser.rol === 'USER') {
    //             const accessToken: string = Jwt.sign({ user_id: newUser.id }, process.env.TOKEN_SECRET_USER!)
    //             const client = {
    //                 fullName: `${user.userName}  ${user.lastName}`,
    //                 email: user.email,
    //                 image: user.image
    //             }
    //             console.log(newUser);
    //                 return res.status(200).json({  data: client, token: accessToken, rol: newUser.rol })
    //                 // return res.header('auth-token', accessToken).json({ succes: true, data: newUser.email })
    //             }
    //     } catch (error) {
    //         return res.status(400).json({ succes: false, error: 'hola no se que es ' })
    //     }
    // },
    signIn: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: ' Email y Password required' });
            }
            const user = yield prisma.users.findUnique({
                where: {
                    email: email,
                }
            });
            if (!user) {
                return res.status(404).json({ succes: false, error: 'Email ó Password Incorrecto' });
            }
            const comparePassword = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
            if (!comparePassword) {
                return res.status(404).json({ succes: false, error: 'Email ó Password Incorrecto' });
            }
            //creando  el token para el ADMIN:
            if (user.rol === 'ADMIN') {
                const adminToken = jsonwebtoken_1.default.sign({ user_id: user.id }, process.env.TOKEN_SECRET_ADMIN);
                const data = {
                    userName: user.userName,
                    email: user.email,
                    image: user.image
                };
                return res.status(200).json({ data: data, token: adminToken, rol: user.rol });
                // return res.header('auth-token', adminToken).json({ succes: true, data: user.email, rol: user.rol})
            }
            //creando  el token para el ARTIST:
            if (user.rol === 'ARTIST') {
                const artistToken = jsonwebtoken_1.default.sign({ user_id: user.id }, process.env.TOKEN_SECRET_ARTIST);
                const data = {
                    userName: user.userName,
                    email: user.email,
                    image: user.image
                };
                return res.status(200).json({ data: data, token: artistToken, rol: user.rol });
                //'auth-token', artistToken
                // return res.writeHead(201, {header: artistToken}).json({ succes: true, data: user.email, rol: user.rol })
            }
            //creando  el token para el CONTRACTOR:
            if (user.rol === 'USER') {
                const token = jsonwebtoken_1.default.sign({ user_id: user === null || user === void 0 ? void 0 : user.id }, process.env.TOKEN_SECRET_USER);
                const data = {
                    userName: user.userName,
                    email: user.email,
                    image: user.image
                };
                return res.status(200).json({ data: data, token: token, rol: user.rol });
                // return res.status(200).header('auth-token', token).json({ succes: true, data: user.email, rol: user.rol })
            }
        }
        catch (error) {
            return res.status(404).json({ succes: false, error: 'Error Server' });
        }
    }),
    Admin: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const admin = yield prisma.users.findUnique({
                where: {
                    id: req.user_id
                }
            });
            if (!admin) {
                res.status(201).json({ message: 'error token : no hay usuarios ' }); //borrado logico*
            }
            if (admin.rol === 'ADMIN')
                return next();
            else {
                return res.send(false);
            }
        }
        catch (error) {
            return error;
        }
    }),
    Artist: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.status(201).json({ data: 'hola desde solo artist' });
    }),
    User: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.status(201).json({ data: 'hola desde solo contractor' });
    })
};
exports.default = authController;
// export const signUp = async (req: Request, res: Response) => {
//     const user = await prisma.users.findFirst({
//         where: {
//             email: req.body.email
//         }
//     })
//     try {
//         if (user) {
//             return res.status(400).json({ succes: false, error: "User/Email Already Exists" })
//         }
//         const hashedPassword = await bcryp.hash(
//             req.body.password,
//             Number(process.env.SALT_ROUNDS)
//         )
//         //guardando el user
//         const newUser = await prisma.users.create({
//             data: {
//                 image: req.body.image,
//                 nickName: req.body.nickName,
//                 userName: req.body.userName,
//                 lastName: req.body.lastName,
//                 email: req.body.email,
//                 password: hashedPassword,//password cifrada
//                 phone: req.body.phone,
//                 city: req.body.city,
//                 country: req.body.country,
//                 rol: req.body.rol,
//             }
//         })
//         //creando  el token para el ADMIN:
//         try {
//             if (newUser.rol === 'ADMIN') {
//                 const adminToken: string = Jwt.sign({ user_id: newUser.id }, process.env.TOKEN_SECRET_ADMIN!)
//                 const admin = {
//                     fullName: `${user.userName}  ${user.lastName}`,
//                     email: user.email,
//                     image: user.image
//                 }
//                 return res.status(200).json({  data: admin, token: adminToken, rol: newUser.rol })
//                 // res.status(200).json({data:User, token: adminToken})
//                 // return res.header('auth-token', adminToken).json({ succes: true, data: newUser.email })
//             }
//             //creando  el token para el ARTIST:
//             if (newUser.rol === 'ARTIST') {
//                 const artistToken: string = Jwt.sign({ user_id: newUser.id }, process.env.TOKEN_SECRET_ARTIST!)
//                 const artist = {
//                     fullName: `${user.userName}  ${user.lastName}`,
//                     email: user.email,
//                     image: user.image
//                 }
//                 return res.status(200).json({  data: artist, token: artistToken, rol: newUser.rol })
//                 // return res.header('auth-token', artistToken).json({ succes: true, data: newUser.email })
//             }
//             //creando  el token para el USER:
//             if (newUser.rol === 'USER') {
//                 const accessToken: string = Jwt.sign({ user_id: newUser.id }, process.env.TOKEN_SECRET_USER!)
//                 const client = {
//                     fullName: `${user.userName}  ${user.lastName}`,
//                     email: user.email,
//                     image: user.image
//                 }
//                 return res.status(200).json({  data: client, token: accessToken, rol: newUser.rol })
//                 // return res.header('auth-token', accessToken).json({ succes: true, data: newUser.email })
//             }
//         } catch (error) {
//         return res.status(400).json({ succes: false, error: error })
//         }
//     } catch (error) {
//         return res.status(400).json({ succes: false, error: 'hola no se que es ' })
//     }
// }
// // export const signUp = async (req: Request, res: Response) => {
// //     const user = await prisma.users.findFirst({
// //         where: {
// //             email: req.body.email
// //         }
// //     })
// //     try {
// //         if (user.length < 1) {
// //             return res.status(400).json({ succes: false, error: "User/Email Already Exists" })
// //         }
// //         const hashedPassword = await bcryp.hash(
// //             req.body.password,
// //             Number(process.env.SALT_ROUNDS)
// //         )
// //         console.log(req.body.rol);
// //         guardando el user
// //         const newUser = await prisma.users.create({
// //             data: {
// //                 image:req.body.image,
// //                 userName: req.body.userName,
// //                 lastName: req.body.lastName,
// //                 email: req.body.email,
// //                 password: hashedPassword,//password cifrada
// //                 phone: req.body.phone,
// //                 city: req.body.city,
// //                 country: req.body.country,
// //                 rol: req.body.rol,
// //             }
// //         })
// //         const fullName = `${newUser.userName}  ${newUser.lastName}`
// //         creando  el token para el ADMIN:
// //         if(newUser.rol === 'ADMIN'){
// //             const adminToken:string = Jwt.sign({user_id: newUser.id}, process.env.TOKEN_SECRET_ADMIN | 'admin')
// //                 res.status(200).json({ succes: true, data:fullName, token: adminToken, rol:newUser.rol})
// //             return res.header('auth-token', adminToken).json({ succes: true, data: newUser.email })
// //         }
// //         creando  el token para el ARTIST:
// //         if(newUser.rol === 'ARTIST'){
// //             const artistToken:string = Jwt.sign({user_id: newUser.id}, process.env.TOKEN_SECRET_ARTIST | 'artist')
// //                 res.status(200).json({ succes: true, data: fullName, token: artistToken,rol:newUser.rol})
// //             return res.header('auth-token', artistToken).json({ succes: true, data: newUser.email })
// //         }
// //         creando  el token para el USER:
// //         if(newUser.rol === 'CONTRACTOR'){const accessToken: string = Jwt.sign({ user_id: newUser.id }, process.env.TOKEN_SECRET_CONTRACTOR | 'contractor')
// //         return res.status(200).json({ succes: true, data: fullName, token: accessToken, rol:newUser.rol})
// //         return res.header('auth-token', accessToken).json({ succes: true, data: newUser.email })
// //     }
// //     } catch (error) {
// //         return error
// //     }
// // }
// export const signIn = async (req: Request, res: Response) => {
//     try {
//         const { email, password } = req.body
//         if (!email || !password) {
//             return res.status(400).json({ error: ' Email y Password required' })
//         }
//         const user = await prisma.users.findUnique({
//             where: {
//                 email: email,
//             }
//         })
//         if (!user) {
//             return res.status(404).json({ succes: false, error: 'Email ó Password Incorrecto' })
//         }
//         const comparePassword = await bcryp.compare(password, user?.password!)
//         if (!comparePassword) {
//             return res.status(404).json({ succes: false, error: 'Email ó Password Incorrecto' })
//         }
//          //creando  el token para el ADMIN:
//         if(user.rol === 'ADMIN'){
//             const adminToken:string = Jwt.sign({user_id: user.id}, process.env.TOKEN_SECRET_ADMIN!)
//             const admin = {
//                 fullName: `${user.userName}  ${user.lastName}`,
//                 email: user.email,
//                 image: user.image
//             }
//             return res.status(200).json({  data: admin, token: adminToken, rol: user.rol})
//             // return res.header('auth-token', adminToken).json({ succes: true, data: user.email, rol: user.rol})
//         }
//         //creando  el token para el ARTIST:
//         if(user.rol === 'ARTIST'){
//             const artistToken:string = Jwt.sign({user_id: user.id}, process.env.TOKEN_SECRET_ARTIST!)
//             const artist = {
//                 fullName: `${user.userName}  ${user.lastName}`,
//                 email: user.email,
//                 image: user.image
//             }
//             return res.status(200).json({  data: artist, token: artistToken, rol: user.rol})
//             //'auth-token', artistToken
//             // return res.writeHead(201, {header: artistToken}).json({ succes: true, data: user.email, rol: user.rol })
//         }
//         //creando  el token para el CONTRACTOR:
//         if(user.rol === 'USER'){
//             const token = Jwt.sign({ user_id: user?.id }, process.env.TOKEN_SECRET_USER!)
//             const client = {
//                 fullName: `${user.userName}  ${user.lastName}`,
//                 email: user.email,
//                 image: user.image
//             }
//             return res.status(200).json({  data: client, token: token, rol: user.rol})
//             // return res.status(200).header('auth-token', token).json({ succes: true, data: user.email, rol: user.rol })
//         }
//     } catch (error) {
//         return res.status(404).json({ succes: false, error: 'Error Server' })
//     }
// }
// export const soloAdmin = async (req: Request, res: Response ,next:NextFunction) => {
//     try {
//         const admin = await prisma.users.findUnique({
//             where:{
//                 id: req.user_id
//             }
//         })
//         if(!admin){
//             res.status(201).json({ message: 'error token : no hay usuarios ' })//borrado logico*
//         }
//         if(admin.rol === 'ADMIN') return next()
//         else{
//             return res.send(false)
//         }
//     } catch (error) {
//         return error
//     }
// }
// export const soloArtist = async (_req: Request, res: Response) => {
//     res.status(201).json({ data: 'hola desde solo artist' })
// }
// export const soloContractror = async (_req: Request, res: Response) => {
//     res.status(201).json({ data: 'hola desde solo contractor' })
// }
