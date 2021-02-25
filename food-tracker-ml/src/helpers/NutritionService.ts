export interface INutritionalValue{
    kiloCalories: number;
    kiloJoule: number;
    fat: number;
    carbohydrates: number;
    protein: number;
}

export default class NutritionService{
    getNutritionalValueOf(foodName: string): INutritionalValue | undefined{
        switch (foodName) {
            case "avocado":
                return {
                    kiloCalories: 373,
                    kiloJoule: 1560,
                    fat: 33.8,
                    carbohydrates:9.6,
                    protein: 3.7
                }
        
            default:
                return undefined;
        }
    }
}
