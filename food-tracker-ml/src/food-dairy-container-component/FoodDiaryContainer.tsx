import React, { useState } from 'react';
import ButtonRowComponent from '../button-row-component/ButtonRowComponent';
import IconButton from '../icon-button-component/IconButton';
import Icons from '../models/Icons';
import Panel from '../panel-component/Panel';
import PanelTopRow from '../panel-top-row-component/PanelTopRow';
import RoundIconButton from '../round-icon-button-component/RoundIconButton';
import TwoPanePrompt from '../two-pane-prompt-component/TwoPanePrompt';
import './FoodDiaryContainer.css';

const FoodDiaryContainer: React.FunctionComponent = (props) => {
    const [showDiary, setShowDiary] = useState<boolean>(false);
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const handleToggleShowDiary = () => {
        setShowDiary(!showDiary);
    }

    const diaryPanel = showDiary? (
        <div className="food-diary-panel">
             <Panel>

             <PanelTopRow title={currentDate.toLocaleDateString()}>
                    <IconButton onClick={handleToggleShowDiary} icon={Icons.Dismiss} />
                </PanelTopRow>

        </Panel>
        </div>
       
    ) : undefined;
    return(
        <TwoPanePrompt leftPaneChildrenIndex={0}>
            <section className="food-diary"> 
               
                <div className="bottom-row">
                <RoundIconButton onClick={handleToggleShowDiary} icon={Icons.Add}/>

                </div>
                {diaryPanel}
            </section>
        </TwoPanePrompt>
    )
}

export default FoodDiaryContainer;