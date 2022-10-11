"use strict";
//@ts-nocheck
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
const express_1 = __importDefault(require("express"));
const stripe_1 = __importDefault(require("stripe"));
const router = express_1.default.Router();
const stripe = new stripe_1.default(process.env.SECRET_KEY);
router.post('/buy', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, amount } = req.body;
        const payment = yield stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            description: 'freddie mercury',
            payment_method: id,
            confirm: true
        });
        res.status(201).json({ success: 'successfull payment' });
    }
    catch (error) {
        res.json({ message: error.raw.message });
    }
}));
exports.default = router;
