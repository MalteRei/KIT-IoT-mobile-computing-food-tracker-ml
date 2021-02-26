import IFoodDiaryEntry from "../models/IFoodDiaryEntry";
import { INutritionalValue } from "./NutritionService";

class FoodDiaryService {
    addFoodToToday(foodName: string, amountInGramm: number) {
        if(amountInGramm <= 0){
            return;
        }
        if (typeof(Storage) !== "undefined") {
            // Store
            const today = new Date();
            const todayDateString = today.toDateString();
            const existingFoodsString = localStorage.getItem(todayDateString);
            let foodsWithNewFood: IFoodDiaryEntry[] = [];
            foodsWithNewFood.push({
                foodName: foodName,
                amountInGramm: amountInGramm
            });
            if(existingFoodsString !== null) {
                const exisitingFoods = JSON.parse(existingFoodsString) as IFoodDiaryEntry[];
                if(exisitingFoods && exisitingFoods.length > 0) {
                    foodsWithNewFood = exisitingFoods;
                    const existingFoodWithName = exisitingFoods.find(foodEntry => foodEntry.foodName === foodName);
                    if(existingFoodWithName) {
                        const amountOfFoodAddedUp = existingFoodWithName.amountInGramm + amountInGramm;
                        existingFoodWithName.amountInGramm = amountOfFoodAddedUp;
                    } 
                }
              
            } 
            localStorage.setItem(todayDateString, foodsWithNewFood.toString());
            
        }
    }

    getFoodsOfDay(day: Date): IFoodDiaryEntry[]{
        if (typeof(Storage) !== "undefined") {
            const dateString = day.toDateString();
            const existingFoodsString = localStorage.getItem(dateString);
            if(existingFoodsString !== null) {
                const exisitingFoods = JSON.parse(existingFoodsString) as IFoodDiaryEntry[];
                if(exisitingFoods && exisitingFoods.length > 0) {
                    return exisitingFoods;
                }

            }
          }
          return [];
    }

    isAvailable(): boolean {
        return  typeof(Storage) !== "undefined";
    }

}

export default FoodDiaryService;