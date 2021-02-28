import React from 'react';
import CircularPieChart, { IPiePiece } from '../circular-pie-chart-component/CircularPieChart';
import { INutritionalValue } from '../helpers/NutritionService';
import LabelValue from '../label-value-component/LabelValue';
import IFoodDiaryEntry from '../models/IFoodDiaryEntry';
import './DayNutritionStatistic.css';

export interface IDayNutritionStatistic {
    foodsEatenOnDay: (IFoodDiaryEntry & INutritionalValue)[]
}
const DayNutritionStatistic: React.FunctionComponent<IDayNutritionStatistic> = (props) => {
    const { foodsEatenOnDay } = props;
    if (foodsEatenOnDay.length <= 0) {
        return (
            <p>
                No foods to show nutrition statistic.
            </p>
        );
    }
    const nutritionValuesSumForDay = foodsEatenOnDay.reduce<INutritionalValue>((previousValue, currentValue) => {
        const amountFactor = currentValue.amountInGramm / 100;
        if (!isNaN(currentValue.protein)) {
            previousValue.protein += currentValue.protein * amountFactor;
        }
        if (!isNaN(currentValue.carbohydrates)) {
            previousValue.carbohydrates += currentValue.carbohydrates * amountFactor;
        }
        if (!isNaN(currentValue.fat)) {
            previousValue.fat += currentValue.fat * amountFactor;
        }
        if (!isNaN(currentValue.kiloCalories)) {
            previousValue.kiloCalories += currentValue.kiloCalories * amountFactor;
        }
        if (!isNaN(currentValue.kiloJoule)) {
            previousValue.kiloJoule += currentValue.kiloJoule * amountFactor;
        }
        return previousValue;
    }, { protein: 0, carbohydrates: 0, fat: 0, kiloCalories: 0, kiloJoule: 0 });
    
    const roundDecimalPlace = 100;

    const fatForDayRounded = Math.round(nutritionValuesSumForDay.fat * roundDecimalPlace) / roundDecimalPlace;
    const proteinForDayRounded = Math.round(nutritionValuesSumForDay.protein * roundDecimalPlace) / roundDecimalPlace;
    const carbsForDayRounded = Math.round(nutritionValuesSumForDay.carbohydrates * roundDecimalPlace) / roundDecimalPlace;

    const totalMacroGramm = carbsForDayRounded + fatForDayRounded + proteinForDayRounded;
    

    const fatColor = 'var(--color-pink)';
    const fatPercentage = fatForDayRounded / totalMacroGramm;
    const fatPercentageRounded = Math.round(fatPercentage * 100 * roundDecimalPlace) / roundDecimalPlace;
    const fatPiePiece: IPiePiece = {
        label: 'Fat', percentageFraction: fatPercentage, color: fatColor
    };

    const proteinColor = 'var(--color-light-blue)';
    const proteinPercentage = proteinForDayRounded / totalMacroGramm;
    const proteinPercentageRounded = Math.round(proteinPercentage * 100 * roundDecimalPlace) / roundDecimalPlace;
    const proteinPiePiece: IPiePiece = {
        label: 'Protein', percentageFraction: proteinPercentage, color: proteinColor
    };

    const carbsColor = 'var(--color-light-green)';
    const carbsPercentage = carbsForDayRounded / totalMacroGramm;
    const carbsPercentageRounded = Math.round(carbsPercentage * 100 * roundDecimalPlace) / roundDecimalPlace;
    const carbsPiePiece: IPiePiece = {
        label: 'Carbs', percentageFraction: carbsPercentage, color: carbsColor
    };
    return (
        <div className="day-nutrition-statistic-container">
            <CircularPieChart label="Macros" piePieces={[fatPiePiece, carbsPiePiece, proteinPiePiece]}>
                <LabelValue label="Calories" value={nutritionValuesSumForDay.kiloCalories.toString()}></LabelValue>
            </CircularPieChart>
            <div className="labels-container">
                <LabelValue label="Fats" value={fatForDayRounded.toString()} valueColor={fatColor} valueParentheses={`${fatPercentageRounded}%`}/>
                <LabelValue label="Carbs" value={carbsForDayRounded.toString()} valueColor={carbsColor} valueParentheses={`${carbsPercentageRounded}%`}/>
                <LabelValue label="Protein" value={proteinForDayRounded.toString()} valueColor={proteinColor} valueParentheses={`${proteinPercentageRounded}%`}/>
            </div>
        </div>
    );
}

export default DayNutritionStatistic;