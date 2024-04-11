import request from 'supertest';
import { backend } from './app.js'; // Reemplaza 'tuarchivo' con el nombre de tu archivo donde se encuentra la función backend
import express from 'express';
describe('Backend API Tests', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(backend); // Aquí se asocia la función backend con la instancia de Express
  });

  // Prueba para verificar si se obtiene la base de datos correctamente
  it('should get the database', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    // Aquí puedes agregar más expectativas para asegurarte de que la respuesta coincida con lo esperado
  });

  // Prueba para verificar el endpoint de reservación
  it('should make a reservation', async () => {
    const res = await request(app).get('/reservacion').query({ mensaje: 'mensaje', fecha: 'fecha' });
    expect(res.statusCode).toEqual(200);
    // Aquí puedes agregar más expectativas para asegurarte de que la respuesta coincida con lo esperado
  });

  // Prueba para verificar el endpoint de feedback
  it('should analyze feedback', async () => {
    const res = await request(app).get('/feedback').query({ mensaje: 'mensaje' });
    expect(res.statusCode).toEqual(200);
    // Aquí puedes agregar más expectativas para asegurarte de que la respuesta coincida con lo esperado
  });

  // Prueba para verificar el endpoint de menú
  it('should get menu recommendations', async () => {
    const res = await request(app).get('/menu').query({ platoPrincipal: 'plato', bebidas: 'bebida', postres: 'postre' });
    expect(res.statusCode).toEqual(200);
    // Aquí puedes agregar más expectativas para asegurarte de que la respuesta coincida con lo esperado
  });
});
