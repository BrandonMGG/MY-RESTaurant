import { Response } from '@google-cloud/functions-framework';

import { CustomError } from '../interfaces/Error';

function sendError(res: Response, error: any) {
  if (error.status) {
    res.statusCode = error.status;
    res.send(error.message);
  }
  else {
    res.statusCode = 500;
    res.send('No se pudo procesar la solicitud debido a un problema interno.');
  }
}

function incorrectFormat() {
  throw new CustomError({
    status: 400,
    message: 'La información recibida no cumple con el formato esperado.'
  });
}

function recommendationNotFound() {
  throw new CustomError({
    status: 404,
    message: 'No se encontraron recomendaciones para la información suministrada.'
  });
}

export {
  sendError,
  incorrectFormat,
  recommendationNotFound
};