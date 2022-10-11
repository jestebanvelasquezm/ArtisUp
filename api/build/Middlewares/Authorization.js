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
//@ts-nocheck
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({ log: ['query',] });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Authorization = {
    Admin: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const headerToken = req.get("Authorization");
            if (!headerToken) {
                res.status(400).json({ succes: false, error: 'Token no valido' });
            }
            const token = headerToken === null || headerToken === void 0 ? void 0 : headerToken.replace("Bearer ", "");
            try {
                const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET_ADMIN); // ! asegurar que va a llegar
                console.log(decoded.user_id); // = {id: 8278372837bjhjdhsjd, iit}
                const user = yield prisma.users.findUnique({
                    id: decoded.user_id
                });
                user.rol === 'ADMIN' ? req.user_id = decoded.user_id : res.status(400).json({ mesagge: 'No tienes acceso' });
                next();
            }
            catch (error) {
                console.log(error);
                return res.status(400).json({ mesagge: error });
            }
        }
        catch (error) {
            return res.status(400).json({ mesagge: error });
        }
    }),
    Artist: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const headerToken = req.get("Authorization");
            if (!headerToken) {
                res.status(400).json({ succes: false, error: 'Token no valido' });
            }
            const token = headerToken === null || headerToken === void 0 ? void 0 : headerToken.replace("Bearer ", "");
            try {
                const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET_ARTIST); // ! asegurar que va a llegar
                console.log(decoded.user_id); // = {id: 8278372837bjhjdhsjd, iit}
                const user = yield prisma.users.findUnique({ where: { id: `${decoded.user_id}` } });
                if (!user)
                    return res.status(400).json({ succes: false, error: 'no hay usuario' });
                user.rol === 'ARTIST' ? req.user_id = decoded.user_id : res.status(400).json({ mesagge: 'No tienes acceso' });
                next();
            }
            catch (error) {
                console.log(error);
                return res.status(400).json({ mesagge: error });
            }
        }
        catch (error) {
            return res.status(400).json({ mesagge: error });
        }
    }),
    User: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const headerToken = req.get('Authorization');
            if (!headerToken) {
                res.status(400).json({ succes: false, error: 'Token no valido' });
            }
            const token = headerToken === null || headerToken === void 0 ? void 0 : headerToken.replace("Bearer ", "");
            console.log(token, 'TOKEN!');
            try {
                const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET_USER);
                console.log(decoded.user_id);
                const user = yield prisma.users.findUnique({ where: { id: `${decoded.user_id}` } });
                user.rol === 'USER' ? req.user_id = decoded.user_id : res.status(400).json({ mesagge: 'No tienes acceso' });
                next();
            }
            catch (error) {
                return res.status(400).json({ mesagge: error });
            }
        }
        catch (error) {
            return res.status(400).json({ mesagge: error });
        }
    })
};
exports.default = Authorization;
// export const Admin = async  (req:Request, res:Response, next:NextFunction): Promise<void> => {
//     try {
//         const headerToken = req.get("Authorization");
//         if(!headerToken){
//             res.status(400).json({succes: false, error: 'Token no valido'})
//         }
//         const token:any = headerToken?.replace("Bearer ", "");
//         try {
//             const decoded:any =  Jwt.verify(token, process.env.TOKEN_SECRET_ADMIN! )// ! asegurar que va a llegar
//             console.log(decoded.user_id); // = {id: 8278372837bjhjdhsjd, iit}
//             const user = await prisma.users.findUnique({
//                 id :decoded.user_id
//             })
//             user.rol === 'USER' ? req.user_id = decoded.user_id : res.status(400).json({mesagge:'No tienes acceso'})
//             next()
//         } catch (error) {
//             console.log(error);
//             return res.status(400).json({mesagge:error})
//         }
//     } catch (error) {
//         return res.status(400).json({mesagge:error})
//     }
// }
// export const Artist = async  (req:Request, res:Response, next:NextFunction): Promise<void> => {
//     try {
//         const headerToken = req.get("Authorization");
//         if(!headerToken){
//             res.status(400).json({succes: false, error: 'Token no valido'})
//         }
//         const token:any = headerToken?.replace("Bearer ", "");
//         try {
//             const decoded:any =  Jwt.verify(token, process.env.TOKEN_SECRET_ARTIST! )// ! asegurar que va a llegar
//             console.log(decoded.user_id); // = {id: 8278372837bjhjdhsjd, iit}
//             const user = await prisma.users.findUnique({
//                 id :decoded.user_id
//             })
//             user.rol === 'ARTIST' ? req.user_id = decoded.user_id : res.status(400).json({mesagge:'No tienes acceso'})
//             next()
//         } catch (error) {
//             console.log(error);
//             return res.status(400).json({mesagge:error})
//         }
//     } catch (error) {
//         return res.status(400).json({mesagge:error})
//     }
// }
// export const Contractor = async  (req:Request, res:Response, next:NextFunction): Promise<void> => {
//     try {
//         const headerToken = req.get("Authorization");
//         if(!headerToken){
//             res.status(400).json({succes: false, error: 'Token no valido'})
//         }
//         const token = headerToken?.replace("Bearer ", "");
//         try {
//             const decoded = Jwt.verify(token!, process.env.TOKEN_SECRET_USER! )//asegurar que va a llegar
//             const user = await prisma.users.findUnique({
//                 id :decoded.user_id
//             })
//             user.rol === 'USER' ? req.user_id = decoded.user_id : res.status(400).json({mesagge:'No tienes acceso'})
//             next()
//         } catch (error) {
//             return res.status(400).json({mesagge:error})
//         }
//     } catch (error) {
//         return res.status(400).json({mesagge:error})
//     }
// }
