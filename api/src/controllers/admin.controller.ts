// @ts-nocheck
import { PrismaClient } from '@prisma/client';
import { Response, Request } from 'express';
const prisma = new PrismaClient({ log: ['query', 'info'] });


const adminController = {
    getAdmins: async (_req: Request, res: Response) => {
        try {
            const allAdmins = await prisma.users.findMany({where:{rol : 'ADMIN'}})
            if(allAdmins.length > 0){
                res.status(201).json({ data: allAdmins })
            }else {
                res.status(404).json({message: 'no hay usuarios registrados'})
            }
            
        } catch (error) {
            res.status(400).json({message: error})
        }
    },
    getAdminId: async (_req: Request, res: Response) => {
        try {
            const admin = await prisma.users.findUnique({where:{id : req.params.id}})
            if(admin.length > 0){
                res.status(201).json({ data: admin })
            }else {
                res.status(404).json({message: 'no hay usuarios registrados'})
            }
            
        } catch (error) {
            res.status(400).json({message: error})
        }
    },
    profileAdmin: async (req: Request, res: Response) =>{
        try {
        const user = await prisma.users.findUnique({
            where:{id: req.user_id}
        })
            if(!user){
                res.status(400).json({succes:false, message:'no existe usuario con esa id'})
            }else{
                res.status(200).json({succes:true, data:user})
            }
        } catch (error) {
            res.status(400).json({succes:false, message:error})
        }

    },
    avaliableAdmin: async (req: Request, res: Response) =>{
        const {boolean} = req.body
        try {
            const user = await prisma.users.update({
                where: { id: req.params.id },
                data: { available: boolean }
                })
                res.status(200).json({data:user})
        } catch (error) {
            res.status(400).json({data:error})
        }
    },
    registerAdmin: async (_req: Request, _res: Response) => {

        const newUser = await prisma.users.create({
            data: {
                image: req.body.image,
                nickName: req.body.nickName,
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
        res.status(200).json({ data: newUser })
        return newUser
    }
}

export default adminController;








