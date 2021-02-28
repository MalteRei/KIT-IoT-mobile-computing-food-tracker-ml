import React, { useRef } from 'react';
import './CirclePiePiece.css';

export interface ICirclePiePieceProps {
    lengthInDegree: number,
    piePieceIndex: number,
    color:string
}
const CirclePiePiece: React.FunctionComponent<ICirclePiePieceProps> = (props) => {
    const {lengthInDegree, piePieceIndex, color} = props;
    const endMarkerRef = useRef<HTMLDivElement>(null);
    const firstWedgeRef = useRef<HTMLDivElement>(null);
    const secondWedgeRef = useRef<HTMLDivElement>(null);

    if(lengthInDegree < 0 || lengthInDegree > 360 || piePieceIndex < 0) {
        return null;
    }
    const delay = (5000 * piePieceIndex) + 200;
    const degreeRotationFirstContainer = (lengthInDegree > 180)? 180 : lengthInDegree;
    const degreeRotationSecondContainer = lengthInDegree - degreeRotationFirstContainer;
    const animationOptions: KeyframeAnimationOptions = {
        duration: 5000 + (1500*piePieceIndex),
        delay: 200,
        easing: 'linear'
    };
    const keyframesEndMarker: Keyframe[] = [
        {transform: 'rotateZ(0deg)'},
        {transform: 'rotateZ(0deg)', offset: 0.06},
        {transform: `rotateZ(${degreeRotationFirstContainer}deg)`, offset: 0.24},
        {transform: `rotateZ(${lengthInDegree}deg)`, offset: 0.28},
        {transform: `rotateZ(${lengthInDegree}deg)`, offset: 1}

    ];

    const waitingForPreviousPiePiece = (piePieceIndex === 0)? 0:  1 / (piePieceIndex + 1);
    const keyframesFirstWedge: Keyframe[] = [
        {transform: 'rotateZ(0deg)', offset: 0},
        {transform: 'rotateZ(0deg)', offset: 0.06},
        {transform: `rotateZ(${degreeRotationFirstContainer}deg)`, offset:  0.24},
        {transform: `rotateZ(${degreeRotationFirstContainer}deg)`, offset: 1}
    ];

    const keyframesSecondWedge: Keyframe[] = [
        {transform: 'rotateZ(0deg)', offset: 0},
        {transform: 'rotateZ(0deg)', offset: 0.24},
        {transform: `rotateZ(${degreeRotationSecondContainer}deg)`, offset: 0.28},
        {transform: `rotateZ(${degreeRotationSecondContainer}deg)`, offset: 1}

    ];

    requestAnimationFrame(() => {    
        endMarkerRef.current?.animate(keyframesEndMarker, animationOptions);
        firstWedgeRef.current?.animate(keyframesFirstWedge, animationOptions);
        secondWedgeRef.current?.animate(keyframesSecondWedge, animationOptions);
    });
    return(
        <div className="dial">
            <div className="dial-container container1">
              <div style={{ transform: `rotateZ(${degreeRotationFirstContainer}deg)`, background: color}} ref={firstWedgeRef} className="wedge"></div>
            </div>
            <div className="dial-container container2">
              <div style={{ transform: `rotateZ(${degreeRotationSecondContainer}deg)`, background: color}} ref={secondWedgeRef} className="wedge"></div>
            </div>
            <div style={{background: color}} className="marker start"></div>
            <div style={{transform: `rotateZ(${lengthInDegree}deg)`, background: color}} ref={endMarkerRef} className="marker end"></div>
          </div>
    );
}

export default CirclePiePiece;