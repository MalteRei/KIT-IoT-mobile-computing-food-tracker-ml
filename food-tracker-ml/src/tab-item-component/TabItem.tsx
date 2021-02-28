import React from 'react';
import { ITabsChildProps } from '../tabs-component/Tabs';

const TabItem: React.FunctionComponent<ITabsChildProps> = (props) => {
    const {children} = props;
    return <div>{children}</div>;
}

export default TabItem;