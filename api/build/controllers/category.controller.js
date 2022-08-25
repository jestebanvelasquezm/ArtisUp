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
const categorys = [
    { "name": "poesía" },
    { "name": "cuentos" },
    { "name": "teatro" },
    { "name": "danza" },
    { "name": "escultura" },
    { "name": "música" },
    { "name": "pintura" },
    { "name": "fotografía" },
    { "name": "baile " },
    { "name": "canto" },
    { "name": "stand-up" },
    { "name": "mimo" },
    { "name": "diversion infantil" }
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
            return error;
        }
    }),
    getCategories: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const categorys = yield prisma.category.findMany();
        res.status(200).json({ data: categorys.sort() });
    }),
    createCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = req.body;
        try {
            const newCategory = yield prisma.category.create({
                data: {
                    name: name,
                    asignedBy: 'ADMIN'
                }
            });
            res.status(200).json({ data: newCategory });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    })
};
exports.default = categoryController;
