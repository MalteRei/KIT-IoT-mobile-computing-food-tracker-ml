import React from 'react';
import './Prompt.css';

export interface IPromptProps {
    title: string;
    description: JSX.Element;
    buttonText?: string;
    onButtonClicked?: () => void;
    imageUrl?: string;
}
const Prompt: React.FunctionComponent<IPromptProps> = (props) => {
    const { title, description, buttonText, onButtonClicked, imageUrl } = props;

    const buttonElement = (buttonText && onButtonClicked) ?
        (<div className="prompt-button-row">
            <span>
                <button onClick={onButtonClicked}>
                    {buttonText }
                </button>
            </span>
        </div>) : undefined;

    const imageElement = imageUrl ?
    (<img src={imageUrl} className="prompt-image" />): undefined;
    return (
        <div className="prompt-container">
            <div className="prompt-panel">
                <div className="prompt-image-container">
                    {imageElement}

                </div>
                <div className="prompt-text-container">


                    <h1>
                        {title}
                        
                        </h1>
                    
                       {description}
                        

                    {buttonElement}


                </div>
            </div>

        </div>
    );
}


export default Prompt;