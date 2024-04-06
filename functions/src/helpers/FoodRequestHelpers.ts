import { IFoodRequest, IFoodResponse } from "../interfaces/FoodRecommendation";

function buildFoodResponse(foodRequest: IFoodRequest, recommendations: IFoodResponse) {
  const foodResponse = foodRequest.food && recommendations.drinks ?
    `Para la comida "${foodRequest.food}" se recomiendan las bebidas:
      ${recommendations.drinks
      .map((drink) => `* ${drink.name} con un precio de ${drink.price} colones\n`)
      .join('')}` : '';

  const drinkResponse = foodRequest.drink && recommendations.foods ?
    `Para la bebida "${foodRequest.drink}" se recomiendan las comidas: 
      ${recommendations.foods
      .map((food) => `* ${food.name} con un precio de ${food.price} colones\n`)
      .join('')}` : '';

  return `${foodResponse}${drinkResponse}`;
}

export {
  buildFoodResponse
};