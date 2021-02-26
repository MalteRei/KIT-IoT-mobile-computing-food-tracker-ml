import React from 'react';
import IconFactory from '../helpers/IconFactory';
import { IIconButtonProps } from '../icon-button-component/IconButton';
import Icons from '../models/Icons';

const iconFactory = new IconFactory();
const RoundIconButton: React.FunctionComponent<IIconButtonProps> = (props) => {
    const {onClick, icon, type} = props;
    return(
        <button type={type} onClick={onClick} style={{backgroundColor: 'transparent', width: '64px', height: '64px', borderRadius: '50%', padding: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: '64px'}}>
            {iconFactory.getIcon(icon)}
        </button>
    );
}

export default RoundIconButton;