import { RECOMMENDATIONS } from "../database/Menu";

import { IRecommendation } from "../interfaces/Menu";


function findRecommendation(foodRequest: IRecommendation): IRecommendation {
  const result: IRecommendation = {
    food: null,
    dessert: null,
    drink: null
  }

  if (foodRequest.food) {
    for (let index = 0; index < RECOMMENDATIONS.length; index++) {
      const recommendation = RECOMMENDATIONS[index];

      if (recommendation.food === foodRequest.food) {
        result.food = foodRequest.food;
        result.drink = recommendation.drink;
        result.dessert = recommendation.dessert;
      }
    }

    if (!result.food) {
      return { food: null, dessert: null, drink: null };
    }
  }

  if (foodRequest.dessert) {
    for (let index = 0; index < RECOMMENDATIONS.length; index++) {
      const recommendation = RECOMMENDATIONS[index];

      if (recommendation.dessert === foodRequest.dessert) {
        result.food = result.food ? result.food : recommendation.food;
        result.drink = result.drink ? result.drink : recommendation.drink;
        result.dessert = foodRequest.dessert;
      }
    }

    if (!result.dessert) {
      return { food: null, dessert: null, drink: null };
    }
  }

  if (foodRequest.drink) {
    for (let index = 0; index < RECOMMENDATIONS.length; index++) {
      const recommendation = RECOMMENDATIONS[index];

      if (recommendation.drink === foodRequest.drink) {
        result.food = result.food ? result.food : recommendation.food;
        result.drink = foodRequest.drink;
        result.dessert = result.dessert ? result.dessert : recommendation.dessert;
      }
    }

    if (!result.drink) {
      return { food: null, dessert: null, drink: null };
    }
  }

  return result;
}

export {
  findRecommendation
};