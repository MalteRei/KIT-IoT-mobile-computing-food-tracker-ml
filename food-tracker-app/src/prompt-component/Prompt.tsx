import React from 'react';
import ButtonRowComponent from '../button-row-component/ButtonRowComponent';
import TwoPanePrompt from '../two-pane-prompt-component/TwoPanePrompt';
import './Prompt.css';

export interface IPromptProps {
    title: string;
    description?: JSX.Element;
    buttonText?: string;
    onButtonClicked?: () => void;
    imageAlt?: string;
    imageUrl?: string;
}
const Prompt: React.FunctionComponent<IPromptProps> = (props) => {
    const { title, description, buttonText, onButtonClicked, imageUrl, imageAlt, children } = props;
    let mainPromptContent = null;
    if (description) {
        if (children) {
            mainPromptContent = (
                <div>
                    {description}
                    {children}
                </div>
            );
        } else {
            mainPromptContent = (
                <div>
                    {description}
                </div>
            );
        }
    } else if (children) {
        mainPromptContent = (
            <div>
                {children}
            </div>
        );
    }


    const buttonElement = (buttonText && onButtonClicked) ?
        (<ButtonRowComponent>
            <button onClick={onButtonClicked}>
                {buttonText}
            </button>
        </ButtonRowComponent>) : undefined;

    const mainPromptContainer = <div key="prompt-main-container" className="prompt-text-container">
        <h3>
            {title}
        </h3>
        {mainPromptContent}
        {buttonElement}
    </div>;

    const imageElement = (imageUrl && imageAlt) ?
        (<div key="prompt-image-element" className="prompt-image-container"><img alt={imageAlt} src={imageUrl} className="prompt-image" /></div>) : undefined;
    
    const promptContent = (imageElement) ? [imageElement, mainPromptContainer] : [mainPromptContainer];
    return (
        <TwoPanePrompt>
            {promptContent}
        </TwoPanePrompt>
    );
}


export default Prompt;