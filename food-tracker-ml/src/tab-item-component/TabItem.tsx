import React from 'react';
import { ITabsChildProps } from '../tabs-component/Tabs';

const TabItem: React.FunctionComponent<ITabsChildProps> = (props) => {
    const {children} = props;
    return <div style={{width: '100%', height: '100%'}}>{children}</div>;
}

export default TabItem;