"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var preview_1 = __importDefault(require("./api/preview"));
var resize_1 = __importDefault(require("./api/resize"));
var routes = (0, express_1.Router)();
routes.get('/', function (req, res) {
    res.send('Welcome to IMAGI 🌍 - check our services in two different ways The first, as a simple image previewer, the second via resizing image.');
});
routes.use('/resize', resize_1.default);
routes.use('/preview', preview_1.default);
exports.default = routes;
