import React, { useEffect, useState } from 'react';
import ButtonRowComponent from '../button-row-component/ButtonRowComponent';
import DayNutritionStatistic from '../day-nutrition-statistic-component/DayNutritionStatistic';
import FoodDiaryService from '../helpers/FoodDiaryService';
import NutritionService, { INutritionalValue } from '../helpers/NutritionService';
import IconButton from '../icon-button-component/IconButton';
import Icons from '../models/Icons';
import IFoodDiaryEntry from '../models/IFoodDiaryEntry';
import Panel from '../panel-component/Panel';
import PanelTopRow from '../panel-top-row-component/PanelTopRow';
import RoundIconButton from '../round-icon-button-component/RoundIconButton';
import TabItem from '../tab-item-component/TabItem';
import Tabs from '../tabs-component/Tabs';
import TwoPanePrompt from '../two-pane-prompt-component/TwoPanePrompt';
import './FoodDiaryContainer.css';

const foodDiaryService = new FoodDiaryService();
const nutritionService = new NutritionService();
const FoodDiaryContainer: React.FunctionComponent = (props) => {
    const [showDiary, setShowDiary] = useState<boolean>(false);
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [foodEatenOnCurrentDate, setFoodEatenOnCurrentDate] = useState<(IFoodDiaryEntry & INutritionalValue)[] | null>(null);
    const handleToggleShowDiary = () => {
        setShowDiary(!showDiary);
    }
    const getFoodForCurrentDate = () => {
        if(foodDiaryService.isAvailable()) {
          return foodDiaryService.getFoodsOfDay(currentDate);

        }
        return [];
    }
    const getNutritionalValuesForFoods = (foods: IFoodDiaryEntry[]) => {
        return foods.map(food => {
            const nutritionValue = nutritionService.getNutritionalValueOf(food.foodName);
            if(nutritionValue !== undefined){
                return {...food, ...nutritionValue};
            } else {
                return {...food, protein: Number.NaN, carbohydrates: Number.NaN, fat: Number.NaN, kiloCalories: Number.NaN, kiloJoule: Number.NaN}
            }
        })
    }
    useEffect(() => {
        const foodForCurrentDate = getFoodForCurrentDate();
        setFoodEatenOnCurrentDate(getNutritionalValuesForFoods(foodForCurrentDate));
    },[currentDate, showDiary]);

    let diaryPanelContent: JSX.Element | undefined = undefined;
    if(foodDiaryService.isAvailable()) {
        // show food for current date
        if(foodEatenOnCurrentDate) {
            if(foodEatenOnCurrentDate.length > 0) {
                // display nutrition values for the day
                diaryPanelContent = (
                    <Tabs>
                        <TabItem label="Statistics">
                            <DayNutritionStatistic foodsEatenOnDay={foodEatenOnCurrentDate}/>
                        </TabItem>
                        <TabItem label="Tab 1">
                            Tab content 2
                        </TabItem>
                    </Tabs>
                );
            } else {
                // nothing eaten this day
                diaryPanelContent = (<p>
                    No food in diary for {currentDate.toLocaleDateString()}.<br></br><br></br>
                    Scan food with the camera, tap it and add it to today's food diary.
                </p>);
            }
        } else {
            // loading
        }

    } else {
        diaryPanelContent = (<p>
            Sorry, your browser does not support storing a nutrition diary.
        </p>);
    }

    const diaryPanel = showDiary? (
        <div className="food-diary-panel">
             <Panel>

             <PanelTopRow title={currentDate.toLocaleDateString()}>
                <IconButton onClick={handleToggleShowDiary} icon={Icons.Dismiss} />
            </PanelTopRow>
            {diaryPanelContent}
        </Panel>
        </div>
       
    ) : undefined;

    const toggleDiaryButton = showDiary? undefined :  <div className="bottom-row">
    <RoundIconButton onClick={handleToggleShowDiary} icon={Icons.Add}/>

    </div>;
    return(
        <TwoPanePrompt leftPaneChildrenIndex={0}>
            <section className="food-diary"> 
            {diaryPanel}
            {toggleDiaryButton}
            
            </section>
        </TwoPanePrompt>
    )
}

export default FoodDiaryContainer;