import React from 'react';
import CirclePiePiece from '../circle-pie-piece-component/CirclePiePiece';
import './PiePiece.css';
export interface IPiePieceProps{
    startDegree: number,
    endDegree: number,
    piePieceIndex: number,
    color:string
}
const PiePiece: React.FunctionComponent<IPiePieceProps> = (props) => {
    const {startDegree, endDegree, piePieceIndex, color} = props;
    if( startDegree < 0 || startDegree > 360 || endDegree < 0 || endDegree > 360 || startDegree > endDegree ) {
        return null;
    }
    
    console.log(startDegree);
    return( <div className="pie-piece">
    <CirclePiePiece piePieceIndex={piePieceIndex} color={color} lengthInDegree={endDegree}/>

</div>);/*
const lengthOfPieceInDegree = endDegree - startDegree;
return( <div style={{transform: `rotate(${startDegree}deg)`}} className="pie-piece">
<CirclePiePiece piePieceIndex={piePieceIndex} color={color} lengthInDegree={lengthOfPieceInDegree}/>

</div>)*/
}

export default PiePiece;