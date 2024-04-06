interface IMenuEntry {
  name: string;
  price: number;
}

interface IFoodRecommendation {
  food: string;
  drinks: string[];
}

interface IDrinkRecommendation {
  drink: string;
  foods: string[];
}

export {
  IMenuEntry,
  IFoodRecommendation,
  IDrinkRecommendation
}