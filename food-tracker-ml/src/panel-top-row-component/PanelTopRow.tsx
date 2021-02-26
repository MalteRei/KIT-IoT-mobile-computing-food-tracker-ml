import React from 'react';
import ButtonRowComponent from '../button-row-component/ButtonRowComponent';
import './PanelTopRow.css';

export interface IPanelTopRowProps {
    title: string
}
const PanelTopRow: React.FunctionComponent<IPanelTopRowProps> = (props) => {
    const {title, children} = props;


    return (
        <div className="flex-row">
        <h3>
            {title}
        </h3>
        <ButtonRowComponent>{children}</ButtonRowComponent>
    </div>
    );
}

export default PanelTopRow;