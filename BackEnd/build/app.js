"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var users_1 = require("./routes/users");
var interactions_1 = require("./routes/interactions");
//import {router as interactions} from './routes/interactions'
//import {router as interactionsGroup} from './routes/interactionsGroup'
var app = express_1.default();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var options = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'token',
        'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: "http://localhost:4200",
    preflightContinue: false,
};
app.use(cors_1.default(options));
module.exports = app.listen(3004);
app.use('/users', users_1.router);
app.use('/users/interactions', interactions_1.router);
// app.use('/users/groups',)
