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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({ log: ['query', 'info'] });
// type users = {
//     email: string
//     password: string
//     city: string
//     country: string
//     rol: string
// }
const userController = {
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
    avaliableUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { boolean } = req.body;
        // const user = await prisma.users.findUnique({where: {id}})
        try {
            const user = yield prisma.users.update({
                where: { id: id },
                data: { available: boolean }
            });
            res.status(200).json({ data: user });
        }
        catch (error) {
            res.status(400).json({ data: error });
        }
    })
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
};
exports.default = userController;
