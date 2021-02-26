import React from 'react';
import './Panel.css';

const Panel: React.FunctionComponent = (props) => {
    const {children} = props;

    if(children) {
        return (
            <div className="panel">
                {children}
            </div>  
        );
    }
    return null;
}

export default Panel;