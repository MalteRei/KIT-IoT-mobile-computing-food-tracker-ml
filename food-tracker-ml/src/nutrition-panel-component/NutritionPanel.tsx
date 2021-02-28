import React, { useState } from 'react';
import Prompt from '../prompt-component/Prompt';
import ButtonRowComponent from '../button-row-component/ButtonRowComponent';
import IconButton from '../icon-button-component/IconButton';
import Icons from '../models/Icons';
import './NutritionPanel.css';
import NutritionService from '../helpers/NutritionService';
import LabelValue from '../label-value-component/LabelValue';
import AddFoodDiaryEntry from '../add-food-diary-entry-component/AddFoodDiaryEntry';
import Panel from '../panel-component/Panel';
import PanelTopRow from '../panel-top-row-component/PanelTopRow';

export interface INutritionPanelProps {
    foodToShowNutritionOf: string;
    onDismissed: () => void
}

const nutritionService = new NutritionService();

const NutritionPanel: React.FunctionComponent<INutritionPanelProps> = (props) => {
    const { foodToShowNutritionOf, onDismissed } = props;
    const [amountFactor, setAmountFactor] = useState<number>(1);

    const nutritionalValues = nutritionService.getNutritionalValueOf(foodToShowNutritionOf);
    if(!nutritionalValues) {
        return (
            <div>
                <h1>Not found</h1>
                <p>Sorry, we could not look up the nutritional value for {foodToShowNutritionOf}.</p>
            </div>
            
        )
    }

    const roundDecimalPlace = 100;
   
    const kiloCalories = Math.round(nutritionalValues.kiloCalories * amountFactor * roundDecimalPlace) / roundDecimalPlace;
    const kiloJoule = Math.round(nutritionalValues.kiloJoule * amountFactor * roundDecimalPlace) / roundDecimalPlace;
    const fat = Math.round(nutritionalValues.fat * amountFactor * roundDecimalPlace) / roundDecimalPlace;
    const carbohydrates = Math.round(nutritionalValues.carbohydrates * amountFactor * roundDecimalPlace) / roundDecimalPlace;
    const protein = Math.round(nutritionalValues.protein * amountFactor * roundDecimalPlace) / roundDecimalPlace;
    const handleAmountChange = (gramm: number) => {
        console.dir(gramm);
        const newFactor = gramm/100;
        setAmountFactor(newFactor);
    }
    return (
        <section className="nutrition-container">
            <Panel>
                <PanelTopRow title={foodToShowNutritionOf}>
                    <IconButton onClick={() => onDismissed()} icon={Icons.Dismiss} />
                </PanelTopRow>
                
              
                <h4>Calories</h4>
                <div className="flex-row">
                    <LabelValue label='kcal' value={kiloCalories.toString()}/>
                    <LabelValue label='kJ' value={kiloJoule.toString()}/>

                </div>
                    <LabelValue label='Fat' value={fat.toString()+ ' g'}/>
                    <LabelValue label='Carbohydrate' value={carbohydrates.toString()+ ' g'}/>
                    <LabelValue label='Protein' value={protein.toString() + ' g'}/>
                <AddFoodDiaryEntry onFoodAmountChanged={handleAmountChange} foodName={foodToShowNutritionOf}/>
                
            </Panel>

        </section>
    );
}

export default NutritionPanel;