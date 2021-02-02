import React, { useEffect, useRef } from 'react';
import './CameraFeed.css';

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
        <div className="camera-feed-container">
            <video className="camera-feed" ref={videoRef} muted={true} autoPlay={true}></video>      
        </div>
                     

    );
}

export default CameraFeed;