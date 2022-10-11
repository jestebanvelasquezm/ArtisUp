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
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({ log: ['query', 'info'] });
const eventController = {
    getEventbyName: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = req.query;
        try {
            const event = yield prisma.event.findMany({
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
            });
            return res.status(200).json({ data: event });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }),
    getEventById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const event = yield prisma.event.findFirst({
                where: {
                    id: req.params.id
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
            });
            res.status(200).json({ succes: true, data: event });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }),
    createEvent: (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.body);
        try {
            try {
                const newShow = yield prisma.event.create({
                    data: {
                        eventName: req.body.eventName,
                        description: req.body.description,
                        imagesEvent: req.body.imagesEvent,
                        city: req.body.city,
                        country: req.body.country,
                        place: req.body.place,
                        day: req.body.day,
                        hour: req.body.hour,
                        finish: req.body.finish,
                        premiumTickets: Number(req.body.premiumTickets),
                        generalTickets: Number(req.body.generalTickets),
                        boxTickets: Number(req.body.boxTickets),
                        priceOne: Number(req.body.priceOne),
                        priceTwo: Number(req.body.priceTwo),
                        priceThree: Number(req.body.priceThree),
                        capacity: req.body.capacity,
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
                });
                res.status(201).json({ data: newShow });
            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    })
};
exports.default = eventController;
