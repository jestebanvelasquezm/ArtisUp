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
                    eventName: {
                        equals: `${req.query.name}`,
                    },
                },
                include: {
                    categories: {
                        include: {
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
                    id : req.params.id
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
        console.log(req.body);
        try {
            try {
                const newShow = await prisma.event.create({
                    data: {
                        eventName: req.body.eventName,
                        description: req.body.description,
                        imagesEvent: req.body.imagesEvent,
                        city: req.body.city,
                        country: req.body.country,
                        place: req.body.place,
                        day:req.body.day,
                        hour:req.body.hour,
                        finish: req.body.finish,
                        premiumTickets: Number(req.body.premiumTickets),
                        generalTickets: Number(req.body.generalTickets),
                        boxTickets:Number(req.body.boxTickets),
                        priceOne :Number(req.body.priceOne),
                        priceTwo :Number(req.body.priceTwo),
                        priceThree :Number(req.body.priceThree),
                        capacity:req.body.capacity,      
                        categories: {
                            create: {
                                category: {
                                    connect: {
                                        id: Number(req.body.categories)
                                    }
                                }
                            }
                        },
                        members: {
                            create: {
                                userId: req.user_id
                            }
                        }
                    },
                })
                res.status(201).json({ data: newShow })
                
            } catch (error) {
                console.log(error);
            }

        } catch (error) {
            res.status(400).json({message:error})
        }
    }
}

export default eventController;