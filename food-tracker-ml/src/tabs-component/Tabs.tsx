import React, { useState, ReactElement, ReactNode, ReactChild } from 'react';
import Tab from '../tab-component/Tab';
import './Tabs.css';

export interface ITabsProps {
    children: ReactElement<ITabsChildProps>[]
}
export interface ITabsChildProps {
    label: string
}
const Tabs: React.FunctionComponent<ITabsProps> = (props) => {
    const {children} = props;
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const tabsChildren = React.Children.toArray(children);
    if(!children || !tabsChildren || tabsChildren.length === 0 || activeTabIndex >= tabsChildren.length) {
        return null;
    }
    const tabs = React.Children.map(children, (child: ReactElement<ITabsChildProps>, index) => {
        let label = `Tab ${index}`;
        if(child.props.label){
           label = child.props.label;
        }
        return (
            <Tab key={`${label}-${index}`} label={label} onClick={() => setActiveTabIndex(index)} isActive={index === activeTabIndex}/>
        );
    });

    return(
        <section className="tabs">
            <ol className="tabs-header">
                {tabs}
            </ol>
            <div className="tab-content">
                {tabsChildren[activeTabIndex]}
            </div>
        </section>
    );

}
export default Tabs;