"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.almacenarController = void 0;
const uuid_1 = require("uuid");
const aws_sdk_1 = require("aws-sdk");
const dynamo = new aws_sdk_1.DynamoDB.DocumentClient();
const TABLE_NAME = 'RandomDataTable';
const almacenarController = async (nombre, comentario) => {
    const id = (0, uuid_1.v4)();
    const fecha = new Date().toISOString();
    const params = {
        TableName: TABLE_NAME,
        Item: { id, nombre, comentario, fecha }
    };
    await dynamo.put(params).promise();
    return { mensaje: 'Datos guardados correctamente', id };
};
exports.almacenarController = almacenarController;
