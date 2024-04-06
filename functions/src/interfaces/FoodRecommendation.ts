import { IMenuEntry } from "./Menu";

interface IFoodRequest {
  food?: string;
  drink?: string;
}

interface IFoodResponse {
  foods: IMenuEntry[] | null;
  drinks: IMenuEntry[] | null;
}

export {
  IFoodRequest,
  IFoodResponse
}