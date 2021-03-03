export interface INutritionalValue {
    kiloCalories: number;
    kiloJoule: number;
    fat: number;
    carbohydrates: number;
    protein: number;
}

export default class NutritionService {
    getNutritionalValueOf(foodName: string): INutritionalValue | undefined {
        switch (foodName) {
            case "avocado":
                return {
                    kiloCalories: 373,
                    kiloJoule: 1560,
                    fat: 33.8,
                    carbohydrates: 9.6,
                    protein: 3.7
                };
            case "almond":
                return {
                    kiloCalories: 611,
                    kiloJoule: 2558,
                    fat: 53,
                    carbohydrates: 5.7,
                    protein: 24
                };
            case "broccoli":
                return {
                    kiloCalories: 34,
                    kiloJoule: 142,
                    fat: 0.2,
                    carbohydrates: 2.7,
                    protein: 3.8
                };
            case "tofu":
                return {
                    kiloCalories: 127,
                    kiloJoule: 532,
                    fat: 5.6,
                    carbohydrates: 2.8,
                    protein: 15.5
                };
            case "bell pepper":
                return {
                    kiloCalories: 43,
                    kiloJoule: 180,
                    fat: 0.5,
                    carbohydrates: 6.4,
                    protein: 1.3
                };

            case "nori paper":
                return {
                    kiloCalories: 278,
                    kiloJoule: 1158,
                    fat: 3.2,
                    carbohydrates: 9.7,
                    protein: 31.3
                };
            case "olive oil":
                    return {
                        kiloCalories: 900,
                        kiloJoule: 3700,
                        fat: 100,
                        carbohydrates: 0,
                        protein: 0
                    };        
            default:
                return undefined;
        }
    }
}
