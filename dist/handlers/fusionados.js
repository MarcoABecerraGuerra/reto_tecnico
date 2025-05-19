"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fusionadosHandler = void 0;
const aws_sdk_1 = require("aws-sdk");
const uuid_1 = require("uuid");
const fusionados_controller_1 = require("../controllers/fusionados.controller");
const TABLE_NAME = 'FusionadosHistorialTable';
const dynamo = new aws_sdk_1.DynamoDB.DocumentClient();
const fusionadosHandler = async () => {
    try {
        const ahora = new Date();
        const hace30Min = new Date(ahora.getTime() - 30 * 60000).toISOString();
        // Verificar caché
        const resultado = await dynamo.scan({
            TableName: TABLE_NAME,
            FilterExpression: 'fecha > :fechaLimite',
            ExpressionAttributeValues: {
                ':fechaLimite': hace30Min
            }
        }).promise();
        if (resultado.Items && resultado.Items.length > 0) {
            return {
                statusCode: 200,
                body: JSON.stringify(resultado.Items[0].datos)
            };
        }
        // Obtener nueva data
        const datosFusionados = await (0, fusionados_controller_1.obtenerDatosFusionados)();
        const id = (0, uuid_1.v4)();
        await dynamo.put({
            TableName: TABLE_NAME,
            Item: {
                id,
                fecha: ahora.toISOString(),
                datos: datosFusionados
            }
        }).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(datosFusionados)
        };
    }
    catch (error) {
        console.error('Error en fusionadosHandler:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error interno del servidor' })
        };
    }
};
exports.fusionadosHandler = fusionadosHandler;
