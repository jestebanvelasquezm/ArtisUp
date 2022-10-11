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
const categorys = [
    { "name": "poesía" },
    { "name": "cuenteria" },
    { "name": "teatral" },
    { "name": "danza" },
    { "name": "baile" },
    { "name": "escultura" },
    { "name": "música" },
    { "name": "pintura" },
    { "name": "fotografía" },
    { "name": "baile" },
    { "name": "canto" },
    { "name": "stand-up" },
    { "name": "artes plasticas" },
    { "name": "diversion infantil" },
    { "name": "concierto" },
    { "name": "musica en vivo" },
];
const categoryController = {
    createCategoriesDefault: () => __awaiter(void 0, void 0, void 0, function* () {
        const categorysDb = yield prisma.category.findMany();
        try {
            if (!categorysDb.length) {
                categorys.map((ele) => __awaiter(void 0, void 0, void 0, function* () {
                    yield prisma.category.create({
                        data: {
                            name: ele.name,
                            asignedBy: 'ADMIN'
                        }
                    });
                }));
            }
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }),
    createCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = req.body;
        try {
            const category = yield prisma.category.findMany({
                where: {
                    name: name
                }
            });
            if (category) {
                res.status(400).json({ succes: false, message: 'ya existe la categoria' });
            }
            else {
                const newCategory = yield prisma.category.create({
                    data: {
                        name: name,
                        asignedBy: 'ADMIN'
                    }
                });
                res.status(200).json({ data: newCategory });
            }
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }),
    getCategories: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const categories = yield prisma.category.findMany();
            res.status(200).json({ data: categories.sort() });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }),
    getCategoryId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const category = yield prisma.category.findUnique({
                where: {
                    id: parseInt(id)
                },
                include: {
                    event: {
                        select: {
                            show: true
                        }
                    }
                }
            });
            res.status(200).json({ succes: true, data: category });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    })
};
exports.default = categoryController;
