import axios from 'axios';

interface IRequest {
  text: string;
};

interface IResponse {
  magnitude?: number;
  score?: number;
  mensaje?: string;
};

interface IServerResponse {
  status: number;
  data: IResponse | string;
};

const url = 'http://localhost:5000/analyze';

async function testFunction(testData: any): Promise<IServerResponse> {
  return axios.post(url, testData)
    .then((response) => {
      const status = response.status;
      const data = response.data
      const result: IServerResponse = { status: status, data: data }
      return result;
    })
    .catch((error) => {
      const status = error.response.status;
      const data = error.response.data
      const result: IServerResponse = { status: status, data: data }
      return result;
    })
}


test('Sends a neutral message', async () => {
  const testData: IRequest = {
    text: "Hola"
  };

  const expectedMessage = "¡Nos alegra saber que tu experiencia fue en general positiva! Esperamos mejorar aún más nuestros servicios para tu póxima visita. 🙂";

  const minScore = 0;
  const maxScore = 0.3

  const response: IServerResponse = await testFunction(testData);

  expect(response.status).toStrictEqual(200);
  expect((response.data as any).mensaje).toStrictEqual(expectedMessage);
  expect(
    (response.data as any).score >= minScore &&
    (response.data as any).score <= maxScore)
    .toStrictEqual(true);
});


test('Sends an slightly positive message', async () => {
  const testData: IRequest = {
    text: "La comida estuvo relativamente bien"
  };

  const expectedMessage = "¡Nos alegra saber que tu experiencia fue en general positiva! Esperamos mejorar aún más nuestros servicios para tu póxima visita. 🙂";

  const minScore = 0.3;
  const maxScore = 0.8;

  const response: IServerResponse = await testFunction(testData);

  expect(response.status).toStrictEqual(200);
  expect((response.data as any).mensaje).toStrictEqual(expectedMessage);
  expect(
    (response.data as any).score >= minScore &&
    (response.data as any).score <= maxScore)
    .toStrictEqual(true);
});


test('Sends an very positive message', async () => {
  const testData: IRequest = {
    text: "Me encantó la comida"
  };

  const expectedMessage = "¡Estamos encantados de escuchar que disfrutaste tu experiencia con nosotros! Agradecemos mucho tus comentarios positivos. Si tienes amigos o familiares que disfrutarían de una experiencia similar, agradeceríamos tu recomendación. ¡Te esperamos pronto! 😄";

  const minScore = 0.8;
  const maxScore = 1;

  const response: IServerResponse = await testFunction(testData);

  expect(response.status).toStrictEqual(200);
  expect((response.data as any).mensaje).toStrictEqual(expectedMessage);
  expect(
    (response.data as any).score >= minScore &&
    (response.data as any).score <= maxScore)
    .toStrictEqual(true);
});


test('Sends an slightly negative message', async () => {
  const testData: IRequest = {
    text: "La comida fue un poco mala y el servicio no estuvo bien"
  };

  const expectedMessage = "Gracias por compartir tu opinión con nosotros. Parece que hubo aspectos de tu experiencia que no fueron completamente de tu agrado. Estamos comprometidos a mejorar y valoraríamos cualquier sugerencia adicional que pudieras tener. 😔";

  const minScore = -0.8;
  const maxScore = -0.3;

  const response: IServerResponse = await testFunction(testData);

  expect(response.status).toStrictEqual(200);
  expect((response.data as any).mensaje).toStrictEqual(expectedMessage);
  expect(
    (response.data as any).score >= minScore &&
    (response.data as any).score <= maxScore)
    .toStrictEqual(true);
});


test('Sends an very negative message', async () => {
  const testData: IRequest = {
    text: "Todo fue demasiado malo, la comida y el servicio fueron pésimos."
  };

  const expectedMessage = "Lamentamos profundamente que tu experiencia no haya estado a la altura de tus expectativas. Nos tomamos muy en serio tus comentarios y nos conprometemos a ofrecer un mejor servicio la próxima vez. 😢";

  const minScore = -0.8;
  const maxScore = -0.5;

  const response: IServerResponse = await testFunction(testData);

  expect(response.status).toStrictEqual(200);
  expect((response.data as any).mensaje).toStrictEqual(expectedMessage);
  expect(
    (response.data as any).score >= minScore &&
    (response.data as any).score <= maxScore)
    .toStrictEqual(true);
});


test('Sends an empty body', async () => {
  const testData: any = {};

  const expectedResponse: any = {
    "error": "No text provided"
  };

  const response: IServerResponse = await testFunction(testData);

  expect(response.status).toStrictEqual(400);
  expect(response.data).toStrictEqual(expectedResponse);
});