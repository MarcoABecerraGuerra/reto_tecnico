import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { obtenerDatosFusionados } from '../controllers/fusionados.controller';

const TABLE_NAME = 'FusionadosHistorialTable';
const dynamo = new DynamoDB.DocumentClient();

export const fusionadosHandler: APIGatewayProxyHandler = async () => {
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
    const datosFusionados = await obtenerDatosFusionados();
    const id = uuidv4();

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
  } catch (error) {
    console.error('Error en fusionadosHandler:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error interno del servidor' })
    };
  }
};