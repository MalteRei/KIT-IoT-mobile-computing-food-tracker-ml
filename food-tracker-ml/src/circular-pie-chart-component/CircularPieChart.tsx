import React from 'react';
import CirclePiePiece from '../circle-pie-piece-component/CirclePiePiece';
import './CircularPieChart.css';

export interface IPiePiece{
    percentageFraction: number,
    label: string
}

export interface ICircularPieChartProps{
    piePieces: IPiePiece[],
    label: string
}
const CircularPieChart: React.FunctionComponent<ICircularPieChartProps> = (props) => {
    const {piePieces, label} = props;
    const sum = piePieces.reduce((previousPercentage, currentPiePiece) => previousPercentage + currentPiePiece.percentageFraction, 0);
    if(sum < 0 || sum > 1) {
        return null;
    }


    return(
        <div className="pie-chart-container">
        <header>
            <h5 className="label">{label}</h5>
        </header>
        <section className="dials">
            <div className="dial-background"></div>
            <CirclePiePiece  color="#32cbd4" piePieceIndex={2}lengthInDegree={360} />
            <CirclePiePiece  color="#9cfc33" piePieceIndex={1}lengthInDegree={260} />
            <CirclePiePiece  color="#fc1d20" piePieceIndex={0}lengthInDegree={220} />

        </section>
        
      </div>
    );
}

export default CircularPieChart;