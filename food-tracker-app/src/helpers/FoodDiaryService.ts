import IFoodDiaryEntry from "../models/IFoodDiaryEntry";

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
            const newFood: IFoodDiaryEntry = {
                foodName: foodName,
                amountInGramm: amountInGramm
            }
            if(existingFoodsString !== null) {
                const exisitingFoods = JSON.parse(existingFoodsString) as IFoodDiaryEntry[];
                if(exisitingFoods && exisitingFoods.length > 0) {
                    
                    const existingFoodWithName = exisitingFoods.find(foodEntry => foodEntry.foodName === foodName);
                    if(existingFoodWithName) {
                        const amountOfFoodAddedUp = existingFoodWithName.amountInGramm + amountInGramm;
                        existingFoodWithName.amountInGramm = amountOfFoodAddedUp;
                    } else {
                        exisitingFoods.push({
                            foodName: foodName,
                            amountInGramm: amountInGramm
                        });
                    }
                    localStorage.setItem(todayDateString, JSON.stringify(exisitingFoods));
                } else {
                    localStorage.setItem(todayDateString, JSON.stringify([newFood]));

                }
              
        } else {
                    localStorage.setItem(todayDateString, JSON.stringify([newFood]));
        }
            
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
            const date = new Date(JSON.parse(oldestDateInDiaryString));
            return date;
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