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
            case "almond":
                return {
                    kiloCalories: 611,
                    kiloJoule: 2558,
                    fat: 53,
                    carbohydrates: 5.7,
                    protein: 24
                };
            case "apple":
                return {
                    kiloCalories: 65,
                    kiloJoule: 272,
                    fat: 0.1,
                    carbohydrates: 14.3,
                    protein: 0.3
                };
            case "avocado":
                return {
                    kiloCalories: 373,
                    kiloJoule: 1560,
                    fat: 33.8,
                    carbohydrates: 9.6,
                    protein: 3.7
                };
            case "blackberry":
                return {
                    kiloCalories: 54,
                    kiloJoule: 226,
                    fat: 1,
                    carbohydrates: 8.5,
                    protein: 1.2
                };
            case "broccoli":
                return {
                    kiloCalories: 34,
                    kiloJoule: 142,
                    fat: 0.2,
                    carbohydrates: 2.7,
                    protein: 3.8
                };
            case "button mushroom":
                return {
                    kiloCalories: 15,
                    kiloJoule: 63,
                    fat: 0.2,
                    carbohydrates: 0.6,
                    protein: 2.7
                };
            case "cauliflower":
                return {
                    kiloCalories: 28,
                    kiloJoule: 117,
                    fat: 0.3,
                    carbohydrates: 2.3,
                    protein: 2.5
                };
            case "cucumber":
                return {
                    kiloCalories: 14,
                    kiloJoule: 59,
                    fat: 0.2,
                    carbohydrates: 1.8,
                    protein: 0.6
                };
            case "green onion":
                return {
                    kiloCalories: 47,
                    kiloJoule: 197,
                    fat: 0.3,
                    carbohydrates: 8.5,
                    protein: 0.9
                };
            case "kale":
                return {
                    kiloCalories: 45,
                    kiloJoule: 188,
                    fat: 0.9,
                    carbohydrates: 2.5,
                    protein: 4.3
                };
            case "lemon":
                return {
                    kiloCalories: 29,
                    kiloJoule: 121,
                    fat: 0.3,
                    carbohydrates: 9.3,
                    protein: 1.1
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
            case "oyster mushroom":
                return {
                    kiloCalories: 35,
                    kiloJoule: 147,
                    fat: 0.2,
                    carbohydrates: 2.6,
                    protein: 3.5
                };
            case "pumpkin seed":
                return {
                    kiloCalories: 582,
                    kiloJoule: 2437,
                    fat: 46.4,
                    carbohydrates: 2.7,
                    protein: 35.5
                };
            case "raspberry":
                return {
                    kiloCalories: 43,
                    kiloJoule: 180,
                    fat: 0.3,
                    carbohydrates: 4.8,
                    protein: 1.3
                };
            case "red bell pepper":
                return {
                    kiloCalories: 43,
                    kiloJoule: 180,
                    fat: 0.5,
                    carbohydrates: 6.4,
                    protein: 1.3
                };
            case "red onion":
                return {
                    kiloCalories: 27,
                    kiloJoule: 113,
                    fat: 0.3,
                    carbohydrates: 4.7,
                    protein: 1.2
                };
            case "shiitake":
                return {
                    kiloCalories: 46,
                    kiloJoule: 193,
                    fat: 0.2,
                    carbohydrates: 12.3,
                    protein: 1.6
                };
            case "soy sauce":
                return {
                    kiloCalories: 62,
                    kiloJoule: 262,
                    fat: 0.5,
                    carbohydrates: 5.3,
                    protein: 9.5
                };
            case "spinach":
                return {
                    kiloCalories: 22,
                    kiloJoule: 92,
                    fat: 0.3,
                    carbohydrates: 0.6,
                    protein: 2.8
                };
            case "sunflower seed":
                return {
                    kiloCalories: 641,
                    kiloJoule: 2684,
                    fat: 53,
                    carbohydrates: 12,
                    protein: 25.1
                };
            case "tempeh":
                return {
                    kiloCalories: 167,
                    kiloJoule: 698,
                    fat: 6.6,
                    carbohydrates: 3.1,
                    protein: 20.1
                };
            case "tofu":
                return {
                    kiloCalories: 127,
                    kiloJoule: 532,
                    fat: 5.6,
                    carbohydrates: 2.8,
                    protein: 15.5
                };
            case "zucchini":
                return {
                    kiloCalories: 23,
                    kiloJoule: 96,
                    fat: 0.3,
                    carbohydrates: 2.3,
                    protein: 2.0
                };
            default:
                return undefined;
        }
    }
}
