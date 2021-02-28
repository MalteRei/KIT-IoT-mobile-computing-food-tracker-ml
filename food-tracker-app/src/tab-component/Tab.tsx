import React from 'react';
import './Tab.css';

export interface ITabProps {
    isActive: boolean;
    onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
    label: string
}
const Tab: React.FunctionComponent<ITabProps> = (props) => {
    const {isActive, onClick, label} = props;
    let className = 'list-item-no-style tab-label';
    if(isActive) {
        className += ' tab-active';
    }
    return (
        <li className={className} onClick={onClick}>
            {label}
        </li>
    )
}

export default Tab;