"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerHistorial = void 0;
const aws_sdk_1 = require("aws-sdk");
const dynamo = new aws_sdk_1.DynamoDB.DocumentClient();
const TABLE_NAME = 'FusionadosHistorialTable';
const obtenerHistorial = async (pageNum, limitNum) => {
    const resultado = await dynamo.scan({
        TableName: TABLE_NAME
    }).promise();
    const items = resultado.Items || [];
    // Ordenar por fecha descendente
    const ordenados = items.sort((a, b) => (b.fecha || '').localeCompare(a.fecha || ''));
    // Paginación
    const startIndex = (pageNum - 1) * limitNum;
    const datosPaginados = ordenados.slice(startIndex, startIndex + limitNum);
    return {
        pagina: pageNum,
        total: items.length,
        datos: datosPaginados
    };
};
exports.obtenerHistorial = obtenerHistorial;
