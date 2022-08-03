import { Currency } from "./enums";

interface Recipe {
  id: number;
  name: string;
  images: string[];
  price: number;
  currency: Currency;
  introduction: string;
  restaurant_id: number;
}

export default Recipe;
