import axios from 'axios';
import PointSchema from '../lib/realm/schemas/PointSchema';

const server = axios.create({
  baseURL: 'http://localhost:3333',
});

const api = {
  createPackage: async (pointSchema: PointSchema) => {
    try {
      const {data} = await server.post<PointSchema>(`/points/${pointSchema.id}`, {
        id: pointSchema.id,
        latitude: pointSchema.latitude,
        longitude: pointSchema.longitude,
        speed: pointSchema.speed,
        time: pointSchema.time,
      });
      
      return data;
    } catch (error) {
      console.debug(error?.message);
      throw new Error('Falha ao sincronizar pacotes!!!');
    }
  },

  indexPackages: async () => {
    try {
      const {data} = await server.get<PointSchema[]>('/points');
      return data;
    } catch (error) {
      console.debug(error?.message);
      throw new Error('Falha ao buscar pacotes!!!');
    }
  },

  showPackage: async (packageId: string) => {
    try {
      const {data} = await server.get<PointSchema>(`/points/${packageId}`);
      return data;
    } catch (error) {
      console.debug(error?.message);
      throw new Error('Falha ao buscar pacotes!!!');
    }
  },
};

export default api;
