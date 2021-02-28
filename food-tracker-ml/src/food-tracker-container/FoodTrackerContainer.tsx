import React, { useState} from 'react';
import CameraFeed from '../camera-feed-component/CameraFeed';
import CameraStream from '../camera-stream-component/CameraStream';
import FoodDiaryContainer from '../food-dairy-container-component/FoodDiaryContainer';
import ImageModelContainer from '../image-model-container/ImageModelContainer';

const FoodTrackerContainer: React.FunctionComponent = (props) => {
    const [cameraStream, setCameraStream] = useState<MediaStream | undefined>(undefined);
    const [cameraFeedVideoElement, setCameraFeedVideoElement] = useState<HTMLVideoElement | undefined>(undefined);
    
    const handleCameraStreamEnabled = (stream: MediaStream) => {
        setCameraStream(stream);
    }

    const handleVideoFeedAvailable = (videoElement: HTMLVideoElement) => {
        setCameraFeedVideoElement(videoElement);
    }

   

    return(
        <main>
            <CameraStream onCameraStreamEnabled={handleCameraStreamEnabled}>
                <CameraFeed cameraStream={cameraStream} onVideoStreamAvailable={handleVideoFeedAvailable}/>
            </CameraStream>
            <ImageModelContainer videoElementToPredict={cameraFeedVideoElement}/>
            <FoodDiaryContainer/>
        </main>
    );
}

export default FoodTrackerContainer;