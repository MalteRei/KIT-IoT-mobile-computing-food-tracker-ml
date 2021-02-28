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
        const videoReference = videoRef;
        const cameraStr = cameraStream;
        const handleVideoLoadedData = () => {
            if(videoReference.current) {
                onVideoStreamAvailable(videoReference.current);
            }
        }
        if (videoReference && videoReference && videoReference.current && !videoReference.current.srcObject && cameraStr) {
            videoReference.current.srcObject = cameraStr;
            videoReference.current.addEventListener("loadeddata", handleVideoLoadedData);

           
            
        }

        return () => videoReference.current?.removeEventListener("loadeddata", handleVideoLoadedData);
        
      }, [cameraStream, onVideoStreamAvailable]);

      
    return(
        <div className="camera-feed-container">
            <video className="camera-feed" ref={videoRef} muted={true} autoPlay={true}></video>      
        </div>
                     

    );
}

export default CameraFeed;