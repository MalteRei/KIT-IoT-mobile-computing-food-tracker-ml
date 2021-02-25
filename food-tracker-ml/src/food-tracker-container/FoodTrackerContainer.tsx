import React, { useState} from 'react';
import CameraFeed from '../camera-feed-component/CameraFeed';
import CameraStream from '../camera-stream-component/CameraStream';
import FoodPredictionResult from '../food-prediction-result-component/FoodPredictionResult';
import ImageModelContainer from '../image-model-container/ImageModelContainer';
import IPrediction from '../models/IPrediction';
import VideoPrediction from '../video-prediction-component/VideoPrediction';

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
            <CameraFeed cameraStream={cameraStream} onVideoStreamAvailable={handleVideoFeedAvailable}/>
            <ImageModelContainer videoElementToPredict={cameraFeedVideoElement}/>
            <CameraStream onCameraStreamEnabled={handleCameraStreamEnabled} />

        </main>
    );
}

export default FoodTrackerContainer;