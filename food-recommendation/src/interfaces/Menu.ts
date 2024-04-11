interface IMenuEntry {
  name: string;
  price: number;
}

interface IRecommendation {
  food?: string | null;
  dessert?: string | null;
  drink?: string | null;
}

export {
  IMenuEntry,
  IRecommendation
}