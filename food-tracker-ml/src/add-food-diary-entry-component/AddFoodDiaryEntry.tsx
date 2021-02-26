import React, { useState } from 'react';
import FoodDiaryService from '../helpers/FoodDiaryService';
import IconButton from '../icon-button-component/IconButton';
import Icons from '../models/Icons';
import './AddFoodDiaryEntry.css';

const foodDiaryService = new FoodDiaryService();
export interface IAddFoodDiaryEntryProps {
    foodName: string;
    onFoodAmountChanged?: (gramm: number) => void;
}

const AddFoodDiaryEntry: React.FunctionComponent<IAddFoodDiaryEntryProps> = (props) => {
    const { foodName, onFoodAmountChanged } = props;
    const [amountEntered, setAmountEntered] = useState<number>(100);
    const [successEnteringFood, setSuccessEnteringFood] = useState<boolean>(false);
    
    const handleAmountEnteredChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const amount = event.target.valueAsNumber;
        setAmountEntered(amount);
        if(onFoodAmountChanged) {
            onFoodAmountChanged(amount);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        foodDiaryService.addFoodToToday(foodName, amountEntered);
        setSuccessEnteringFood(true);
        setAmountEntered(0);
        setTimeout(() => {
            setSuccessEnteringFood(false);
        }, 1000);
        event.preventDefault();
    }
    if (!foodDiaryService.isAvailable()) {
        return null;
    }

    const placeholder = "Amount (g)";
    const inputId = `add-food-diary-input-${foodName}`;

    const iconOnAddButton: Icons = successEnteringFood ? Icons.Checkmark : Icons.Add;
    return (
        <form className="add-food-diary-form" onSubmit={handleSubmit}>
            <label htmlFor={inputId}>Amount (g):</label>
            <input
                className="add-food-diary-input"
                id={inputId}
                name={inputId}
                type="number"
                value={amountEntered}
                placeholder={placeholder}
                onChange={handleAmountEnteredChange}
            />
            <IconButton icon={iconOnAddButton} type="submit" />
        </form>

    )


}

export default AddFoodDiaryEntry;