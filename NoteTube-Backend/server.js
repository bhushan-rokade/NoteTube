"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var geminiControllers_1 = require("./controllers/geminiControllers");
var express = require('express');
var Cors = require('cors');
require('dotenv').config();
var port = process.env.PORT; // port is used for backend server
console.log('port:', port);
var app = express();
//this is for middleware
app.use(Cors()); // cors is used for security of browser
app.use(express.json());
app.listen(port, function () { return console.log("listening to port :  ".concat(port)); });
//an api for getting gemini response
app.post('/getGeminiResponse', geminiControllers_1.default);
