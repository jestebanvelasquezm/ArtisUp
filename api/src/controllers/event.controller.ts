// @ts-nocheck
import { PrismaClient } from '@prisma/client';
import { Response, Request, NextFunction } from 'express';

const prisma = new PrismaClient({ log: ['query', 'info'] });



const eventController = {
    getEventbyName: async (req: Request, res: Response): Promise<any> => {
        const { name } = req.query;
        try {
            const event = await prisma.event.findMany({
                where: {
                    userName: {
                        equals: `${req.query.name}`,
                    },
                },
                include: {
                    categories: {
                        select: {
                            category: true
                        }
                    },
                    members: {
                        select: {
                            user: true
                        }
                    }
                }
            })
            return res.status(200).json({ data: event })
        } catch (error) {
            res.status(400).json({message:error})
        }
    },
    getEventById: async (req: Request, res: Response) => {
        try {
            const event = await prisma.event.findFirst({
                where: {
                    id : req.user_id
                },
                include:{
                    categories:{
                        select:{
                            category:true
                        }
                    },
                    members:{
                        select:{
                            user:true
                        }
                    }
                }
            });
            res.status(200).json({succes:true, data:event});
        } catch (error) {
            res.status(400).json({message:error})
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
                        eventName: req.body.eventName,
                        description: req.body.description,
                        duration: req.body.duration,
                        imagesEvent: req.body.imagesEvent,
                        hour:req.body.hour,
                        day:req.body.day,
                        premiumTickets:req.body.premiumTickets,
                        generalTickets:req.body.generalTickets,
                        boxTickets:req.body.boxTickets,
                        capacity:req.body.capacity,      
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
            res.status(400).json({message:error})
        }
    }
}

export default eventController;