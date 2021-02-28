import React from 'react';
import { INutritionalValue } from '../helpers/NutritionService';
import LabelValue from '../label-value-component/LabelValue';
import IFoodDiaryEntry from '../models/IFoodDiaryEntry';
import './FoodNutritionListItem.css';

export interface IFoodNutritionListItemProps {
    foodWithNutrition: (IFoodDiaryEntry & INutritionalValue),
    key:number
}

const FoodNutritionListItem: React.FunctionComponent<IFoodNutritionListItemProps> = (props) => {
    const {foodWithNutrition, key} = props;

    const amountFactor = foodWithNutrition.amountInGramm / 100;
    
    const roundDecimalPlace = 100;


    const kiloCalories = Math.round(foodWithNutrition.kiloCalories * amountFactor * roundDecimalPlace) / roundDecimalPlace;
    const kiloJoule = Math.round(foodWithNutrition.kiloJoule * amountFactor * roundDecimalPlace) / roundDecimalPlace;
    const fat = Math.round(foodWithNutrition.fat * amountFactor * roundDecimalPlace) / roundDecimalPlace;
    const carbohydrates = Math.round(foodWithNutrition.carbohydrates * amountFactor * roundDecimalPlace) / roundDecimalPlace;
    const protein = Math.round(foodWithNutrition.protein * amountFactor * roundDecimalPlace) / roundDecimalPlace;

    const liClassNames = (key > 0)? "list-item-no-style food-list-item border-bottom": "list-item-no-style food-list-item";
    return (
        <li className={liClassNames}>
             <p style={{minWidth: '8%'}}>
                {foodWithNutrition.amountInGramm}g
            </p>
            <p style={{minWidth: '20%', paddingLeft: '8px', paddingRight: '16px'}}>
                {foodWithNutrition.foodName}
            </p>
            <LabelValue marginRight='32px' label='Calories' valueParentheses={`${kiloJoule} kJ`} value={`${kiloCalories} kcal`}/>
            <LabelValue marginRight='32px' label='Fats' value={`${fat} g`}/>
            <LabelValue marginRight='32px' label='Carbs' value={`${carbohydrates} g`}/>
            <LabelValue marginRight='32px' label='Protein' value={`${protein} g`}/>
            
        </li>
    )
}

export default FoodNutritionListItem;