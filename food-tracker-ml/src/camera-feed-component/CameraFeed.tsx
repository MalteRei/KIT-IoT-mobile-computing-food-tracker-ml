import React, { useEffect, useRef } from 'react';
import VideoPrediction from '../video-prediction-component/VideoPrediction';


export interface ICameraFeedProps{
    cameraStream: MediaStream
}
const CameraFeed: React.FunctionComponent<ICameraFeedProps> = (props) => {

    const {cameraStream} = props;
    const videoRef = useRef<HTMLVideoElement | null>(null);

    
    useEffect(() => {
        if (cameraStream && videoRef && videoRef.current && !videoRef.current.srcObject) {
            videoRef.current.srcObject = cameraStream;
        }
      });

      
    return(
        <div>
            <video ref={videoRef} muted={true} autoPlay={true} id="camera-feed-video"></video>
            <VideoPrediction videoElementToPredict={videoRef}></VideoPrediction>
        </div>
       
    );
}

export default CameraFeed;