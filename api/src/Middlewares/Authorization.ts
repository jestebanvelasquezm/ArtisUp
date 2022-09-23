//@ts-nocheck
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({ log: ['query', ] });
import {Request, Response, NextFunction} from 'express'
import  Jwt  from 'jsonwebtoken';


const Authorization = {
    Admin : async  (req:Request, res:Response, next:NextFunction): Promise<void> => {
        try {
            const headerToken = req.get("Authorization");
            if(!headerToken){
                res.status(400).json({succes: false, error: 'Token no valido'})
            }
            const token:any = headerToken?.replace("Bearer ", "");
            try {
                const decoded:any =  Jwt.verify(token, process.env.TOKEN_SECRET_ADMIN! )// ! asegurar que va a llegar
                console.log(decoded.user_id); // = {id: 8278372837bjhjdhsjd, iit}
                const user = await prisma.users.findUnique({
                    id :decoded.user_id
                })
                user.rol === 'ADMIN' ? req.user_id = decoded.user_id : res.status(400).json({mesagge:'No tienes acceso'})
                next()
            } catch (error) {
                console.log(error);
                return res.status(400).json({mesagge:error})
            }
        } catch (error) {
            return res.status(400).json({mesagge:error})
        }
    },
    Artist : async  (req:Request, res:Response, next:NextFunction): Promise<void> => {
        try {
            const headerToken = req.get("Authorization");
            if(!headerToken){
                res.status(400).json({succes: false, error: 'Token no valido'})
            }
            const token:any = headerToken?.replace("Bearer ", "");
            try {
                const decoded:any =  Jwt.verify(token, process.env.TOKEN_SECRET_ARTIST! )// ! asegurar que va a llegar
                console.log(decoded.user_id); // = {id: 8278372837bjhjdhsjd, iit}
                const user = await prisma.users.findUnique({where: {id : `${decoded.user_id}`}})
                if(!user) return res.status(400).json({succes: false, error: 'no hay usuario'})
                user.rol === 'ARTIST' ? req.user_id = decoded.user_id : res.status(400).json({mesagge:'No tienes acceso'})
                next()
            } catch (error) {
                console.log(error);
                return res.status(400).json({mesagge:error})
            }
        } catch (error) {
            return res.status(400).json({mesagge:error})
        }
    },
    User : async  (req:Request, res:Response, next:NextFunction): Promise<void> => {

        try {
            const headerToken = req.get('Authorization');
            if(!headerToken){
                    res.status(400).json({succes: false, error: 'Token no valido'})
                }
            const token:any = headerToken?.replace("Bearer ", "");
            try {
                const decoded:any =  Jwt.verify(token, process.env.TOKEN_SECRET_USER! )
            console.log(decoded.user_id);
            const user = await prisma.users.findUnique({where: {id : `${decoded.user_id}`}})
                user.rol === 'USER' ? req.user_id = decoded.user_id : res.status(400).json({mesagge:'No tienes acceso'})
                next()
            } catch (error) {
            return res.status(400).json({mesagge:error})
            }

        } catch (error) {
            return res.status(400).json({mesagge:error})
        }
    }
}

export default Authorization;

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

