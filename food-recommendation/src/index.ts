import {
  http,
  Request,
  Response
} from '@google-cloud/functions-framework';

import { getFoodRecommendation } from './controllers/FoodRequestController';

import { IRecommendation } from './interfaces/Menu';
import { sendError } from './helpers/Errors';


http('food-recommendation', (req: Request, res: Response) => {
  res.set('Access-Control-Allow-Origin', '*');

  try {
    const foodRequest: IRecommendation = req.body;

    const recommendation: IRecommendation = getFoodRecommendation(foodRequest);

    res.send(recommendation);
  }
  catch (error: any) {
    console.log(error);
    sendError(res, error);
  }
});