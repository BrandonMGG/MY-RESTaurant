const axios = require('axios');

const url = 'http://localhost:8080/food-recommendation';

async function testFunction(testData) {
  return axios.get(url, { data: testData })
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
  const testData = {
    food: "Deditos de pollo",
    drink: "Imperial Silver",
    dessert: "Cheesecake de frutos rojos"
  };

  const expectedResponse = {
    food: "Deditos de pollo",
    dessert: "Cheesecake de frutos rojos",
    drink: "Imperial Silver"
  };

  const response = await testFunction(testData);

  expect(response.status).toStrictEqual(200);
  expect(response.data).toStrictEqual(expectedResponse);
});


test('Sends a request with food and drink parameters', async () => {
  const testData = {
    food: "Hamburguesa",
    drink: "Imperial Silver"
  };

  const expectedResponse = {
    food: "Hamburguesa",
    dessert: "Helado",
    drink: "Imperial Silver"
  };

  const response = await testFunction(testData);

  expect(response.status).toStrictEqual(200);
  expect(response.data).toStrictEqual(expectedResponse);
});


test('Sends a request with food and dessert parameters', async () => {
  const testData = {
    food: "Hamburguesa",
    dessert: "Helado"
  };

  const expectedResponse = {
    food: "Hamburguesa",
    dessert: "Helado",
    drink: "Refresco"
  };

  const response = await testFunction(testData);

  expect(response.status).toStrictEqual(200);
  expect(response.data).toStrictEqual(expectedResponse);
});


test('Sends a request with drink and dessert parameters', async () => {
  const testData = {
    dessert: "Brownie",
    drink: "Refresco",
  };

  const expectedResponse = {
    food: "Pizza",
    dessert: "Brownie",
    drink: "Refresco"
  };

  const response = await testFunction(testData);

  expect(response.status).toStrictEqual(200);
  expect(response.data).toStrictEqual(expectedResponse);
});


test('Sends a request with food parameter', async () => {
  const testData = {
    food: "Ensalada"
  };

  const expectedResponse = {
    food: "Ensalada",
    dessert: "Fruta",
    drink: "Agua"
  };

  const response = await testFunction(testData);

  expect(response.status).toStrictEqual(200);
  expect(response.data).toStrictEqual(expectedResponse);
});


test('Sends a request with dessert parameter', async () => {
  const testData = {
    dessert: "Fruta"
  };

  const expectedResponse = {
    food: "Ensalada",
    dessert: "Fruta",
    drink: "Agua"
  };

  const response = await testFunction(testData);

  expect(response.status).toStrictEqual(200);
  expect(response.data).toStrictEqual(expectedResponse);
});


test('Sends a request with drink parameter', async () => {
  const testData = {
    drink: "Agua"
  };

  const expectedResponse = {
    food: "Ensalada",
    dessert: "Fruta",
    drink: "Agua"
  };

  const response = await testFunction(testData);

  expect(response.status).toStrictEqual(200);
  expect(response.data).toStrictEqual(expectedResponse);
});


test('Sends a request without parameters', async () => {
  const testData = {};

  const expectedResponse = 'La información recibida no cumple con el formato esperado.';

  const response = await testFunction(testData);

  expect(response.status).toStrictEqual(400);
  expect(response.data).toStrictEqual(expectedResponse);
});


test('Sends an empty request', async () => {
  const testData = null;

  const expectedResponse = 'La información recibida no cumple con el formato esperado.';

  const response = await testFunction(testData);

  expect(response.status).toStrictEqual(400);
  expect(response.data).toStrictEqual(expectedResponse);
});


test('Sends a request with both correct and incorrect parameters', async () => {
  const testData = {
    food: "Ensalada",
    food1231: 'Ensalada',
    dessert: "Fruta",
    dessert2312: "Fruta",
    drink: "Agua",
    drink1121: "Agua"
  };

  const expectedResponse = 'La información recibida no cumple con el formato esperado.';

  const response = await testFunction(testData);

  expect(response.status).toStrictEqual(400);
  expect(response.data).toStrictEqual(expectedResponse);
});


test('Sends a request with only incorrect parameters', async () => {
  const testData = {
    food1231: 'Ensalada',
    dessert2312: "Fruta",
    drink1121: "Agua"
  };

  const expectedResponse = 'La información recibida no cumple con el formato esperado.';

  const response = await testFunction(testData);

  expect(response.status).toStrictEqual(400);
  expect(response.data).toStrictEqual(expectedResponse);
});


test('Sends a request that doesn\'t match any database entry', async () => {
  const testData = {
    food: 'Ensalada',
    dessert: "Fruta",
    drink: "Aguasssss"
  };

  const expectedResponse = 'No se encontraron recomendaciones para la información suministrada.';

  const response = await testFunction(testData);

  expect(response.status).toStrictEqual(404);
  expect(response.data).toStrictEqual(expectedResponse);
});