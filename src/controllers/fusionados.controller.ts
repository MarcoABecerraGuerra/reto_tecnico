import axios from 'axios';

const SWAPI_BASE = 'https://swapi.py4e.com/api/people';
const OPENMETEO_API = 'https://api.open-meteo.com/v1/forecast';

//import dotenv from 'dotenv';
//dotenv.config();

// Mapeo ficticio planeta → ciudad
const planetToCoordsMap: Record<string, { lat: number; lon: number }> = {
    'Tatooine': { lat: 30.0444, lon: 31.2357 }, // Cairo
    'Alderaan': { lat: 59.9139, lon: 10.7522 }, // Oslo
    'Naboo': { lat: 45.4408, lon: 12.3155 },    // Venice
    'Coruscant': { lat: 40.7128, lon: -74.0060 }, // New York
    'Kamino': { lat: 64.1265, lon: -21.8174 }   // Reykjavik
};

export const obtenerDatosFusionados = async (): Promise<any[]> => {
    const respuestaSwapi = await axios.get(SWAPI_BASE);
    const personajes = respuestaSwapi.data.results;
  
    const resultadosFusionados: any[] = [];
  
    for (const personaje of personajes) {
      let nombrePlaneta = 'Desconocido';
  
      try {
        const planetaRes = await axios.get(personaje.homeworld);
        nombrePlaneta = planetaRes.data.name;
      } catch {
        console.warn(`No se pudo obtener el planeta de ${personaje.name}`);
      }
  
        const coords = planetToCoordsMap[nombrePlaneta];
        let temperatura = 'N/A';
  
      if (coords) {
        try {
            const climaRes = await axios.get(`${OPENMETEO_API}?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m`);
            temperatura = climaRes.data.current.temperature_2m;
        } catch {
            console.warn(`No se pudo obtener el planeta de ${personaje.name}`);
        }
      }
  
      resultadosFusionados.push({
        personaje: personaje.name,
        planeta: nombrePlaneta,
        lat: coords?.lat,
        lon: coords?.lon,
        temperatura
      });
    }
  
    return resultadosFusionados;
};