import { APIGatewayProxyHandler } from 'aws-lambda';
import { obtenerHistorial } from '../controllers/historial.controller';

export const historialHandler: APIGatewayProxyHandler = async (event) => {
  try {
    const query = event.queryStringParameters || {};
    const pageNum = parseInt(query.page || '1', 10);
    const limitNum = parseInt(query.limit || '10', 10);

    const resultado = await obtenerHistorial(pageNum, limitNum);

    return {
      statusCode: 200,
      body: JSON.stringify(resultado)
    };
  } catch (error) {
    console.error('Error en historialHandler:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error interno del servidor' })
    };
  }
};