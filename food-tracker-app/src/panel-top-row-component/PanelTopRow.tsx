import React from 'react';
import ButtonRowComponent from '../button-row-component/ButtonRowComponent';
import IconButton from '../icon-button-component/IconButton';
import Icons from '../models/Icons';
import './PanelTopRow.css';

export interface IPanelTopRowProps {
    title?: string,
    onClosePanel: () => void;
}
const PanelTopRow: React.FunctionComponent<IPanelTopRowProps> = (props) => {
    const { title, children, onClosePanel } = props;
    let content = null;
    if (title) {
        content = (
            <h3>
                {title}
            </h3>
        );
    } else if (children && React.Children.count(children) > 0) {
        content = children;
    }

    return (
        <div className="flex-row">
            {content}
            <ButtonRowComponent>
                <IconButton onClick={onClosePanel} icon={Icons.Dismiss} />
            </ButtonRowComponent>
        </div>
    );
}

export default PanelTopRow;