import { FoodItem } from "./FoodItem";
import { Restaurant } from "./Restaurant";

export interface FoodCatalogue {
    foodItemsList: FoodItem[];
    restaurant: Restaurant;
}