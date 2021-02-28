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
        const handleVideoLoadedData = () => {
            if(videoRef.current) {
                onVideoStreamAvailable(videoRef.current);
            }
        }
        if (cameraStream && videoRef && videoRef.current && !videoRef.current.srcObject) {
            videoRef.current.srcObject = cameraStream;

            
            const listener = videoRef.current.addEventListener("loadeddata", handleVideoLoadedData);

           
            
        }

        return () => videoRef.current?.removeEventListener("loadeddata", handleVideoLoadedData);
        
      }, [cameraStream]);

      
    return(
        <div className="camera-feed-container">
            <video className="camera-feed" ref={videoRef} muted={true} autoPlay={true}></video>      
        </div>
                     

    );
}

export default CameraFeed;