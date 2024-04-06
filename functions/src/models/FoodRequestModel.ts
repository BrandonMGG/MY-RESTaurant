import {
  DRINK_RECOMMENDATIONS,
  DRINKS,
  FOOD_RECOMMENDATIONS,
  FOODS
} from "../database/Menu";

import {
  IDrinkRecommendation,
  IFoodRecommendation,
  IMenuEntry
} from "../interfaces/Menu";


function findFoodRecommendation(drinkRequest: string) {
  const drinkRecommendation: IDrinkRecommendation | undefined = DRINK_RECOMMENDATIONS
    .find((drinkRecommendation) => drinkRecommendation.drink === drinkRequest);

  if (!drinkRecommendation) { return null; }

  const recommendedFoods: IMenuEntry[] = []

  for (let index = 0; index < FOODS.length; index++) {
    const food = FOODS[index];
    const foodName = food.name;

    if (drinkRecommendation.foods.includes(foodName)) {
      recommendedFoods.push(food);
    }
  }

  if (recommendedFoods.length === 0) { return null; }

  return recommendedFoods;
}

function findDrinkRecommendation(foodRequest: string) {
  const foodRecommendation: IFoodRecommendation | undefined = FOOD_RECOMMENDATIONS
    .find((foodRecommendation) => foodRecommendation.food === foodRequest);

  if (!foodRecommendation) { return null; }

  const recommendedDrinks: IMenuEntry[] = []

  for (let index = 0; index < DRINKS.length; index++) {
    const drink = DRINKS[index];
    const drinkName = drink.name;

    if (foodRecommendation.drinks.includes(drinkName)) {
      recommendedDrinks.push(drink);
    }
  }

  if (recommendedDrinks.length === 0) { return null; }

  return recommendedDrinks;
}

export {
  findFoodRecommendation,
  findDrinkRecommendation
};