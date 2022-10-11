"use strict";
// @ts-nocheck
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
const nodemailer_1 = __importDefault(require("nodemailer"));
const createTrans = () => __awaiter(void 0, void 0, void 0, function* () {
    // const oAuth2Client = new google.auth.OAuth2(
    //     process.env.CLIENT_ID,
    //     process.env.CLIENT_SECRET,
    //     process.env.CLIENT_URI,
    // )
    // oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})
    try {
        // const accessToken = await oAuth2Client.getAccessToken()
        const transport = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "eventosapp22@gmail.com",
                pass: process.env.GOOGLE_PASS,
            }
        });
        transport.verify().then(() => {
            console.log("Listo para enviar emails");
        });
        return transport;
    }
    catch (error) {
        console.log(error);
    }
    // const transport = nodemailer.createTransport(
    //     nodemailerSendgrid({
    //         apiKey: process.env.NODEMAILER_KEY
    //     })
    // )
    // transport.verify().then( ()=>{
    //     console.log("Listo para enviar emails");
    //   });
});
// const sendMail = async (subject:any, message:any, send_to:string, send_from:string, reply_to:any ) =>{
const sendMail = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = yield createTrans();
    yield transporter.sendMail({
        from: 'events app <eventosapp22@gmail.com>',
        to: user.email,
        subject: `hola ${user.name}, bienvenido a tu comunidad `,
        html: '<b>hola mundo ! </b>',
    });
    console.log('Mensaje enviado');
    return;
    // return options
    // const options = {
    //     from: send_from,
    //     to: send_to, // 1 ó []
    //     reply_to: reply_to,
    //     subject: subject,
    //     html: message,
    // } 
});
exports.default = sendMail;
