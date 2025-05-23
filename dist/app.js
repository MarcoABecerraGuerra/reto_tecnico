"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fusionados_controller_1 = require("./controllers/fusionados.controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/fusionados', fusionados_controller_1.fusionadosHandler);
exports.default = app;
