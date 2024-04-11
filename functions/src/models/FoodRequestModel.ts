import { RECOMMENDATIONS } from "../database/Menu";

import { IRecommendation } from "../interfaces/Menu";


function findRecommendation(foodRequest: IRecommendation): IRecommendation {
  const result: IRecommendation = {
    food: null,
    dessert: null,
    drink: null
  }

  if (foodRequest.food) {
    let recommendationFound = false;

    for (let index = 0; index < RECOMMENDATIONS.length; index++) {
      const recommendation = RECOMMENDATIONS[index];

      if (recommendation.food === foodRequest.food) {
        recommendationFound = true

        result.food = foodRequest.food;
        result.drink = recommendation.drink;
        result.dessert = recommendation.dessert;
      }
    }

    if (!recommendationFound) {
      return { food: null, dessert: null, drink: null };
    }
  }

  if (foodRequest.dessert) {
    let recommendationFound = false;

    for (let index = 0; index < RECOMMENDATIONS.length; index++) {
      const recommendation = RECOMMENDATIONS[index];

      if (recommendation.dessert === foodRequest.dessert) {
        recommendationFound = true;

        result.food = result.food ? result.food : recommendation.food;
        result.drink = result.drink ? result.drink : recommendation.drink;
        result.dessert = foodRequest.dessert;
      }
    }

    if (!recommendationFound) {
      return { food: null, dessert: null, drink: null };
    }
  }

  if (foodRequest.drink) {
    let recommendationFound = false;

    for (let index = 0; index < RECOMMENDATIONS.length; index++) {
      const recommendation = RECOMMENDATIONS[index];

      if (recommendation.drink === foodRequest.drink) {
        recommendationFound = true;

        result.food = result.food ? result.food : recommendation.food;
        result.drink = foodRequest.drink;
        result.dessert = result.dessert ? result.dessert : recommendation.dessert;
      }
    }

    if (!recommendationFound) {
      return { food: null, dessert: null, drink: null };
    }
  }

  return result;
}

export {
  findRecommendation
};