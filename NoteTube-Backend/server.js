"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const geminiControllers_1 = __importDefault(require("./controllers/geminiControllers"));
const express = require('express');
const Cors = require('cors');
require('dotenv').config();
const port = process.env.PORT; // port is used for backend server
console.log('port:', port);
const app = express();
//this is for middleware
app.use(Cors()); // cors is used for security of browser
app.use(express.json());
app.listen(port, () => console.log(`listening to port :  ${port}`));
//an api for getting gemini response
app.post('/getGeminiResponse', geminiControllers_1.default);
