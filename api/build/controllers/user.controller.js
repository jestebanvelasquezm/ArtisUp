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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const nodeMailer_1 = __importDefault(require("../utils/nodeMailer"));
const stripe = (0, stripe_1.default)(process.env.STRIPE_KEY);
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({ log: ['query', 'info'] });
const userController = {
    getProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield prisma.users.findUnique({
                where: { id: `${req.user_id}` },
                include: {
                    shows: {
                        include: {
                            event: {
                                include: {
                                    categories: true
                                }
                            }
                        },
                    }
                },
            });
            if (!user) {
                res.status(400).json({ succes: false, message: 'no existe usuario con esa id' });
            }
            else {
                res.status(200).json({ succes: true, data: user });
            }
        }
        catch (error) {
            res.status(400).json({ succes: false, message: error });
        }
    }),
    getUsers: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allUsers = yield prisma.users.findMany();
            if (allUsers.length > 0) {
                res.status(201).json({ data: allUsers });
            }
            else {
                res.status(404).json({ message: 'no hay usuarios registrados' });
            }
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }),
    getUserId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.params.id);
        try {
            const user = yield prisma.users.findUnique({
                where: { id: req.params.id },
                include: {
                    shows: {
                        include: {
                            event: {
                                include: {
                                    categories: true
                                }
                            }
                        },
                    }
                },
            });
            if (!user) {
                res.status(400).json({ succes: false, message: 'no existe usuario con esa id' });
            }
            else {
                res.status(200).json({ succes: true, data: user });
            }
        }
        catch (error) {
            res.status(400).json({ succes: false, message: error });
        }
    }),
    avaliableUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { boolean } = req.body;
        try {
            const user = yield prisma.users.update({
                where: { id: req.user_id },
                data: { available: boolean }
            });
            res.status(200).json({ data: user });
        }
        catch (error) {
            res.status(400).json({ data: error });
        }
    }),
    generateOrder: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tickets = req.body;
            const metadata = yield stripe.customers.create({
                metadata: {
                    userId: req.user_id,
                    eventId: tickets.eventId,
                    premium: tickets.premiumTickets,
                    box: tickets.boxTickets,
                    general: tickets.generalTickets,
                    priceOne: tickets.priceOne,
                    priceTwo: tickets.priceTwo,
                    priceThree: tickets.priceThree,
                }
            });
            const line_items = {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: tickets.eventName.toUpperCase(),
                        images: [tickets.imagesEvent],
                        description: `Resumen Tikets:
                                Premium ${tickets.premiumTickets}, 
                                Box ${tickets.boxTickets}, 
                                General ${tickets.generalTickets}`,
                        metadata: {
                            id: tickets.id
                        },
                    },
                    unit_amount: tickets.totalPrice * 100
                },
                quantity: 1
            };
            const session = yield stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: [line_items],
                mode: 'payment',
                metadata: metadata.metadata,
                success_url: 'http://localhost:3000/user/checkout-success',
                cancel_url: `http://localhost:3000/user/event/tickets/${tickets.id}`,
            });
            // console.log(session);
            res.send({ url: session.url });
        }
        catch (error) {
            console.log(error);
        }
    }),
    hooksStripe: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const sig = req.headers['stripe-signature'];
        // console.log(req.body, 'eventoooooooo');
        let buyEvent;
        let session;
        let data;
        try {
            session = stripe_1.default.webhooks.constructEvent(req.body, sig, process.env.END_POINT_SECRET);
            console.log('eventttttttttt', session.data.object.metadata);
        }
        catch (err) {
            console.log('error', err.message);
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }
        buyEvent = session.data.object.metadata;
        data = session.data.object;
        session = session.type;
        if (session === 'checkout.session.completed') {
            console.log('eventttttttttt', buyEvent);
            console.log('itemssssssssss', data);
            const payment = yield prisma.payment.create({
                data: {
                    userId: buyEvent.userId,
                    eventId: buyEvent.eventId,
                    premium: Number(buyEvent.premium),
                    box: Number(buyEvent.box),
                    general: Number(buyEvent.general),
                    currency: data.id,
                    payment_status: data.payment_status,
                    amount_total: data.amount_total
                }
            });
            console.log(payment, 'recibido');
            // res.status(200).json({data:payment})
        }
        res.send().end();
    }),
    email: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.body;
        try {
            const response = (0, nodeMailer_1.default)(user);
            res.status(200).json({ success: response });
        }
        catch (error) {
            console.log(error);
        }
    }),
    payments: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield prisma.users.findUnique({
                where: { id: req.user_id },
                select: {
                    payment: {
                        include: {
                            event: true
                        }
                    }
                }
            });
            res.status(200).json({ data: user });
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    }),
    succesPayment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.user_id);
        try {
            const payment = yield prisma.payment.findFirst({
                where: {
                    eventId: req.params.id,
                    userId: req.user_id
                },
                include: {
                    event: true
                }
            });
            res.status(200).json({ data: payment });
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    })
};
exports.default = userController;
