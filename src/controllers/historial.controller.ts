import { DynamoDB } from 'aws-sdk';

const dynamo = new DynamoDB.DocumentClient();
const TABLE_NAME = 'FusionadosHistorialTable';

export const obtenerHistorial = async (pageNum: number, limitNum: number) => {
  const resultado = await dynamo.scan({
    TableName: TABLE_NAME
  }).promise();

  const items = resultado.Items || [];

  // Ordenar por fecha descendente
  const ordenados = items.sort((a, b) =>
    (b.fecha || '').localeCompare(a.fecha || '')
  );

  // Paginación
  const startIndex = (pageNum - 1) * limitNum;
  const datosPaginados = ordenados.slice(startIndex, startIndex + limitNum);

  return {
    pagina: pageNum,
    total: items.length,
    datos: datosPaginados
  };
};