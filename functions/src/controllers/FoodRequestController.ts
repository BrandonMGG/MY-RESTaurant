import { findRecommendation } from "../models/FoodRequestModel";

import { IRecommendation } from "../interfaces/Menu";
import { CustomError } from "../interfaces/Error";

function getFoodRecommendation(foodRequest: IRecommendation): IRecommendation {
  if (!foodRequest.food && !foodRequest.dessert && !foodRequest.drink) {
    throw new CustomError({
      status: 400,
      message: 'La información recibida no cumple con el formato esperado.'
    });
  }

  const recommendation = findRecommendation(foodRequest);

  if (!recommendation.food && !recommendation.dessert && !recommendation.drink) {
    throw new CustomError({
      status: 404,
      message: 'No se encontraron recomendaciones para la información suministrada.'
    });
  }

  return recommendation;
}

export {
  getFoodRecommendation
};