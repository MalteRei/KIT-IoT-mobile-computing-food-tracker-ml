import React, { CSSProperties } from 'react';

export interface ILabelValueProps{
    label: string,
    value: string,
    valueColor?: string,
    valueParentheses?: string,
    marginRight?: string | number | (string & {})
}
const LabelValue: React.FunctionComponent<ILabelValueProps> = (props) => {
    const {label, value, valueColor, valueParentheses,marginRight} = props;

    const valueStyle: CSSProperties = {};
    if(valueColor) {
        valueStyle.color = valueColor;
    }

    const marginRightWithFallback = (marginRight === undefined)? '64px': marginRight
    if(marginRight === undefined) {

    }

    const valueAdditionalText = valueParentheses? <span style={{color: 'var(--color-text-secondary)'}}> ({valueParentheses})</span> :undefined;
    return(
        <div style={{marginLeft: 0, marginRight: marginRightWithFallback, marginTop: '4px', marginBottom: '8px'}}>
            <p>{label}</p>
            <h5 style={valueStyle}>{value}{valueAdditionalText}</h5>
        </div>
    )
}

export default LabelValue;