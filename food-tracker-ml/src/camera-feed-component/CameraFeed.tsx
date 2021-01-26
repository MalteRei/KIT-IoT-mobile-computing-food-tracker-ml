import React, { useEffect, useRef } from 'react';


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
        <video ref={videoRef} muted={true} autoPlay={true} id="camera-feed-video"></video>
    );
}

export default CameraFeed;