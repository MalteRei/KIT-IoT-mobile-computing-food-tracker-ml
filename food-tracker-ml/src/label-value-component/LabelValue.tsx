import React, { CSSProperties } from 'react';

export interface ILabelValueProps{
    label: string,
    value: string,
    valueColor?: string,
    valueParentheses?: string,
}
const LabelValue: React.FunctionComponent<ILabelValueProps> = (props) => {
    const {label, value, valueColor, valueParentheses} = props;

    const valueStyle: CSSProperties = {};
    if(valueColor) {
        valueStyle.color = valueColor;
    }

    const valueAdditionalText = valueParentheses? <span style={{color: 'var(--color-text-secondary)'}}> ({valueParentheses})</span> :undefined;
    return(
        <div style={{marginLeft: 0, marginRight: '64px', marginTop: '4px', marginBottom: '8px'}}>
            <p>{label}</p>
            <h5 style={valueStyle}>{value}{valueAdditionalText}</h5>
        </div>
    )
}

export default LabelValue;