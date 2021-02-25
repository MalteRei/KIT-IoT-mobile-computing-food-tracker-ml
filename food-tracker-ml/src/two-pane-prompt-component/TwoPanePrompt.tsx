import React from 'react';
import ButtonRowComponent from '../button-row-component/ButtonRowComponent';
import './TwoPanePrompt.css';

export interface ITwoPanePrompt{
    onPromptCloseLeft?: () => void,
    onPromptCloseRight?: () => void
}
const TwoPanePrompt: React.FunctionComponent<ITwoPanePrompt> = (props) => {
    const {onPromptCloseRight,onPromptCloseLeft, children} = props;
    if(!children) {
        return null;
    }

    const childrenArray = React.Children.toArray(children);
    let leftPaneContent = null;
    let rightPaneContent = null;

    if(childrenArray.length >= 2) {
        leftPaneContent = childrenArray[0];
        rightPaneContent = childrenArray[1];
    } else if(childrenArray.length === 1) {
        rightPaneContent = childrenArray[0];
    } else {
        return null;
    }
    const leftCloseButtonRow = (onPromptCloseLeft !== undefined)? <ButtonRowComponent><button onClick={onPromptCloseLeft}>{}</button></ButtonRowComponent>: undefined;
    const rightCloseButtonRow = (onPromptCloseRight !== undefined)? <ButtonRowComponent><button onClick={onPromptCloseRight}>{}</button></ButtonRowComponent>: undefined;

    const leftElement = (leftPaneContent !== null) ? <div className="left-pane-content pane-content">{leftPaneContent}</div> : null;
    const rightElement = (rightPaneContent !== null) ? <div className="right-pane-content pane-content">{rightPaneContent}</div> : null;

    return(
        <section>
            {leftElement}
            {rightElement}
        </section>
    )

}

export default TwoPanePrompt;