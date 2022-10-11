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
const prisma = new client_1.PrismaClient({ log: ['query',] });
const artistController = {
    create: () => __awaiter(void 0, void 0, void 0, function* () {
    }),
    all: (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const artists = yield prisma.users.findMany({ where: { rol: 'ARTIST' } });
            return res.status(200).json({ data: artists });
        }
        catch (error) {
            return res.status(400).json({ mesagge: error });
        }
    }),
    profile: (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const artist = yield prisma.users.findUnique({
                where: { id: req.user_id },
                include: {
                    shows: {
                        select: {
                            // event:true,
                            event: {
                                include: {
                                    categories: {
                                        select: {
                                            category: true
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
            });
            return res.status(200).json({ data: artist });
        }
        catch (error) {
            return res.status(400).json({ mesagge: error });
        }
    }),
    name: (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = req.query;
        console.log(name, 'nombree');
        try {
            const result = yield prisma.users.findMany({
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
            });
            return res.status(200).json({ data: result });
        }
        catch (error) {
            return res.status(400).json({ mesagge: error });
        }
    }),
    createEvent: (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield prisma.users.findUnique({
            where: {
                id: req.user_id
            }
        });
        try {
            const newShow = yield prisma.event.create({
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
            });
            res.status(201).json({ data: newShow });
        }
        catch (error) {
            console.log(error);
        }
    })
};
exports.default = artistController;
