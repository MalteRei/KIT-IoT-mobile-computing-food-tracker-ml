import React, { useState } from 'react';
import IconButton from '../icon-button-component/IconButton';
import Icons from '../models/Icons';
import './DateSwitcher.css';

export interface IDateSwitcherProps {
    startDate: Date,
    oldestDateSelectable?: Date,
    onDateSwitched: (newSelectedDate: Date) => void,
    isDateSelectable?: (dateTryingToSelect: Date) => boolean
}
const DateSwitcher: React.FunctionComponent<IDateSwitcherProps> = (props) => {
    const {startDate, oldestDateSelectable, onDateSwitched, isDateSelectable} = props;
    const [currentDate, setCurrentDate] = useState<Date>(startDate);
 
    const handleClickDateNext = (dateUpdate: (oldDateNumer: number) => number) => {
        let nextDateToTry = new Date(currentDate);
        let nextDateNumberToTry = nextDateToTry.getDate();
        while(nextDateToTry < startDate && (oldestDateSelectable === undefined || nextDateToTry > oldestDateSelectable)) {
            nextDateNumberToTry = dateUpdate(nextDateNumberToTry);
            nextDateToTry.setDate(nextDateNumberToTry);
            if(isDateSelectable !== undefined) {
                if(isDateSelectable(nextDateToTry)) {
                    setCurrentDate(nextDateToTry);
                    onDateSwitched(nextDateToTry);
                    return;
                }
            } else {
                setCurrentDate(nextDateToTry);
                onDateSwitched(nextDateToTry);
                return;
            }
        }
    }

    const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dateValue = event.target.valueAsDate;
        if(dateValue) {
            let dateAllowed = true;
            if(isDateSelectable !== undefined) {
                dateAllowed = isDateSelectable(dateValue);
            }
            if(dateAllowed) {
                setCurrentDate(dateValue);
                onDateSwitched(dateValue);
            }
        }
        
    };
    
    return (
        <div className="date-switcher-container">
            <IconButton disabled={!oldestDateSelectable || currentDate <= oldestDateSelectable} icon={Icons.Checkmark} onClick={() => handleClickDateNext(oldDateNumber => oldDateNumber - 1)}/>
            <input className="date-input" value={currentDate.toISOString().split('T')[0]} onChange={handleChangeDate} id={`date-switcher-${startDate.toISOString()}`} max={startDate.toISOString().split('T')[0]} min={oldestDateSelectable?.toISOString().split('T')[0]} type="date"/>
            <IconButton disabled={currentDate >= startDate} icon={Icons.Checkmark} onClick={() => handleClickDateNext(oldDateNumber => oldDateNumber + 1)}/>
        </div>
    )
}

export default DateSwitcher;