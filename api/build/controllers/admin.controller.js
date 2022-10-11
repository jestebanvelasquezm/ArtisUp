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
const adminController = {
    getAdmins: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allAdmins = yield prisma.users.findMany({ where: { rol: 'ADMIN' } });
            if (allAdmins.length > 0) {
                res.status(201).json({ data: allAdmins });
            }
            else {
                res.status(404).json({ message: 'no hay usuarios registrados' });
            }
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }),
    getAdminId: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const admin = yield prisma.users.findUnique({ where: { id: req.params.id } });
            if (admin.length > 0) {
                res.status(201).json({ data: admin });
            }
            else {
                res.status(404).json({ message: 'no hay usuarios registrados' });
            }
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }),
    profileAdmin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield prisma.users.findUnique({
                where: { id: req.user_id }
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
    avaliableAdmin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { boolean } = req.body;
        try {
            const user = yield prisma.users.update({
                where: { id: req.params.id },
                data: { available: boolean }
            });
            res.status(200).json({ data: user });
        }
        catch (error) {
            res.status(400).json({ data: error });
        }
    }),
    registerAdmin: (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield prisma.users.findFirst({
                where: {
                    email: req.body.email
                }
            });
            if (user) {
                return res.status(400).json({ succes: false, error: "User/Email Already Exists" });
            }
            const hashedPassword = yield bcryp.hash(req.body.password, Number(process.env.SALT_ROUNDS));
            const newUser = yield prisma.users.create({
                data: {
                    image: req.body.image,
                    nickName: req.body.nickName,
                    userName: req.body.userName,
                    email: req.body.email,
                    password: hashedPassword,
                    phone: req.body.phone,
                    city: req.body.city,
                    country: req.body.country,
                    rol: req.body.rol,
                }
            });
            return res.status(200).json({ data: newUser });
        }
        catch (error) {
            return res.status(400).json({ succes: false, message: error });
        }
    })
};
exports.default = adminController;
