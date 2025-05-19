"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.almacenarHandler = void 0;
const almacenar_controller_1 = require("../controllers/almacenar.controller");
const almacenarHandler = async (event) => {
    try {
        const body = event.body ? JSON.parse(event.body) : {};
        const { nombre, comentario } = body;
        if (!nombre || !comentario) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Nombre y comentario son requeridos' })
            };
        }
        const resultado = await (0, almacenar_controller_1.almacenarController)(nombre, comentario);
        return {
            statusCode: 201,
            body: JSON.stringify(resultado)
        };
    }
    catch (error) {
        console.error('Error en almacenarHandler:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error interno del servidor' })
        };
    }
};
exports.almacenarHandler = almacenarHandler;
