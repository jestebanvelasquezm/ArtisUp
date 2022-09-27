// @ts-nocheck
import { PrismaClient } from '@prisma/client';
import { Response, Request } from 'express';
import Stripe from 'stripe';
const prisma = new PrismaClient({ log: ['query', 'info'] });
const stripe = Stripe(process.env.STRIPE_KEY)
        const endpointSecret = "whsec_9b28ee5a84f7fe2021f24da3debda2e499c69af4ac14250433df30f24264f03c";


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
            const customer = await stripe.customers.create({
                metadata:{
                    userId: req.user_id,
                    cart: JSON.stringify(req.body.tickets)
                }
            })
            const line_items ={
                    price_data:{
                        currency:'usd',
                        product_data:{
                            name:tickets.eventName.toUpperCase(),
                            images: [tickets.imagesEvent] ,
                            description: `Resumen Tikets:
                                Premium ${tickets.premiumTickets}, 
                                Box ${tickets.boxTickets}, 
                                General ${tickets.generalTickets}`,
                            metadata:{
                                id:tickets.id
                            },
                        },
                        unit_amount: tickets.totalPrice * 100
                    },
                    quantity: 1
                }
         
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                // shipping_address_collection: {
                // allowed_countries: ["US", "CA", "CO"],
                // },
                line_items: [line_items],
                mode: 'payment',
                customer: customer.id,
                success_url: 'http://localhost:3000/user/checkout-success',
                cancel_url: `http://localhost:3000/user/event/tickets/${tickets.id}`,
            });

            // console.log(session);

            res.send({ url: session.url});

        } catch (error) {
            console.log(error);
        }
    },
    hooksStripe: async (req: Request, res: Response) =>{
        // const endpointSecret = "whsec_9b28ee5a84f7fe2021f24da3debda2e499c69af4ac14250433df30f24264f03c";
        const sig = req.headers['stripe-signature'];

        const payload = req.body

        let event 
        try {
            event =  stripe.webhooks.constructEvent(payload,sig,endpointSecret)
            console.log(event.data,'data');
            console.log(event.data.object,'data.object');
            console.log(event.data.object.id,'data.id');

        } catch (error) {
            console.log(error);
            res.status(400).json({succes:'false', message: error.message})
        }

    }

}

export default userController;









