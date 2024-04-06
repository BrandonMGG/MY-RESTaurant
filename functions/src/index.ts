import {
  http,
  Request,
  Response
} from '@google-cloud/functions-framework';

import {
  getFoodRecommendation
} from './controllers/FoodRequestController';

import {
  IFoodRequest
} from './interfaces/FoodRecommendation';
import { sendError } from './helpers/Errors';


http('food-recommendation', (req: Request, res: Response) => {
  res.set('Access-Control-Allow-Origin', '*');

  try {
    const foodRequest: IFoodRequest = req.body;
    const recommendation: string = getFoodRecommendation(foodRequest);

    res.send(recommendation);
  }
  catch (error: any) {
    console.log(error);
    sendError(res, error);
  }
});


http('booking-recommendation', (req: Request, res: Response) => {
  res.set('Access-Control-Allow-Origin', '*');

  res.send('Sugerencia de Hora');
});


http('feedback-chatbot', (req: Request, res: Response) => {
  res.set('Access-Control-Allow-Origin', '*');

  res.send('Chatbot de sugerencias');
});