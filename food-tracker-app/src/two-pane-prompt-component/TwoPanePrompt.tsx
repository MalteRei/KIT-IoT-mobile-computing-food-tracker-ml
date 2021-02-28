import React from 'react';
import './TwoPanePrompt.css';

export interface ITwoPanePrompt{
    /* Overwrite which child of this component should be the left pane*/
    leftPaneChildrenIndex?: number,
    /* Overwrite which child of this component should be the right pane*/
    rightPaneChildrenIndex?: number,
}
const TwoPanePrompt: React.FunctionComponent<ITwoPanePrompt> = (props) => {
    const { leftPaneChildrenIndex, rightPaneChildrenIndex,children} = props;
    if(!children) {
        return null;
    }

    const childrenArray = React.Children.toArray(children);
    let leftPaneContent = null;
    let rightPaneContent = null;

    
    if(leftPaneChildrenIndex !== undefined && leftPaneChildrenIndex < childrenArray.length) {
            leftPaneContent = childrenArray[leftPaneChildrenIndex];
    } else {
        if(childrenArray.length >= 2) {
            if(rightPaneChildrenIndex !== 0) {
                leftPaneContent = childrenArray[0];
            } else {
                leftPaneContent = childrenArray[1];
            }
        }
    }
    if(rightPaneChildrenIndex !== undefined && rightPaneChildrenIndex < childrenArray.length) {
            rightPaneContent = childrenArray[rightPaneChildrenIndex];
    } else {
        if(childrenArray.length >= 2) {
            if(leftPaneChildrenIndex !== 1) {
                rightPaneContent = childrenArray[1];
            }
        } else if(childrenArray.length === 1) {
            if(leftPaneChildrenIndex !== 0) {
                rightPaneContent = childrenArray[0];
            }
        } 
    }
    
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