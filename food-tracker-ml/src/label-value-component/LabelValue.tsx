import React from 'react';

export interface ILabelValueProps{
    label: string,
    value: string
}
const LabelValue: React.FunctionComponent<ILabelValueProps> = (props) => {
    const {label, value} = props;

    return(
        <div style={{marginLeft: 0, marginRight: '64px', marginTop: '4px', marginBottom: '8px'}}>
            <p>{label}</p>
            <h5>{value}</h5>
        </div>
    )
}

export default LabelValue;