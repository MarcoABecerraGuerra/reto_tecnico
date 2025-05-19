import { v4 as uuidv4 } from 'uuid';
import { DynamoDB } from 'aws-sdk';

const dynamo = new DynamoDB.DocumentClient();
const TABLE_NAME = 'RandomDataTable';


export const almacenarController = async (nombre: string, comentario: string) => {
    const id = uuidv4();
    const fecha = new Date().toISOString();
  
    const params = {
      TableName: TABLE_NAME,
      Item: { id, nombre, comentario, fecha }
    };
  
    await dynamo.put(params).promise();
  
    return { mensaje: 'Datos guardados correctamente', id };
  };