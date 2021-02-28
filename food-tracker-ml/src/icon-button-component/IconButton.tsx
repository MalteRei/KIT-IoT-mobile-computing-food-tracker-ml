import React from 'react';
import IconFactory from '../helpers/IconFactory';
import Icons from '../models/Icons';
import './IconButton.css';

export interface IIconButtonProps{
    icon: Icons,
    onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void),
    type?: "button" | "submit" | "reset",
    disabled?: boolean
}

const iconFactory = new IconFactory();
const IconButton: React.FunctionComponent<IIconButtonProps> = (props) => {
    const {onClick, icon, type, disabled} = props;
    return(
        <button className="icon-button" disabled={disabled} type={type} onClick={onClick}>
            {iconFactory.getIcon(icon)}
        </button>
    );
}

export default IconButton;