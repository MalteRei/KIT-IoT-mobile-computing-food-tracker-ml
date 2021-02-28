import IFoodDiaryEntry from "../models/IFoodDiaryEntry";
import { INutritionalValue } from "./NutritionService";

class FoodDiaryService {
    private readonly oldestDateKeyInStorage = 'oldest-date-in-diary';

    addFoodToToday(foodName: string, amountInGramm: number) {
        if(amountInGramm <= 0){
            return;
        }
        if (typeof(Storage) !== "undefined") {
            // Store
            const today = new Date();
            const todayDateString = today.toISOString().split('T')[0];
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
            localStorage.setItem(todayDateString, JSON.stringify(foodsWithNewFood));
            this.updateOldestDate(today);
        }
    }

    private updateOldestDate(updateDate: Date) {
        const oldestDateInDiary = this.getOldestDateOfFoodDiary();
        if(!oldestDateInDiary) {
            localStorage.setItem(this.oldestDateKeyInStorage, JSON.stringify(updateDate));
        }
    }

    getOldestDateOfFoodDiary(): Date | undefined {
        const oldestDateInDiaryString = localStorage.getItem(this.oldestDateKeyInStorage);
        if(oldestDateInDiaryString) {
            const oldestDateInDiary = JSON.parse(oldestDateInDiaryString) as Date;
            return oldestDateInDiary;
        }
        return undefined;
    }

    isDateInDiary(day: Date): boolean {
        const foodsOfDay = this.getFoodsOfDay(day);
        return foodsOfDay !== null && foodsOfDay.length > 0;
    }

    getFoodsOfDay(day: Date): IFoodDiaryEntry[]{
        if (typeof(Storage) !== "undefined") {
            const dateString = day.toISOString().split('T')[0];
            const existingFoodsString = localStorage.getItem(dateString);
            if(existingFoodsString !== null) {
                console.dir(existingFoodsString);
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