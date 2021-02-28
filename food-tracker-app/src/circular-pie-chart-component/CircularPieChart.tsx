import React from 'react';
import CirclePiePiece from '../circle-pie-piece-component/CirclePiePiece';
import './CircularPieChart.css';

export interface IPiePiece {
    percentageFraction: number,
    label: string,
    color: string
}

export interface ICircularPieChartProps {
    piePieces: IPiePiece[],
    label: string
}
const CircularPieChart: React.FunctionComponent<ICircularPieChartProps> = (props) => {
    const { piePieces, label, children } = props;
    const sum = piePieces.reduce((previousPercentage, currentPiePiece) => previousPercentage + currentPiePiece.percentageFraction, 0);
    if (sum < 0 || sum > 1) {
        return null;
    }
    let childCenter = undefined;
    if(children) {
        const child = React.Children.only(children);
        childCenter = (<div className="dial-overlay flex-center">
            {child}
        </div>);
    }
    let currentLengthDegree = 0;
    const piePiecesElements = piePieces.map((piePiece, index) => {
         currentLengthDegree += piePiece.percentageFraction * 360;
        return <CirclePiePiece key={`${piePiece.label}-${index}`} color={piePiece.color} piePieceIndex={index} lengthInDegree={currentLengthDegree} />;
    });

    const piePiecesElementsReversed = piePiecesElements.reverse();

    return (
        <div className="pie-chart-container">
            <header>
                <h5 className="label">{label}</h5>
            </header>
            <section className="dials">
                <div className="dial-overlay dial-background"></div>
                {piePiecesElementsReversed}
                {childCenter}
            </section>

        </div>
    );
}

export default CircularPieChart;