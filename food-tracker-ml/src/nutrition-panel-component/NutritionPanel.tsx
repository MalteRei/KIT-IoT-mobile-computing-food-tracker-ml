import React from 'react';
import Prompt from '../prompt-component/Prompt';
import ButtonRowComponent from '../button-row-component/ButtonRowComponent';
import IconButton from '../icon-button-component/IconButton';
import Icons from '../models/Icons';
import './NutritionPanel.css';
import NutritionService from '../helpers/NutritionService';
import LabelValue from '../label-value-component/LabelValue';

export interface INutritionPanelProps {
    foodToShowNutritionOf: string;
    onDismissed: () => void
}

const nutritionService = new NutritionService();

const NutritionPanel: React.FunctionComponent<INutritionPanelProps> = (props) => {
    const { foodToShowNutritionOf, onDismissed } = props;

    const nutritionalValues = nutritionService.getNutritionalValueOf(foodToShowNutritionOf);
    if(!nutritionalValues) {
        return (
            <div>
                <h1>Not found</h1>
            <p>Sorry, we could not look up the nutritional value for {foodToShowNutritionOf}.</p>
            </div>
            
        )
    }

    return (
        <section className="nutrition-container">
            <div className="nutrition-panel">
                <div className="flex-row">
                    <h3>
                        {foodToShowNutritionOf}
                    </h3>
                <ButtonRowComponent><IconButton onClick={() => onDismissed()} icon={Icons.Dismiss} /></ButtonRowComponent>
                </div>
              
                <h4>Calories</h4>
                <div className="flex-row">
                    <LabelValue label='kcal' value={nutritionalValues.kiloCalories.toString()}/>
                    <LabelValue label='kJ' value={nutritionalValues.kiloJoule.toString()}/>

                </div>
                    <LabelValue label='Fat' value={nutritionalValues.fat.toString()+ ' g'}/>
                    <LabelValue label='Carbohydrate' value={nutritionalValues.carbohydrates.toString()+ ' g'}/>
                    <LabelValue label='Protein' value={nutritionalValues.protein.toString() + ' g'}/>

                
            </div>


        </section>
    );
}

export default NutritionPanel;