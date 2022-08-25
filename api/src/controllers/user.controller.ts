import { PrismaClient } from '@prisma/client';
import { Response, Request } from 'express';
const prisma = new PrismaClient({ log: ['query', 'info'] });


const userController = {
    getUsers: async (_req: Request, res: Response) => {
        try {
            const allUsers = await prisma.users.findMany()
            if(allUsers.length > 0){
                res.status(201).json({ data: allUsers })
            }else {
                res.status(404).json({message: 'no hay usuarios registrados'})
            }
            
        } catch (error) {
            res.status(400).json({message: error})
        }
    },
    getUserId: async (req: Request, res: Response) =>{
        const {id} = req.params
        const user = await prisma.users.findUnique({
            where:{id: id},
            include:{
                shows:{
                    select:{
                        show:true
                    }
                }

            }
        })
        try {
            if(!user){
                res.status(400).json({succes:false, message:'no existe usuario con esa id'})
            }else{
                res.status(200).json({succes:true, data:user})
            }
        } catch (error) {
            res.status(400).json({succes:false, message:error})
        }

    },
    avaliableUser: async (req: Request, res: Response) =>{
        const {id} = req.params
        const {boolean} = req.body
        // const user = await prisma.users.findUnique({where: {id}})
        try {
            const user = await prisma.users.update({
                where: { id: id },
                data: { available: boolean }
                })

                res.status(200).json({data:user})
        } catch (error) {
            res.status(400).json({data:error})
        }
    }
    // registerUser: async (_req: Request, _res: Response) => {
    //     // const { email, password, city, country, rol } = req.body;
    //     // const newUser: users = await prisma.users.create({
    //     //     data: {
    //     //         email,
    //     //         password,
    //     //         city,
    //     //         country,
    //     //         rol: rol
    //     //     }
    //     // });
    //     // res.status(200).json({ data: newUser })
    //     // return newUser
    // }
}

export default userController;








