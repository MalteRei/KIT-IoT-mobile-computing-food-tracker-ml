import React from 'react';
import CircularPieChart from '../circular-pie-chart-component/CircularPieChart';

const DayNutritionStatistic: React.FunctionComponent = (props) => {
    return <CircularPieChart label="Macros" piePieces={[{label: 'Fat', percentageFraction: 0.8},{label: 'Protein', percentageFraction: 0.15},{label: 'Carbs', percentageFraction: 0.05}]}/>;
}

export default DayNutritionStatistic;