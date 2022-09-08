// @ts-nocheck
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({ log: ['query', 'info'] });
import { Response, Request,  NextFunction } from 'express';
import Jwt from 'jsonwebtoken';
import bcryp from 'bcrypt'



export const signUp = async (req: Request, res: Response) => {
    const user = await prisma.users.findFirst({
        where: {
            email: req.body.email
        }
    })
    try {
        if (user) {
            return res.status(400).json({ succes: false, error: "User/Email Already Exists" })
        }
        const hashedPassword = await bcryp.hash(
            req.body.password,
            Number(process.env.SALT_ROUNDS)
        )
        console.log(req.body.rol);
        //guardando el user
        const newUser = await prisma.users.create({
            data: {
                image: req.body.image,
                userName: req.body.userName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPassword,//password cifrada
                phone: req.body.phone,
                city: req.body.city,
                country: req.body.country,
                rol: req.body.rol,
            }
        })
        //creando  el token para el ADMIN:
        try {
            if (newUser.rol === 'ADMIN') {
                const adminToken: string = Jwt.sign({ user_id: newUser.id }, process.env.TOKEN_SECRET_ADMIN!)
                const admin = {
                    fullName: `${user.userName}  ${user.lastName}`,
                    email: user.email,
                    image: user.image
                }
                return res.status(200).json({  data: admin, token: adminToken, rol: newUser.rol })
                // res.status(200).json({data:User, token: adminToken})
                // return res.header('auth-token', adminToken).json({ succes: true, data: newUser.email })
            }
            //creando  el token para el ARTIST:
            if (newUser.rol === 'ARTIST') {
                const artistToken: string = Jwt.sign({ user_id: newUser.id }, process.env.TOKEN_SECRET_ARTIST!)
                const artist = {
                    fullName: `${user.userName}  ${user.lastName}`,
                    email: user.email,
                    image: user.image
                }
                return res.status(200).json({  data: artist, token: artistToken, rol: newUser.rol })
                // return res.header('auth-token', artistToken).json({ succes: true, data: newUser.email })
    
            }
            //creando  el token para el USER:
            if (newUser.rol === 'CONTRACTOR') {
                const accessToken: string = Jwt.sign({ user_id: newUser.id }, process.env.TOKEN_SECRET_CONTRACTOR!)
                const client = {
                    fullName: `${user.userName}  ${user.lastName}`,
                    email: user.email,
                    image: user.image
                }
                return res.status(200).json({  data: client, token: accessToken, rol: newUser.rol })
                // return res.header('auth-token', accessToken).json({ succes: true, data: newUser.email })
            }
            
        } catch (error) {
        return res.status(400).json({ succes: false, error: error })
            
        }
        
    } catch (error) {
        return res.status(400).json({ succes: false, error: 'hola no se que es ' })
    }
}
// export const signUp = async (req: Request, res: Response) => {
//     const user = await prisma.users.findFirst({
//         where: {
//             email: req.body.email
//         }
//     })
//     try {
//         if (user.length < 1) {
//             return res.status(400).json({ succes: false, error: "User/Email Already Exists" })
//         }
//         const hashedPassword = await bcryp.hash(
//             req.body.password,
//             Number(process.env.SALT_ROUNDS)
//         )
//         console.log(req.body.rol);
//         guardando el user
//         const newUser = await prisma.users.create({
//             data: {
//                 image:req.body.image,
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
//         const fullName = `${newUser.userName}  ${newUser.lastName}`
//         creando  el token para el ADMIN:
//         if(newUser.rol === 'ADMIN'){
//             const adminToken:string = Jwt.sign({user_id: newUser.id}, process.env.TOKEN_SECRET_ADMIN | 'admin')
//                 res.status(200).json({ succes: true, data:fullName, token: adminToken, rol:newUser.rol})
//             return res.header('auth-token', adminToken).json({ succes: true, data: newUser.email })
//         }
//         creando  el token para el ARTIST:
//         if(newUser.rol === 'ARTIST'){
//             const artistToken:string = Jwt.sign({user_id: newUser.id}, process.env.TOKEN_SECRET_ARTIST | 'artist')
//                 res.status(200).json({ succes: true, data: fullName, token: artistToken,rol:newUser.rol})
//             return res.header('auth-token', artistToken).json({ succes: true, data: newUser.email })

//         }
//         creando  el token para el USER:
//         if(newUser.rol === 'CONTRACTOR'){const accessToken: string = Jwt.sign({ user_id: newUser.id }, process.env.TOKEN_SECRET_CONTRACTOR | 'contractor')
//         return res.status(200).json({ succes: true, data: fullName, token: accessToken, rol:newUser.rol})
//         return res.header('auth-token', accessToken).json({ succes: true, data: newUser.email })
//     }
//     } catch (error) {
//         return error
//     }
// }


export const signIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: ' Email y Password required' })
        }
        const user = await prisma.users.findUnique({
            where: {
                email: email,
            }
        })
        if (!user) {
            return res.status(404).json({ succes: false, error: 'Email ó Password Incorrecto' })
        }
        const comparePassword = await bcryp.compare(password, user?.password!)
        if (!comparePassword) {
            return res.status(404).json({ succes: false, error: 'Email ó Password Incorrecto' })
        }

         //creando  el token para el ADMIN:
        if(user.rol === 'ADMIN'){
            const adminToken:string = Jwt.sign({user_id: user.id}, process.env.TOKEN_SECRET_ADMIN!)
            const admin = {
                fullName: `${user.userName}  ${user.lastName}`,
                email: user.email,
                image: user.image
            }
            return res.status(200).json({  data: admin, token: adminToken, rol: user.rol})

            // return res.header('auth-token', adminToken).json({ succes: true, data: user.email, rol: user.rol})
        }
        //creando  el token para el ARTIST:
        if(user.rol === 'ARTIST'){
            const artistToken:string = Jwt.sign({user_id: user.id}, process.env.TOKEN_SECRET_ARTIST!)
            const artist = {
                fullName: `${user.userName}  ${user.lastName}`,
                email: user.email,
                image: user.image
            }
            return res.status(200).json({  data: artist, token: artistToken, rol: user.rol})
            //'auth-token', artistToken
            // return res.writeHead(201, {header: artistToken}).json({ succes: true, data: user.email, rol: user.rol })
        }
        //creando  el token para el CONTRACTOR:
        if(user.rol === 'CONTRACTOR'){
            const token = Jwt.sign({ user_id: user?.id }, process.env.TOKEN_SECRET_CONTRACTOR!)
            const client = {
                fullName: `${user.userName}  ${user.lastName}`,
                email: user.email,
                image: user.image
            }
            return res.status(200).json({  data: client, token: token, rol: user.rol})
            // return res.status(200).header('auth-token', token).json({ succes: true, data: user.email, rol: user.rol })
        }
    } catch (error) {
        return res.status(404).json({ succes: false, error: 'Error Server' })
    }
}




export const soloAdmin = async (req: Request, res: Response ,next:NextFunction) => {
    
    try {
    
        const admin = await prisma.users.findUnique({
            where:{
                id: req.user_id
            }
        })
        if(!admin){
            
             res.status(201).json({ message: 'error token : no hay usuarios ' })//borrado logico*
        }
        if(admin.rol === 'ADMIN') return next()
        else{
            return res.send(false)
        }
    } catch (error) {
        return error
    }
}

export const soloArtist = async (_req: Request, res: Response) => {
    res.status(201).json({ data: 'hola desde solo artist' })
}

export const soloContractror = async (_req: Request, res: Response) => {
    res.status(201).json({ data: 'hola desde solo contractor' })
}