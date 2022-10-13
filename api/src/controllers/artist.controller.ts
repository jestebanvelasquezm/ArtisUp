// @ts-nocheck
import { PrismaClient } from '@prisma/client';
import { Response, Request, NextFunction } from 'express';

const prisma = new PrismaClient({ log: ['query', ] });



const artistController = {
    create: async (_req:Request, res:Response,) => {
        try {
            // postgresql://postgres:GpSWcmcCrghZdujbIMJ4@containers-us-west-53.railway.app:5933/railway
            res.status(200).json({data:'hola desde railway'})
        } catch (error) {
            res.status(500).json({data :error})
        }
    },
    all: async (_req:Request, res:Response, _next:NextFunction) => {
        try {
            const artists = await prisma.users.findMany({where:{rol : 'ARTIST'}})
            return res.status(200).json({data:artists})
        } catch (error) {
            return res.status(400).json({mesagge:error})
        }
    },
    profile: async (req:Request, res:Response, _next:NextFunction) => {
        
        try {
            const artist = await prisma.users.findUnique({
                where:{id :req.user_id },
                include:{
                    shows:
                    {
                        select:{
                            // event:true,
                            event:{
                                include:{
                                    categories:{
                                        select:{
                                            category:true
                                            // {
                                            //     select:{
                                            //         name:true
                                            //     }
                                            // }
                                        }
                                    }
                                }
                            }
                            
                        }
                    }
                }
            })
            return res.status(200).json({data:artist})
        } catch (error) {
            return res.status(400).json({mesagge:error})
        }
    },
    name: async (req: Request, res: Response, _next: NextFunction) => {
        const{name} = req.query 
        console.log(name, 'nombree');
        try {
            const result = await prisma.users.findMany({
                where: {
                    nickName: {
                        contains: `${name}`
                    },
                },
                include: {
                    shows: {
                        select: { event: true }
                    }
                }
            })
            return res.status(200).json({ data: result })
        } catch (error) {
            return res.status(400).json({ mesagge: error })
        }
    },
    createEvent: async (req: Request, res: Response, _next: NextFunction) => {
        const user = await prisma.users.findUnique({
            where: {
                id: req.user_id
            }
        })
        try {
                const newShow = await prisma.event.create({
                    data: {
                        nickName: req.body.nickName,
                        eventName: req.body.eventName,
                        description: req.body.description,
                        duration: req.body.duration,
                        imagesEvent: req.body.imagesEvent,
                        priceTime: req.body.priceTime,
                        priceDay: req.body.priceDay,
                        categories: {
                            create: {
                                category: {
                                    connect: {
                                        id: req.body.category
                                    }
                                }
                            }
                        },
                        members: {
                            create: {
                                userId: req.params.id
                            }
                        }
                    },
                })
                res.status(201).json({ data: newShow })
        } catch (error) {
            console.log(error);
        }
    }
}

export default artistController;