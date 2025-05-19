import { APIGatewayProxyHandler } from 'aws-lambda';
import { almacenarController } from '../controllers/almacenar.controller';

export const almacenarHandler: APIGatewayProxyHandler = async (event) => {
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const { nombre, comentario } = body;

    if (!nombre || !comentario) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Nombre y comentario son requeridos' })
      };
    }

    const resultado = await almacenarController(nombre, comentario);

    return {
      statusCode: 201,
      body: JSON.stringify(resultado)
    };
  } catch (error) {
    console.error('Error en almacenarHandler:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error interno del servidor' })
    };
  }
};