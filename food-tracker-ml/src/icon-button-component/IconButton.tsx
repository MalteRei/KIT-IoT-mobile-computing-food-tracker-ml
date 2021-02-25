import React from 'react';
import IconFactory from '../helpers/IconFactory';
import Icons from '../models/Icons';

export interface IIconButtonProps{
    icon: Icons,
    onClick: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined
}

const iconFactory = new IconFactory();
const IconButton: React.FunctionComponent<IIconButtonProps> = (props) => {
    const {onClick, icon} = props;
    return(
        <button onClick={onClick} style={{backgroundColor: 'transparent'}}>
            {iconFactory.getIcon(icon)}
        </button>
    );
}

export default IconButton;