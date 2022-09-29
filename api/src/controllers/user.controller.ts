// @ts-nocheck
import { PrismaClient } from '@prisma/client';
import { Response, Request, Express } from 'express';
import Stripe from 'stripe';
const prisma = new PrismaClient({ log: ['query', 'info'] });
const stripe = Stripe(process.env.STRIPE_KEY)


const createOrder = async () => {

}
const emailbuy = async () => {

}
const fulfillOrder = async () => {

}

const userController = {
    getProfile: async (req: Request, res: Response) => {
        try {
            const user = await prisma.users.findUnique({
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

            })
            if (!user) {
                res.status(400).json({ succes: false, message: 'no existe usuario con esa id' })
            } else {
                res.status(200).json({ succes: true, data: user })
            }
        } catch (error) {
            res.status(400).json({ succes: false, message: error })
        }
    },
    getUsers: async (_req: Request, res: Response) => {
        try {
            const allUsers = await prisma.users.findMany()
            if (allUsers.length > 0) {
                res.status(201).json({ data: allUsers })
            } else {
                res.status(404).json({ message: 'no hay usuarios registrados' })
            }

        } catch (error) {
            res.status(400).json({ message: error })
        }
    },
    getUserId: async (req: Request, res: Response) => {
        console.log(req.params.id);
        try {
            const user = await prisma.users.findUnique({
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

            })
            if (!user) {
                res.status(400).json({ succes: false, message: 'no existe usuario con esa id' })
            } else {
                res.status(200).json({ succes: true, data: user })
            }
        } catch (error) {
            res.status(400).json({ succes: false, message: error })
        }

    },
    avaliableUser: async (req: Request, res: Response) => {
        const { boolean } = req.body
        try {
            const user = await prisma.users.update({
                where: { id: req.user_id },
                data: { available: boolean }
            })
            res.status(200).json({ data: user })
        } catch (error) {
            res.status(400).json({ data: error })
        }
    },
    generateOrder: async (req: Request, res: Response) => {
        try {
            const tickets = req.body
            const metadata = await stripe.customers.create({
                metadata: {
                    userId: req.user_id,
                    eventId: tickets.id,
                    premium: tickets.premiumTickets,
                    box: tickets.boxTickets,
                    general: tickets.generalTickets,
                    priceOne: tickets.priceOne,
                    priceTwo: tickets.priceTwo,
                    priceThree: tickets.priceTree,
                }
            })
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
            }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: [line_items],
                mode: 'payment',
                metadata: metadata.metadata,
                success_url: 'http://localhost:3000/user/checkout-success',
                cancel_url: `http://localhost:3000/user/event/tickets/${tickets.id}`,
            });

            // console.log(session);

            res.send({ url: session.url });

        } catch (error) {
            console.log(error);
        }
    },
    hooksStripe: async (req: Request, res: Response) => {
        const sig = req.headers['stripe-signature'];
        // console.log(req.body, 'eventoooooooo');
        let buyEvent;
        let session;
        let data;
        try {
            session = Stripe.webhooks.constructEvent(req.body, sig, process.env.END_POINT_SECRET)
            // console.log('eventttttttttt', event.data.object.metadata);
        } catch (err) {
            console.log('error', err.message);
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }
        buyEvent = session.data.object.metadata;
        data = session.data.object;
        session = session.type;
        if (session === 'checkout.session.completed') {
            // Stripe.
            console.log('eventttttttttt', buyEvent);
            const items = await stripe.checkout.sessions.listLineItems(
                data.id
            );
            console.log('itemssssssssss', items.data);
            const buy = {
                sub_total: data.amount_subtotal,
                total: data.amount_total,
                created: data.created,
                currency: data.currency,
                payment_status: data.payment_status,
            }


        }

        res.send().end();

    }

}

export default userController;









