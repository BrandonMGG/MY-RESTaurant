import { Response } from '@google-cloud/functions-framework';

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

export {
  sendError
};