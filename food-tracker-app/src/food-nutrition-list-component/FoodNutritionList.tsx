import React from 'react';
import FoodNutritionListItem from '../food-nutrition-list-item-component/FoodNutritionListItem';
import { INutritionalValue } from '../helpers/NutritionService';
import IFoodDiaryEntry from '../models/IFoodDiaryEntry';
import './FoodNutritionList.css';

export interface IFoodNutritionListProps{
    foodsWithNutrition: (IFoodDiaryEntry & INutritionalValue)[]
}
const FoodNutritionList: React.FunctionComponent<IFoodNutritionListProps> = (props) => {
    const {foodsWithNutrition} = props;

    const listItems = foodsWithNutrition.map((foodWithNutrition, index) => <FoodNutritionListItem index={index} key={index} foodWithNutrition={foodWithNutrition}/>);

    return (
        <ol className='food-nutrition-list'>
            {listItems}
        </ol>
    );
}

export default FoodNutritionList;