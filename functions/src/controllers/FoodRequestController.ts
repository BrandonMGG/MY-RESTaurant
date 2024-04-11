import { findRecommendation } from "../models/FoodRequestModel";

import { IRecommendation } from "../interfaces/Menu";
import { incorrectFormat, recommendationNotFound } from "../helpers/Errors";

function getFoodRecommendation(foodRequest: IRecommendation): IRecommendation {
  if (!foodRequest.food && !foodRequest.dessert && !foodRequest.drink) {
    incorrectFormat();
  }

  Object.keys(foodRequest).forEach((key) => {
    if (key !== 'food' && key !== 'dessert' && key !== 'drink') {
      incorrectFormat();
    }
  });

  const recommendation = findRecommendation(foodRequest);

  if (!recommendation.food && !recommendation.dessert && !recommendation.drink) {
    recommendationNotFound();
  }

  return recommendation;
}

export {
  getFoodRecommendation
};