import React, { useCallback, useEffect, useState } from 'react';
import DateSwitcher from '../date-switcher-component/DateSwitcher';
import DayNutritionStatistic from '../day-nutrition-statistic-component/DayNutritionStatistic';
import EndlessSpinner from '../endless-spinner-component/EndlessSpinner';
import FoodNutritionList from '../food-nutrition-list-component/FoodNutritionList';
import FoodDiaryService from '../helpers/FoodDiaryService';
import NutritionService, { INutritionalValue } from '../helpers/NutritionService';
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
    let oldestDateInDiary = foodDiaryService.getOldestDateOfFoodDiary();
    if (!oldestDateInDiary) {
        oldestDateInDiary = new Date();
    }
    const setFoodForCurrentDate = useCallback(() => {
        const getFoodForCurrentDate = () => {
            if (foodDiaryService.isAvailable()) {
                return foodDiaryService.getFoodsOfDay(currentDate);
            }
            return null;
        }
        const foodForCurrentDate = getFoodForCurrentDate();
        if (foodForCurrentDate) {
            setFoodEatenOnCurrentDate(getNutritionalValuesForFoods(foodForCurrentDate));
        }
    }, [currentDate]);
    useEffect(() => setFoodForCurrentDate(), [currentDate, showDiary, setFoodForCurrentDate]);


    const handleToggleShowDiary = () => {
        setShowDiary(!showDiary);
    }

    const getNutritionalValuesForFoods = (foods: IFoodDiaryEntry[]) => {
        return foods.map(food => {
            const nutritionValue = nutritionService.getNutritionalValueOf(food.foodName);
            if (nutritionValue !== undefined) {
                return { ...food, ...nutritionValue };
            } else {
                return { ...food, protein: Number.NaN, carbohydrates: Number.NaN, fat: Number.NaN, kiloCalories: Number.NaN, kiloJoule: Number.NaN }
            }
        })
    }

    const handleCheckDateInDiary = (date: Date): boolean => {
        return foodDiaryService.isDateInDiary(date);
    }

    const handleDateSwitcher = (newDate: Date) => {
        setCurrentDate(newDate);
        setFoodForCurrentDate();
    }

    let diaryPanelContent: JSX.Element | undefined = undefined;
    if (foodDiaryService.isAvailable()) {
        // show food for current date
        if (foodEatenOnCurrentDate) {
            if (foodEatenOnCurrentDate.length > 0) {
                // display nutrition values for the day
                diaryPanelContent = (
                    <Tabs>
                        <TabItem label="Statistics">
                            <DayNutritionStatistic foodsEatenOnDay={foodEatenOnCurrentDate} />
                        </TabItem>
                        <TabItem label="Foods">
                            <FoodNutritionList foodsWithNutrition={foodEatenOnCurrentDate} />
                        </TabItem>
                    </Tabs>
                );
            } else {
                // nothing eaten this day
                diaryPanelContent = (<p style={{ paddingTop: '16px' }}>
                    No food in diary for {currentDate.toLocaleDateString()}.<br></br><br></br>
                    Scan food with the camera, tap it and add it to today's food diary.
                </p>);
            }
        } else {
            diaryPanelContent = <EndlessSpinner />;
        }

    } else {
        diaryPanelContent = (<p>
            Sorry, your browser does not support storing a nutrition diary.
        </p>);
    }

    const diaryPanel = showDiary ? (
        <div className="food-diary-panel">
            <Panel>
                <PanelTopRow onClosePanel={handleToggleShowDiary}>
                    <DateSwitcher onDateSwitched={handleDateSwitcher} isDateSelectable={handleCheckDateInDiary} oldestDateSelectable={oldestDateInDiary} startDate={currentDate} />
                </PanelTopRow>
                {diaryPanelContent}
            </Panel>
        </div>

    ) : undefined;

    const toggleDiaryButton = showDiary ? undefined : <div className="bottom-row">
        <RoundIconButton onClick={handleToggleShowDiary} icon={Icons.Notebook} />

    </div>;
    return (
        <TwoPanePrompt leftPaneChildrenIndex={0}>
            <section className="food-diary">
                {diaryPanel}
                {toggleDiaryButton}
            </section>
        </TwoPanePrompt>
    )
}

export default FoodDiaryContainer;