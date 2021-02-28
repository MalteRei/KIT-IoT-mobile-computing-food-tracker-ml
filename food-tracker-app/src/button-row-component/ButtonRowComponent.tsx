import React from 'react';
import './ButtonRowComponent.css';

const ButtonRowComponent : React.FunctionComponent = (props) => {
    const {children} = props;

    if(!children){
        return null;
    }
    if(React.Children.count(children) < 1) {
        return null;
    }
    const buttons = React.Children.map(children, child => <span>{child}</span>);
    return (
        <div className="prompt-button-row">
           {buttons}
        </div>
    )
    
}

export default ButtonRowComponent;