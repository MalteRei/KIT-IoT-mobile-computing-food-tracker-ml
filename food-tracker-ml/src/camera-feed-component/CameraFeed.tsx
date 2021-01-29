import React, { useEffect, useRef } from 'react';


export interface ICameraFeedProps{
    cameraStream: MediaStream | undefined,
    onVideoStreamAvailable: (videoElement: HTMLVideoElement) => void
}
const CameraFeed: React.FunctionComponent<ICameraFeedProps> = (props) => {

    const {cameraStream, onVideoStreamAvailable} = props;
    const videoRef = useRef<HTMLVideoElement | null>(null);

    
    useEffect(() => {
        if (cameraStream && videoRef && videoRef.current && !videoRef.current.srcObject) {
            videoRef.current.srcObject = cameraStream;
            onVideoStreamAvailable(videoRef.current);
        }
      });

      
    return(
        <video ref={videoRef} muted={true} autoPlay={true}></video>       
    );
}

export default CameraFeed;