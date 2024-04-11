import axios from 'axios';

interface IRecommendation {
  fecha?: string;
  disponible?: boolean;
  horas_disponibles?: string[];
  mensaje?: string;
};

interface IServerResponse {
  status: number;
  data: IRecommendation | string;
};

const url = 'http://localhost:5000/sugerencia_hora';

async function testFunction(testData: any): Promise<IServerResponse> {
  return axios.post(url, testData)
    .then((response) => {
      const status = response.status;
      const data = response.data
      return { status: status, data: data };
    })
    .catch((error) => {
      const status = error.response.status;
      const data = error.response.data
      return { status: status, data: data };
    })
}


test('Gets a successful response', async () => {
  const testData: IRecommendation = {
    fecha: "2024-04-20"
  };

  const expectedResponse: IRecommendation = {
    fecha: "2024-04-20",
    horas_disponibles: [
      "12:30",
      "13:45",
      "14:45",
      "15:30"
    ],
    mensaje: "Se recomienda la primera hora de la lista para hacer la reservación"
  };

  const response = await testFunction(testData);

  expect(response.status).toStrictEqual(200);
  expect(response.data).toStrictEqual(expectedResponse);
});


test('Sends a date that is not available', async () => {
  const testData: IRecommendation = {
    fecha: "2024-04-21"
  };

  const expectedResponse: IRecommendation = {
    mensaje: "No hay horas disponibles para esta fecha o se refiere a un día que no abrimos. Por favor elige otra fecha."
  };

  const response = await testFunction(testData);

  expect(response.status).toStrictEqual(200);
  expect(response.data).toStrictEqual(expectedResponse);
});


test('Sends an invalid date', async () => {
  const testData: IRecommendation = {
    fecha: "2024-04-25"
  };

  const expectedResponse: IRecommendation = {
    disponible: false,
    mensaje: "Fecha no válida"
  };

  const response = await testFunction(testData);

  expect(response.status).toStrictEqual(400);
  expect(response.data).toStrictEqual(expectedResponse);
});


test('Sends a request with an empty body', async () => {
  const testData: any = {};

  const expectedResponse: IRecommendation = {
    mensaje: "Los datos introducidos no son válidos"
  };

  const response = await testFunction(testData);

  expect(response.status).toStrictEqual(400);
  expect(response.data).toStrictEqual(expectedResponse);
});


test('Sends a request with incorrect parameters', async () => {
  const testData: any = {
    fecedeha: "2024-04-25"
  };

  const expectedResponse: IRecommendation = {
    disponible: false,
    mensaje: "Fecha no válida"
  };

  const response = await testFunction(testData);

  expect(response.status).toStrictEqual(400);
  expect(response.data).toStrictEqual(expectedResponse);
});