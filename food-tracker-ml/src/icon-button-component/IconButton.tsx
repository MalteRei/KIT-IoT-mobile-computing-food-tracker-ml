import React from 'react';
import IconFactory from '../helpers/IconFactory';
import Icons from '../models/Icons';

export interface IIconButtonProps{
    icon: Icons,
    onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void),
    type?: "button" | "submit" | "reset";
}

const iconFactory = new IconFactory();
const IconButton: React.FunctionComponent<IIconButtonProps> = (props) => {
    const {onClick, icon, type} = props;
    return(
        <button type={type} onClick={onClick} style={{backgroundColor: 'transparent'}}>
            {iconFactory.getIcon(icon)}
        </button>
    );
}

export default IconButton;