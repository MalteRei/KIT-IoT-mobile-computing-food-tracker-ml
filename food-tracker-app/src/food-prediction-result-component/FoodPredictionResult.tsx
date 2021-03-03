import React, { useState } from 'react';
import IPrediction from '../models/IPrediction';
import NutritionPanel from '../nutrition-panel-component/NutritionPanel';
import TwoPanePrompt from '../two-pane-prompt-component/TwoPanePrompt';
import './FoodPredictionResult.css';

interface IFoodPredictionResult {
    currentPrediction: IPrediction | undefined
}
const FoodPredictionResult: React.FunctionComponent<IFoodPredictionResult> = (props) => {
    const { currentPrediction } = props;

    const [selectedFood, setSelectedFood] = useState<string | undefined>(undefined);

    const handleFoodSelected = (selectedFood: string | undefined) => {
        setSelectedFood(selectedFood);
    };
    if(currentPrediction?.label === 'none') {
        return null;
    }

    const currentPredictionCard = (currentPrediction !== undefined) ? <div className="prediction-card" onClick={() => handleFoodSelected(currentPrediction.label)}>
       <h5 style={{marginLeft: '16px'}}>
            {currentPrediction.label}
        </h5>
        
    </div> : undefined;
    const nutritionPanel = (selectedFood !== undefined) ? <NutritionPanel onDismissed={() => handleFoodSelected(undefined)} foodToShowNutritionOf={selectedFood} /> : undefined;

    if (currentPredictionCard === undefined && nutritionPanel === undefined) {
        return null;
    }

    

    return (
        <TwoPanePrompt>
            {currentPredictionCard}
            {nutritionPanel}
        </TwoPanePrompt>
    );
}

export default FoodPredictionResult;