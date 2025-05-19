"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.historialHandler = void 0;
const historial_controller_1 = require("../controllers/historial.controller");
const historialHandler = async (event) => {
    try {
        const query = event.queryStringParameters || {};
        const pageNum = parseInt(query.page || '1', 10);
        const limitNum = parseInt(query.limit || '10', 10);
        const resultado = await (0, historial_controller_1.obtenerHistorial)(pageNum, limitNum);
        return {
            statusCode: 200,
            body: JSON.stringify(resultado)
        };
    }
    catch (error) {
        console.error('Error en historialHandler:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error interno del servidor' })
        };
    }
};
exports.historialHandler = historialHandler;
