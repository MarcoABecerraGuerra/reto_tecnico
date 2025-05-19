import { obtenerDatosFusionados } from '../controllers/fusionados.controller';

describe('obtenerDatosFusionados', () => {
  it('debe retornar un array con datos fusionados', async () => {
    const resultado = await obtenerDatosFusionados();
    expect(Array.isArray(resultado)).toBe(true);
    expect(resultado.length).toBeGreaterThan(0);
    expect(resultado[0]).toHaveProperty('personaje');
    expect(resultado[0]).toHaveProperty('temperatura');
  }, 15000);
});