import {
  findDrinkRecommendation,
  findFoodRecommendation
} from "../models/FoodRequestModel";

import { buildFoodResponse } from "../helpers/FoodRequestHelpers";

import { CustomError } from "../interfaces/Error";
import { IFoodRequest, IFoodResponse } from "../interfaces/FoodRecommendation";

function getFoodRecommendation(foodRequest: IFoodRequest): string {
  if (!foodRequest || (!foodRequest.food && !foodRequest.drink)) {
    throw new CustomError({
      status: 400,
      message: 'La información recibida no cumple con el formato esperado.'
    });
  }

  const recommendations: IFoodResponse = {
    foods: foodRequest.drink ? findFoodRecommendation(foodRequest.drink) : null,
    drinks: foodRequest.food ? findDrinkRecommendation(foodRequest.food) : null
  };

  if (!recommendations.foods && !recommendations.drinks) {
    throw new CustomError({
      status: 404,
      message: 'No se encontraron recomendaciones para la información suministrada.'
    });
  }

  return buildFoodResponse(foodRequest, recommendations);
}

export {
  getFoodRecommendation
}