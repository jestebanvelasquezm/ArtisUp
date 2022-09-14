// @ts-nocheck
import { PrismaClient } from '@prisma/client';
import { Response, Request, NextFunction } from 'express';

const prisma = new PrismaClient({ log: ['query', ] });



const artistController = {
    create: async () => {

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
        const id:string = req.user_id
        console.log(id);
        try {
            const artist = await prisma.users.findUnique({
                where:{id :req.user_id },
                include:{
                    shows:{
                        include:{
                            show:true
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
        try {
            const result = await prisma.users.findMany({
                where: {
                    userName: {
                        equals: `${req.query.name}`,
                    },
                },
                include: {
                    shows: {
                        select: { show: true }
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
                const newShow = await prisma.show.create({
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